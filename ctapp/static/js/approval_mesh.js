function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var approval_table = '<h3>Please review the following assignments</h3>' +
                      '<div class="row">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12">' +
                          '<table class="top-margin-2em table">' +
                            '<col width="5%">' +
                            '<col width="40%">' +
                            '<col width="20%">' +
                            '<col width="15%">' +
                            '<col width="20%">' +
                            '<tr class="h4">' +
                              '<td></td>' +
                              '<td>Title</td>' +
                              '<td class="warning">New term</td>' +
                              '<td>User name</td>' +
                              '<td>User institution</td>' +
                            '</tr>';


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
    getAssignments();
})



// get data for all staged mesh assignments and add to table
var all_mesh = {};

function getAssignments() {

    stopThinking();

    $.getJSON($SCRIPT_ROOT + "_approve_assignments_load", {}, function (data) {

        var assignments = data.assignments,
            this_approval_table = approval_table;

        if (Object.keys(assignments).length > 0) {

            for (var i in assignments) {
                var conditions = assignments[i].cond_name;
                for (var j in conditions) {
                    this_approval_table += '<tr>' +
                                        '<td style="text-align: right"><input type="checkbox" name="terms-checked" value="' + 
                                           conditions[j] + '" checked></td>' + 
                                        '<td><a href="' + $SCRIPT_ROOT + 'trial?nct_id=' + i + '" target="_blank">' + assignments[i].title + '</td>' +
                                        '<td class="warning">' + j + '</td>' +
                                        '<td>' + assignments[i].username + '</td>' +
                                        '<td>' + assignments[i].userinst + '</td>' +
                                      '</tr>';

                }
            }

            this_approval_table += '<tr class="warning">' +
                                '<td style="text-align: right"><input type="checkbox" id="check-all" checked></td>' +
                                '<td><strong>Select all</strong></td>' +
                                '<td></td><td></td><td></td>' +
                              '</tr></table>' +
                              '<div class="top-margin-2em">' +
                                '<button id="button-approval" class="btn btn-success">Approve selected assignments</button>' +
                              '</div></div></div>';
            $("#current-approval").html(this_approval_table);

        } else {
            $("#current-approval").html('<div class="alert alert-success">There are no MeSH assignments to approve.</div>');
        }

    });

}





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

$("body").delegate("#button-approval", "click", function(e) {
    var ok_assign = [],
        bad_assign = [];

    $("input[name=terms-checked]:checked").each(function() {
        ok_assign.push($(this).val());
    });

    $("input[name=terms-checked]:not(:checked)").each(function() {
        bad_assign.push($(this).val());
    })

    $(window).scrollTop();
    thinking("Writing data...");

    $.getJSON($SCRIPT_ROOT + "_write_assignment_approval", {
        ok_assign: JSON.stringify(ok_assign),
        bad_assign: JSON.stringify(bad_assign)
    }, function() {

        getAssignments();

    });

});



