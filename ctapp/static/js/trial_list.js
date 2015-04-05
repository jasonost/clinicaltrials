var v_id = window.location.search.split('=')[1];
var v_type = window.location.search.split('=')[0].substring(1);

$.getJSON( $SCRIPT_ROOT + "_trial_list", {page: v_type, id: v_id}, function( data ) {

$.each( data.result, function( key, val ) {

  var trial_div = "<div class='trial block-list-item'><h4><a href='" + $SCRIPT_ROOT + "trial?nct_id=" + 
                  val.nct_id + 
                  "'>" +
                  val.trial_title + 
                  "</a></h4>" +
                  "<p>" + val.lay_str + "</p>"
                  "</div>"
  $("#trial-list").append(trial_div)

  });

});

