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


