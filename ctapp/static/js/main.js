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
              var cond_results = results.filter(function(element) {return element.category == "Condition"}).slice(0, 5);
              var inst_results = results.filter(function(element) {return element.category == "Institution"}).slice(0, 5);
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

if ($(window).width() < 768) {
  var buttons = $("#login-area").clone();
  $("#login-area").remove();
  $("#navbar-top").append(buttons);
}

// logout button action
$("#login-area").on('click', "#logout-button", function (e) {
  $.getJSON( $SCRIPT_ROOT + "_logout", function(e) {
    $("#logged-in-area").remove();
    $('#login-area').append('<button id="create-acct-button" type="button" class="navbar-button btn btn-success btn-xs" ' +
        'data-toggle="modal" data-target="#create-user-modal">Create account</button> <button id="login-button" type="button" ' +
        'class="navbar-button btn btn-success btn-xs" data-toggle="modal" data-target="#login-modal">Login</button>');
  });
});

// clearing input vals info
function clearVals() {
  $(".form-control").val('');
};

// main user creation interaction
$('#create-user-submit').on('click', function(e){
  $("#create-acct-button").blur();
  $.getJSON( $SCRIPT_ROOT + "_create_user", {
      name: $("#input-full-name").val(),
      inst_user: $("#input-institution").val(),
      email: $("#input-email").val(),
      pwd: $("#create-user-modal #input-password").val(),
      username: $("#create-user-modal #input-username").val()
    }, function( data ) {
    clearVals();
    if (data.result == 'ok') {
      $('#create-acct-button').remove();
      $('#login-button').remove();
      $('#login-area').append('<div id="logged-in-area" class="navbar-button"><small>Logged in as <b>' + data.username + '</b><small> ' +
          '<button id="logout-button" type="button" class="btn btn-danger btn-xs">Logout</button></div>');
    } else {
      alert("There was an error. Please try again.");
    }
   });
});

$('#create-user-cancel').on('click', function(e){
    $("#create-acct-button").blur();
    clearVals();
  }
);

// main user login interaction
$('#login-submit').on('click', function(e){
  $.getJSON( $SCRIPT_ROOT + "_login", {
      pwd: $("#login-modal #input-password").val(),
      username: $("#login-modal #input-username").val()
    }, function( data ) {
    clearVals();
    if (data.result == 'ok') {
      $('#create-acct-button').remove();
      $('#login-button').remove();
      $('#login-area').append('<div id="logged-in-area" class="navbar-button"><small>Logged in as <b>' + data.username + '</b><small> ' +
          '<button id="logout-button" type="button" class="btn btn-danger btn-xs">Logout</button></div>');
    } else {
      alert("Well, that didn't work. Please try again.");
    }
   });
});

$('#login-cancel').on('click', function(e){
    clearVals();
  }
);




