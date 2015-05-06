function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function thinking(description) {
    var header = '<h4>' + description + '</h4>',
        spinner = '<i id="top-cond-spinner" class="fa fa-spinner fa-pulse" style="font-size: 5em; margin: .5em;"></i>';

    // clear out old items
    $("#learning-pane-term, #learning-pane-predictor").empty();

    // add spinner
    $("#learning-pane-" + wordtype).html(header + spinner);

    // add overlays
    var otherterm = wordtype == 'term' ? 'predictor' : 'term';
    $("." + otherterm + "-pane").append(overlay);
}

function stopThinking() {
    if (wordtype == 'term') {
        $("#learning-pane-" + wordtype).html(term_div);
    } else {
        $("#learning-pane-" + wordtype).html(pred_div);
    }
}

function writeExisting(wordlist) {
    var outtext = '';
    for (i=0; i<wordlist.length; i++) {
        outtext += '<li>' + wordlist[i] + '</li>';
    }
    return outtext;
}

// global variables to keep track of things
var idx = 0,
    totalaccepts = 0,
    accepts = [],
    rejects = [],
    wordtype = 'term',
    thislist = [],
    thisround = 0;

// warning text for when a lot of terms and predictors are rejects
var term_rejects_warning = "<p>You are rejecting a lot of suggestions, so it's possible you have exhausted the " +
                           "list of terms for this concept. Press \"Stop\" at any time to end the term discovery " +
                           "process and submit the concept for review.</p>",
    pred_rejects_warning = "<p>Please keep in mind that predictors are only used to find new terms. They will not be used " +
                           "to identify trials associated with this concept, so do not need to be closely related to the concept itself.</p>" +
                           "<p>If it's possible a word or phrase may appear in the same sentence as this concept, you may " +
                           "want to accept it so the algorithm can find new terms to suggest.</p>",
    term_div = "<p class='alert alert-info alert-sm' style='margin-bottom: 0px'>" +
               "<small>A <b>term</b> is a word or phrase that is related to the concept.</small></p>" +
               "<div class='col-xs-12 col-sm-12 col-md-12 learning-question' id='learning-term'></div>",
    pred_div = "<p class='alert alert-info alert-sm' style='margin-bottom: 0px'>" + 
               "<small>A <b>predictor</b> is a word or phrase that often co-occurs with the concept, e.g. "+
               "&quot;hypertension&quot; is often preceded by &quot;chronic&quot;.</small></p>" +
               "<div class='col-xs-12 col-sm-12 col-md-12 learning-question' id='learning-predictor'></div>",
    overlay = "<div class='overlay-box'></div>";




// when document is ready...
$(function() {
    var concept_id = getParameterByName('cid'),
        initial_term = getParameterByName('term'),
        criteria_text_id = getParameterByName('id');

    thinking("Loading model...");

    $.getJSON($SCRIPT_ROOT + "_learning_startup", {
            concept_id: concept_id,
            criteria_text_id: criteria_text_id,
            initial_term: initial_term
        }, function( data ) {
            if (data.new_concept == 0) {
                $("#term-include").append(writeExisting(data.term));
                $("#term-exclude").append(writeExisting(data.term_exc));
                $("#predictor-include").append(writeExisting(data.predictor));
                $("#predictor-include").append(writeExisting(data.predictor_exc));
            };
            $.getJSON($SCRIPT_ROOT + "_learning_terms_w2v", {
                initial_term: initial_term,
                num: 20
                }, function( data ) {
                        stopThinking();
                        if (data.new_vals.length == 1) {
                            console.log('no word2vec for ' + initial_term);
                            startProcess();
                        } else {
                            thislist = data.new_vals;
                            learnWords();
                        }
                    });
    });


})





// decide what to do (main loop function)
function startProcess() {
    thisround++;
    $(".overlay-box").remove();

    // check if rejecting more than 75% of stuff...
    var thiscount = accepts.length + rejects.length,
        rejcount = rejects.length;
    if (thiscount >= 8 && rejcount / thiscount >= 0.75) {
        if (wordtype == 'term') {
            $("#rejects-warning-modal .modal-body").html(term_rejects_warning);
        } else {
            $("#rejects-warning-modal .modal-body").html(pred_rejects_warning);
        }
        $("#rejects-warning-modal").modal("show");
    }

    // decide what to do based on the existing word type
    if (wordtype == 'term') {
        wordtype = 'predictor';
        thinking("Loading new predictors...");
        idx = 0,
        accepts = [],
        rejects = [],
        getPredictors();
    } else {
        wordtype = 'term';
        thinking("Loading new terms...");
        idx = 0,
        accepts = [],
        rejects = [],
        getTerms();
    }
}






// writing data to database
function writeData() {
    $.getJSON($SCRIPT_ROOT + "_write_data", {
        acc: JSON.stringify(accepts),
        rej: JSON.stringify(rejects),
        wt: wordtype
    }, function(data) {
        return true;
    });
}

// getting predictors
function getPredictors() {
    $.getJSON($SCRIPT_ROOT + "_learning_preds", {}, function(data) {
        stopThinking();
        if (data.new_vals.length == 0) {
            startProcess();
        } else {
            thislist = data.new_vals;
            learnWords();
        }
    })
}

// getting terms
function getTerms() {
    $.getJSON($SCRIPT_ROOT + "_learning_terms_basic", {}, function(data) {
        stopThinking();
        if (data.new_vals.length == 0) {
            startProcess();
        } else {
            thislist = data.new_vals;
            learnWords();
        }
    })
}




// looping through terms/predictors in a single round
$("body").delegate("#accept-word", 'click', function(e) {
    var w = this.getAttribute('word');
    cycleWord(w, 'include', accepts);
});
$("body").delegate("#reject-word", 'click', function(e) {
    var w = this.getAttribute('word');
    cycleWord(w, 'exclude', rejects);
});
$("body").delegate("#quit-word", 'click', function(e) {
    $("#quit-warning-modal").modal('show');
});

function learnWords() {
    if (idx < thislist.length) {
        $("#learning-" + wordtype).empty();
        var this_word = thislist[idx].name;
        var word_attrs = 'word="' + this_word + '" ';
        var headertext = '';
        if (wordtype == 'term') {
            headertext = '<table class="active-learn-table"><col width="100%">' +
                         '<tr><td style="height: 72px"><h4>Is the term <span class="word-highlight">' + this_word + '</span> related to this concept?</h4></td></tr>';
        } else {
            headertext = '<table class="active-learn-table"><col width="100%">' +
                         '<tr><td style="height: 64px"><h4>Does <span class="word-highlight">' + this_word + '</span> sometimes appear with this concept?</h4></td></tr>';
        }
        var this_progress = Math.round((idx + 1) / thislist.length * 100);
        $("#learning-" + wordtype).html(headertext +
                                   '<tr><td style="height: 48px"><div class="form-inline" style="margin-left: 2em">' +
                                     '<button id="accept-word" ' + word_attrs + ' class="btn btn-success btn-sm word-btn">Yes</button>&nbsp;' +
                                     '<button id="reject-word" ' + word_attrs + ' class="btn btn-danger btn-sm word-btn">No</button>&nbsp;' +
                                     '<button id="quit-word" class="btn btn-default btn-sm word-btn">Stop</button>&nbsp;' +
                                   '</div></td></tr>' +
                                   '<tr><td style="height: 52px; vertical-align: bottom"><small><strong>Progress: </strong> ' + 
                                    (idx + 1) + ' / ' + thislist.length + ' ' + wordtype + (thislist.length > 1 ? 's' : '') +
                                    ' until ' + (wordtype == 'term' ? 'predictor' : 'term') + ' step</small>' +
                                     '<div class="progress" style="margin-bottom: 0px">' +
                                       '<div class="progress-bar progress-bar-info" role="progressbar" ' +
                                       ' aria-valuenow="' + this_progress + 
                                       '" aria-valuemin="0" aria-valuemax="100" style="width: ' + this_progress + '%">' +
                                       '<span class="sr-only">' + this_progress + '% Complete (success)</span>' +
                                       '</div>' +
                                     '</div></td></tr></table>');
    } else if (thisround < 10) {
        writeData();
        startProcess();
    } else {
        $("#rounds-10-modal").modal('show');
        $("#rounds-10-submit").on('click', function(e) {
            writeData();
            $.getJSON($SCRIPT_ROOT + '_clear_session', {}, function(data) {
                closeWindow();
            });
        });
    }

}

function cycleWord(w, incexc, arr) {
    arr.push(w);
    if (incexc == 'include' && wordtype == 'term') {
        totalaccepts++;
        if (totalaccepts == 20) {
            $("#terms-20-modal").modal("show");
        }
    }
    var thisid = thisround*100 + idx;
    $("#" + wordtype + "-" + incexc).prepend("<li id='t-" + thisid + "''>" + w + "</li>");
    $("#t-" + thisid).effect("highlight", {}, 1000);
    idx++;
    learnWords();
}


// modal interaction

function closeWindow() {
  if (confirm("Close Window?")) {
    close();
  }
}

$("body").delegate("#quit-warning-cancel", 'click', function(e) {
    $("#learning-" + wordtype).empty();
    startProcess();
});

$("body").delegate("#quit-warning-submit", 'click', function(e) {
    writeData();
    $.getJSON($SCRIPT_ROOT + '_clear_session', {}, function(data) {
        $("#quit-warning-modal").modal('hide');
        $("#close-window-modal").modal('show');
    });
});

$("body").delegate("#close-window-submit", 'click', function(e) {
    window.open($SCRIPT_ROOT, "_self");
});



// rename concept
$("#rename-concept").on('click', function(e) {
    $.getJSON($SCRIPT_ROOT + "_concept_terms", {
        acc: JSON.stringify(accepts)
    }, function(data) {
        var new_html = "<p>Please select one of the following terms to be the name of this concept:</p>" +
                        "<div class='dropdown'>" +
                         "<button class='btn btn-default dropdown-toggle dropdown-wide' type='button' id='all-term-dropdown' data-toggle='dropdown' aria-expanded='true'>" +
                         "<span class='caret'></span>" +
                         "</button>" +
                        "<ul class='dropdown-menu' role='menu' aria-labelledby='all-term-dropdown'>";
        for (i=0; i<data.all_terms.length; i++) {
            new_html += "<li role='presentation'><a role='menuitem' tabindex='-1' href='#'>" + data.all_terms[i] + "</a></li>";
        }
        new_html += "</ul></div>";
        $("#rename-concept-modal .modal-body").html(new_html);
        $("#rename-concept-modal").modal('show');
        $(".dropdown-menu li a").on('click', function(e) {
            var new_name = $(this).text();
            $.getJSON($SCRIPT_ROOT + '_rename_concept', {
                new_name: new_name
            }, function(data) {
                if (data.done) {
                    $("#concept-name").text(new_name);
                } else {
                    alert("Sorry, there was a problem. Please try again later.");
                }
                $("#rename-concept-modal").modal('hide');
            })
        });
    });
});









