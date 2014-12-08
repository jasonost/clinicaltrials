function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
            xobj.open('GET', 'clinicaltrials/static/assets/typeahead.json', true); // Replace 'my_data' with the path to your file
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
        // Parse JSON string into object
        var data = JSON.parse(response);

      $( "#search-text" ).catcomplete({
          delay: 0,
          source: data,
            delay: 200,
            minLength:2,
            select: function(event, ui) {
                if(ui.item.category == "Institution"){
                    window.location = "http://groups.ischool.berkeley.edu/clinicaltrials/institution?inst=";
                }
                else if(ui.item.category == "Condition"){
                    window.location = "http://groups.ischool.berkeley.edu/clinicaltrials/condition?cond=";
                }
            }
      });
    });
});


// function init(){
//     loadJSON(function(response) {
//         // Parse JSON string into object
//         var data = JSON.parse(response);

//         $("#index #search-text").autocomplete({
//             source: data,
//             delay: 200,
//             minLength:2,
//             select: function(event, ui) {
//                 if(ui.item.category == "Institution"){
//                     window.location = "institution.html"
//                 }
//                 else if(ui.item.category == "Condition"){
//                     window.location = "condition.html"
//                 }
//             }
//         });
//     });
// }

// init();
