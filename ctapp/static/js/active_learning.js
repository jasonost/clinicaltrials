function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function thinking(description) {
    var header = '<h4>' + description + '</h4>',
        spinner = '<i id="top-cond-spinner" class="fa fa-spinner fa-pulse" style="font-size: 5em; margin: .5em;"></i>';
    $("#learning-window").empty();
    $("#learning-window").html(header + spinner);
}

function stopThinking() {
    $("#learning-window").empty();
}

// global variables to keep track of things
var idx = 0,
    accepts = [],
    rejects = [],
    wordtype = 'term',
    thislist = [],
    thisround = 0;

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
            $.ajax({dataType: "json",
                    url: $SCRIPT_ROOT + "_learning_terms_w2v",
                    data: {initial_term: initial_term,
                            num: 20
                            },
                    success: function( data ) {
                                stopThinking();
                                if (data.new_vals.length == 1) {
                                    console.log('no word2vec for ' + initial_term);
                                    startProcess();
                                } else {
                                    thislist = data.new_vals;
                                    learnWords();
                                }
                            } 
            });
    });


})





// decide what to do
function startProcess() {
    if (wordtype == 'term') {
        thinking("Loading new predictors...");
        idx = 0,
        accepts = [],
        rejects = [],
        wordtype = 'predictor';
        getPredictors();
    } else {
        thinking("Loading new terms...");
        idx = 0,
        accepts = [],
        rejects = [],
        wordtype = 'term';
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
        $("#learning-window").empty();
        var this_word = thislist[idx].name;
        var word_attrs = 'word="' + this_word + '" '
        $("#learning-window").html('<p>&nbsp;</p>' +
                                   '<h4>Is the ' + wordtype + ' <span class="word-highlight">' + 
                                   this_word + '</span> related to this concept?</h4>' +
                                   '<div class="form-inline" style="margin-left: 2em">' +
                                     '<button id="accept-word" ' + word_attrs + ' class="btn btn-success btn-sm word-btn">Yes</button>&nbsp;' +
                                     '<button id="reject-word" ' + word_attrs + ' class="btn btn-danger btn-sm word-btn">No</button>&nbsp;' +
                                     '<button id="quit-word" class="btn btn-default btn-sm word-btn">Stop</button>&nbsp;' +
                                   '</div>');
    } else {
        writeData();
        startProcess();
    }
}

function cycleWord(w, incexc, arr) {
    arr.push(w);
    $("#" + wordtype + "-" + incexc).append("<li>" + w + "</li>");
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
    $("#learning-window").empty();
    startProcess();
});
$("body").delegate("#quit-warning-submit", 'click', function(e) {
    writeData();
    $.getJSON($SCRIPT_ROOT + '_clear_session', {}, function(data) {
        closeWindow();
    })
});





