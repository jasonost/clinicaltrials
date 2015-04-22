function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
            xobj.open('GET', $SCRIPT_ROOT + 'static/assets/typeahead.json', true); 
            xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
          };
          xobj.send(null);  
}
 
$.widget( "custom.catcomplete", $.ui.autocomplete, {
  _create: function() {
        this._super();
        this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
      },
  _renderMenu: function( ul, items ) {
    var self = this,
    currentCategory = "";
    $.each( items, function( index, item ) {
      if ( item.category != currentCategory ) {
        ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
        currentCategory = item.category;
      }
      self._renderItemData( ul, item );
    });
  }
});

$(function() {
    loadJSON(function(response) {
      var data = JSON.parse(response);
      $( "#search-text" ).catcomplete({
          delay: 0,
          source: function(request, response) {
              var results = $.ui.autocomplete.filter(data, request.term);
              var cond_results = results.filter(function(element) {return element.category == "Condition"}).slice(0, 7);
              var inst_results = results.filter(function(element) {return element.category == "Institution"}).slice(0, 7);
              response(cond_results.concat(inst_results));
            },
            delay: 200,
            minLength:2,
            select: function(event, ui) {
                if(ui.item.category == "Institution"){
                    window.location = $SCRIPT_ROOT + "institution?inst="+ui.item.inst_id;
                }
                else if(ui.item.category == "Condition"){
                    window.location = $SCRIPT_ROOT + "condition?cond="+ui.item.cond_id;
                }
            }
      });
    });

    $.getJSON( $SCRIPT_ROOT + "_check_login", {}, function( data ) {
      if (data.logged_in && !($("#logged-in-area").length > 0)) {
        changeButtons(data.username);
        return false;
      }
    });
});

$("#search-text").keydown(function(event) {
    if (event.keyCode == 13) {
        var cur_str = $('#search-text').val();
        if (cur_str.length > 0) {
          window.open($SCRIPT_ROOT + "search_results?q=" + cur_str, "_self");
          return false;
        }
      }
});









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
  function redir(admin) {
      var nct_id = getParameterByName('nct_id');
      e.preventDefault();
      e.stopPropagation();
      OpenInNewTab($SCRIPT_ROOT + "structure_trial_criteria?nct_id=" + nct_id);
      return false;
  }
  loginCheck(redir, "Whoops, you need to log in before you can use that tool.");
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
      console.log(cond_ids);
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
      e.preventDefault();
      e.stopPropagation();
      OpenInNewTab($SCRIPT_ROOT + "active_learning?term=" + initial_term);
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
      e.preventDefault();
      e.stopPropagation();
      OpenInNewTab($SCRIPT_ROOT + "active_learning?term=" + initial_term);
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
      console.log(admin);
      if (admin == 1) {
        $("#admin-select-modal").modal('show');
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







// trial list filters
$("#filter-type-switch").bootstrapSwitch();

var intr = ['All (default)',
            'Drug',
            'Procedure',
            'Behavioral',
            'Device',
            'Biological',
            'Dietary Supplement',
            'Radiation',
            'Genetic','Other'];
var stat = ['All (default)',
            'Completed',
            'Recruiting',
            'Active, not recruiting',
            'Not yet recruiting',
            'Terminated',
            'Withdrawn',
            'Enrolling by invitation',
            'Suspended',
            'Withheld',
            'Available',
            'No longer available',
            'Approved for marketing',
            'Temporarily not available'];
var patient_html;

$('#filter-type-switch').on('switchChange.bootstrapSwitch', function(event, state) {
  if (state) {
    // Patients
    $('#filter-list').empty();
    $('#filter-list').append(patient_html);
  } else {
    // Researchers
    patient_html = $('#filter-list').html();
    $('#filter-list').empty();
    $('#filter-list').append('<h5>Intervention Type</h5>'+
                                '<select multiple class="form-control">' +
                                  '<option>' + intr.join('</option><option>') + '</option>' +
                                '</select>' +
                              '<h5>Trial Status</h5>' +
                              '<select multiple class="form-control">' +
                                '<option>' + stat.join('</option><option>') + '</option>' +
                              '</select>');
  }
  console.log(this); // DOM element
  console.log(event); // jQuery event
  console.log(state); // true | false
});

  
    
