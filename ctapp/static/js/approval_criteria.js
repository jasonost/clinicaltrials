function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var select_concept = '<h3>You are currently reviewing ' +
                       '<div id="current-concept-dropdown" class="btn-group">' +
                          '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">' +
                            '<span id="current-concept"></span><span class="caret"></span>' +
                          '</button>' +
                       '</div>' +
                     '</h3>';


// thinking spinner
function thinking(description) {
    var header = '<h4>' + description + '</h4>',
        spinner = '<i id="top-cond-spinner" class="fa fa-spinner fa-pulse" style="font-size: 5em; margin: .5em;"></i>';

    // clear out old items
    $("#current-approval").empty();

    // add spinner
    $("#current-approval").html(header + spinner);

}

function stopThinking() {
    $("#current-approval").empty();
}



// on page load
$(function() {
    getConceptData();
})



// get data for all staged concepts and add to dropdown
var all_concepts = {};

function getConceptData() {

    $.getJSON($SCRIPT_ROOT + "_approve_concepts_load", {}, function (data) {

        var concepts = data.concepts;

        if (Object.keys(concepts).length > 0) {
            $("#current-approval").html(select_concept);
            all_concepts = concepts;

            var dropdown_html = '<ul class="dropdown-menu" role="menu">';
            var button_val = false;

            for (var i in all_concepts) {
                if (!button_val) {
                    button_val = true;
                    $("#current-concept").html('<strong>' + all_concepts[i].name + '&nbsp;</strong>');
                    displayTerms(i);
                }
                dropdown_html += '<li class="concept-selection" id="' + i + '"><a href="#" onClick="return false;">' +
                                 '<strong>' + all_concepts[i].name + '</strong><small><br>' + 
                                 (all_concepts[i].old_terms.length > 0 ? "Existing" : "New") +
                                 ' concept (' +all_concepts[i].new_terms.length + " new terms)</small></a></li>";
            }

            dropdown_html += '</ul>';
            $("#current-concept-dropdown").append(dropdown_html);

        } else {
            $("#current-approval").html('<div class="alert alert-success">There are no concepts to approve.</div>');
        }

    });

}



// display term information for a single concept
function displayTerms(concept_id) {
    var term_list = all_concepts[concept_id].new_terms,
        old_term_list = all_concepts[concept_id].old_terms;

    var term_table = '<div id="term-table" class="top-margin-2em">' +
                       '<div class="col-xs-12 col-sm-12 col-md-12">' +
                         '<h4>Terms added by <strong><span class="text-success">' + all_concepts[concept_id].username + '</span></strong> from ' +
                         '<strong><span class="text-success">' + all_concepts[concept_id].userinst + '</span></strong></h4>' +
                       '</div>' +
                       '<div class="col-xs-12 col-sm-6 col-md-6">' +
                         '<table class="table">' +
                           '<col width="10%">' +
                           '<col width="30%">' + 
                           '<col width="60%">';
    for (i=0; i<term_list.length; i++) {
        term_table += '<tr><td style="text-align: right"><input type="checkbox" name="terms-checked" value="' + 
                      term_list[i] + '" checked></td>' + '<td>' + term_list[i] + '</td></tr>';
    }
    term_table += '<tr class="warning"><td style="text-align: right"><input type="checkbox" id="check-all" checked></td>' +
                  '<td><strong>Select all</strong></td></tr>' +
                  '</table>' +
                  '<div class="top-margin-2em">' +
                    '<button id="button-approval" class="btn btn-success" concept="' + concept_id + '">Approve terms</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '<button id="button-reject" class="btn btn-danger" concept="' + concept_id + '">Reject this entire concept</button>' +
                  '</div></div></div>';
    $("#current-approval").append(term_table);

    if (old_term_list.length > 0) {
        var old_term_table = '<div class="col-xs-12 col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-5">' +
                               '<h5>Previously accepted terms:</h5>' +
                               '<ul>';
        for (i=0; i<old_term_list.length; i++) {
            old_term_table += '<li>' + old_term_list[i] + '</li>';
        }
        old_term_table += '</ul></div>';
        $("#current-approval").append(old_term_table);
    }
}


// change in dropdown
$("body").delegate(".concept-selection", 'click', function(e) {
    var this_id =$(this).attr('id');
    $("#current-concept").html('<strong>' + all_concepts[this_id].name + '&nbsp;</strong>');
    $("#term-table").remove();
    displayTerms(this_id);
})


// select all/deselect all functionality
$("body").delegate("#check-all", "click", function(e) {
    var is_checked = $(this).is(':checked'),
        check_terms = $("input[name=terms-checked]");
    if (is_checked) {
        for (i=0; i<check_terms.length; i++) {
            check_terms[i].checked = true;
        }
    } else {
        for (i=0; i<check_terms.length; i++) {
            check_terms[i].checked = false;
        }
    }
})

$("body").delegate("input[name=terms-checked]", "click", function(e) {
    if (!($(this).is(':checked'))) {
        $("#check-all").prop('checked',false);
    }
});



// approving a concept
var this_round = 0,
    current_concept = '',
    num_trials = 0;

function outerLoop() {
  thinking("Associating to trials...<br><small>" + (this_round*4) + "% done</small>");
  assocTrials(current_concept);
}

function assocTrials(concept_id) {
  if (this_round < 25) {
    $.getJSON($SCRIPT_ROOT + "_associate_trials", {
      concept_id: current_concept,
      rnd: this_round,
      num_trials: num_trials
    }, function(data) {
      this_round++;
      num_trials = parseInt(data.num_trials);
      outerLoop();
    });
  } else {
    alert("Associated with " + num_trials + " trials");
    getConceptData();
  }
}

$("body").delegate("#button-approval", "click", function(e) {
    var concept_id = $(this).attr("concept"),
        ok_terms = [];

    $("input[name=terms-checked]:checked").each(function() {
        ok_terms.push($(this).val());
    });

    $(window).scrollTop();
    thinking("Writing data...");

    $.getJSON($SCRIPT_ROOT + "_write_criteria_approval", {
        ok_terms: JSON.stringify(ok_terms),
        concept_id: concept_id,
        new_concept: all_concepts[concept_id].new_concept,
        userid: all_concepts[concept_id].userid
    }, function(approval_data) {

        stopThinking();
        this_round = 0,
        current_concept = concept_id,
        num_trials = 0;
        outerLoop();

    });

});



// rejecting a concept
$("body").delegate("#button-reject", "click", function(e) {
  var concept_id = $(this).attr("concept");
  $("#concept-reject-confirm").attr("concept", concept_id);
  $("#concept-reject-modal").modal('show');
})

$("body").delegate("#concept-reject-confirm", "click", function(e) {
    var concept_id = $(this).attr("concept");

    thinking("Clearing data...");

    $.getJSON($SCRIPT_ROOT + "_write_criteria_rejection", {
        concept_id: concept_id,
    }, function(data) {
        stopThinking();
        getConceptData();
    });

});

