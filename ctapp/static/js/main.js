// check login to update box
$.getJSON( $SCRIPT_ROOT + "_check_login", {}, function( data ) {
    if (data.logged_in && !($("#logged-in-area").length > 0)) {
      changeButtons(data.username);
      return false;
    }
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};


// on page load:
$(function() {

    var conditions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: $SCRIPT_ROOT + "static/assets/conditions.json"
    });

    var institutions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: $SCRIPT_ROOT + "static/assets/institutions.json"
    });

    conditions.initialize();
    institutions.initialize();

    $('#search-text').typeahead({
      highlight: true,
      minLength: 1
    },
    {
      name: 'conditions',
      displayKey: 'text',
      source: conditions.ttAdapter(),
      templates: {
        header: '<div class="search-header">Conditions</div>'
      }
    },
    {
      name: 'institutions',
      displayKey: 'text',
      source: institutions.ttAdapter(),
      templates: {
        header: '<div class="search-header">Institutions</div>'
      }
    });

      //color: '#d9534f'
    var pulse_props = {
      boxShadow: "0px 0px 15px 3px #FFCC11"
    }

    $("#add-mesh-btn, #structure-criteria-btn").pulse(pulse_props, {duration: 1500, pulses: 5})

});


var cur_obj = {},
    full_val = false;

function respond_to_event() {
  if (full_val) {
    var page = '';
    if (cur_obj.type == 'cond') {
      page = 'condition';
    } else {
      page = 'institution';
    }
    window.open($SCRIPT_ROOT + page + "?" + cur_obj.type + "=" + cur_obj.value, "_self");
    return false;
  } else {
    var cur_str = $('#search-text').val();
    if (cur_str.length > 0) {
      window.open($SCRIPT_ROOT + "search_results?q=" + cur_str, "_self");
      return false;
    }
  }
}

$("#search-text").keydown(function(event) {
    if (event.keyCode == 13) {
      respond_to_event();
      } else {
        cur_obj = {};
        full_val = false;
      }
});

$("#search-button").on('click', function(e) {
  respond_to_event();
});

$("#search-text").on('typeahead:cursorchanged typeahead:autocompleted', function (e, datum) {
    cur_obj = datum;
    full_val = true;
});

$("#search-text").on('typeahead:selected', function(e, datum) {
  var page = '';
  if (datum.type == 'cond') {
    page = 'condition';
  } else {
    page = 'institution';
  }
  window.open($SCRIPT_ROOT + page + "?" + datum.type + "=" + datum.value, "_self");
})







// clearing input vals info
function clearVals() {
  $(".form-control").val('');
};

function clearUserPass() {
  $("#input-username").val('');
  $("#input-password").val('');
}

// replacing login buttons with username and logout button
function changeButtons(username) {
  $('#create-acct-button').remove();
  $('#login-button').remove();
  $('#login-area').append('<div id="logged-in-area"><small>Logged in as <strong>' + username + '</strong><small>&nbsp;' +
      '<button id="logout-button" type="button" class="btn btn-danger btn-xs">Logout</button></div>');
}

// main user creation interaction
function createUser(e) {
  $.getJSON( $SCRIPT_ROOT + "_create_user", {
      name: $("#input-full-name").val(),
      inst_user: $("#input-institution").val(),
      email: $("#input-email").val(),
      pwd: $("#create-user-modal #input-password").val(),
      username: $("#create-user-modal #input-username").val()
    }, function( data ) {
    if (data.result == 'ok') {
      clearVals();
      changeButtons(data.username);
    } else if (data.result == 'Username is already taken. Please try another one.') {
      clearUserPass();
      alert(data.result);
    } else {
      $("#input-password").val('');
      alert("There was an error. Please try again.");
    }
   });
}

$('#create-user-submit').on('click', function(e){createUser(e)} );

$("#create-user-modal .form-control").keydown(function(e) {
    if (e.keyCode == 13) {
        if ($("#input-full-name").val().length > 0 &&
            $("#input-institution").val().length > 0 &&
            $("#input-email").val().length > 0 &&
            $("#create-user-modal #input-password").val().length > 0 &&
            $("#create-user-modal #input-username").val().length > 0) {
          createUser(e);
          $("#create-user-modal").modal('hide');
        } else {
          alert('All fields must be completed in order to create an account! Please try again.');
        }
        return false;
      }
});

$('#create-user-cancel').on('click', function(e){clearVals()} );

// main user login interaction
function loginUser(e) {
  $.getJSON( $SCRIPT_ROOT + "_login", {
      pwd: $("#login-modal #input-password").val(),
      username: $("#login-modal #input-username").val()
    }, function( data ) {
    clearVals();
    if (data.result == 'ok') {
      changeButtons(data.username);
    } else {
      alert("Username and password don't match any existing account. Please try again.");
    }
  });
}

$('#login-modal').on('shown.bs.modal', function () {
    $('#login-modal #input-username').focus();
})

$('#login-submit').on('click', function(e){loginUser(e)} );

$("#login-modal .form-control").keydown(function(e) {
    if (e.keyCode == 13) {
        if ($("#login-modal #input-password").val().length > 0 &&
            $("#login-modal #input-username").val().length > 0) {
          loginUser(e);
          $("#login-modal").modal('hide');
        } else {
          alert('Username and password must both be present in order to log in! Please try again.');
        }
        return false;
      }
});



$('#login-cancel').on('click', function(e){clearVals()} );

// logout button action
$("#login-area").on('click', "#logout-button", function (e) {
  $.getJSON( $SCRIPT_ROOT + "_logout", function(e) {
    $("#logged-in-area").remove();
    $('#login-area').append('<button id="create-acct-button" type="button" class="btn btn-success btn-xs" ' +
        'data-toggle="modal" data-target="#create-user-modal">Create account</button> <button id="login-button" type="button" ' +
        'class="btn btn-success btn-xs" data-toggle="modal" data-target="#login-modal">Login</button>');
  });
});









// check login and alert or redirect as necessary
function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function loginCheck(ok_fcn, warn_msg) {
  $.getJSON( $SCRIPT_ROOT + "_check_login", {}, function( data ) {
    if (data.logged_in) {
      ok_fcn(data.admin);
    } else {
      alert(warn_msg);
    }
  });
}

// structure criteria jump
$("#structure-criteria-btn").on("click", function(e) {
  $("#goto-criteria-modal").modal('show');
})

$("#goto-criteria-ok").on("click", function(e) {
  function redir(admin) {
      var nct_id = getParameterByName('nct_id');
      window.open($SCRIPT_ROOT + "structure_trial_criteria?nct_id=" + nct_id, "_self");
      return false;
  }
  loginCheck(redir, "Whoops, you need to log in before you can use that tool.");
});

$("#goto-criteria-enter").on("click", function(e) {
  $("#create-concept-modal").modal('show');
  $("#goto-criteria-modal").modal('hide');
});

// accepting MeSH term suggestions interaction
$("#add-mesh-btn").on('click', function(e) {
  loginCheck(function(admin) {
    $("#add-mesh-modal").modal('show');
    $("#add-mesh-submit").on("click", function(g) {
      var nct_id = getParameterByName('nct_id'),
          cond_ids = [];
      $.each($("input[name='add-mesh-term']:checked"), function() {
        cond_ids.push($(this).val());
      });
      $.getJSON($SCRIPT_ROOT + "_mesh_stage", {
        cond_ids: JSON.stringify(cond_ids),
        nct_id: nct_id
      }, function(data) {
        if (data.done) {
          $("#add-mesh-modal .modal-body").html("<p>Your contribution will be reviewed by an administrator.</p>");
        } else {
          $("#add-mesh-modal .modal-body").html("<p>There is a problem. Please try again later.</p>");
        }
        $("#add-mesh-submit").remove();
        $("#add-mesh-modal .modal-footer").append('<button id="add-mesh-finish" type="button" class="btn btn-success" data-dismiss="modal">OK</button>');
        $("#add-mesh-finish").on('click', function(e) {
          $("#add-mesh-modal").modal('hide');
        })
      });
      return false;
    });
  }, "Whoops, you need to log in before you can tag trials with additional conditions.")
});






// tool interactions
$('#create-concept-modal').on('shown.bs.modal', function () {
    $('#create-concept-modal #input-new-concept').focus();
})

$('#create-concept-submit').on('click', function(e){
  function redir(admin) {
      var initial_term = $("#create-concept-modal #input-new-concept").val();
      window.open($SCRIPT_ROOT + "active_learning?term=" + initial_term, "_self");
      return false;
  }
  if ($("#create-concept-modal #input-new-concept").val().length > 1) {
    loginCheck(redir, "Whoops, you need to log in before you can use that tool.");
    $("#create-concept-modal").modal('hide');
  } else {
    clearVals();
    alert('You must enter a term longer than one character. Please try again.');
  }
});

$("#create-concept-modal .form-control").keydown(function(e) {
  function redir(admin) {
      var initial_term = $("#create-concept-modal #input-new-concept").val();
      window.open($SCRIPT_ROOT + "active_learning?term=" + initial_term, "_self");
      return false;
  }
  if (e.keyCode == 13) {
      if ($("#create-concept-modal #input-new-concept").val().length > 1) {
        loginCheck(redir, "Whoops, you need to log in before you can use that tool.");
        $("#create-concept-modal").modal('hide');
      } else {
        clearVals();
        alert('You must enter a term longer than one character. Please try again.');
      }
      return false;
    }
});

$('#create-concept-cancel').on('click', function(e){clearVals()} );

// admin tools jump
$("#pick-admin-tool").on("click", function(e) {
  function redir(admin) {
      if (admin == 1) {
        $.getJSON($SCRIPT_ROOT + "_get_admin_counts", {}, function(data) {
          $("#admin-select-num-concepts").text(data.num_concepts + " concept" + (data.num_concepts > 1 ? "s" : "") + " to review");
          $("#admin-select-num-mesh").text(data.num_mesh + " assignment" + (data.num_mesh > 1 ? "s" : "") + " to review");
          $("#admin-select-modal").modal('show');
        })
      } else {
        alert("Sorry, you need to have administrator privileges to use these tools.");
      }
      return false;
  }
  loginCheck(redir, "Whoops, you need to log in before you can use that tool.");
});









// MeSH suggestion interactions
$("#submit-suggestion-text").on('click', function(e) {
  var thisdoc = $("#mesh-text").val();
  console.log(JSON.stringify(thisdoc).length);
  if (thisdoc.length > 0) {
    var header = '<h4>Retrieving suggestions...</h4>',
        spinner = '<i id="top-cond-spinner" class="fa fa-spinner fa-pulse" style="font-size: 5em; margin: .5em;"></i>';
    $("#results-pane").html(header + spinner);
    $.getJSON($SCRIPT_ROOT + '_get_suggestions', {doc: thisdoc}, function(data) {
      $("#results-pane").empty();
      var write_html = '';
      if (data.results) {
        write_html = "<h5>Suggested terms</h5><ul class='nodisc'>";
        for (i=0; i<data.results.length; i++) {
          write_html += "<li><a href='http://www.nlm.nih.gov/cgi/mesh/2015/MB_cgi?mode=&term=" + data.results[i] + 
                        "' target='_blank'>" + data.results[i] + "</li>";
        }
        write_html += "</ul>"
      } else {
        write_html = '<p>Sorry, no results were returned</p>';
      }
      $("#results-pane").html(write_html);
    })
  }

})






// Criteria concept approvals








