var inst_id = window.location.search.split('=')[1]

var svg = dimple.newSvg("#top-conditions", 500, 420);

$.getJSON( $SCRIPT_ROOT + "_top_condition", {inst: inst_id}, function( data ) {
  var items = [];
  var i = 1;
  $.each( data.result, function( key, val ) {
  	var item = data.result[key];
  	item["sortOrder"] = i++;
  	items.push(item);
  });

  var chart = new dimple.chart(svg, items);
			chart.setBounds(125, 20, 360, 350);
	  	var yAxis = chart.addCategoryAxis("y", "cond_name");
          yAxis.addOrderRule('trial_count', false);
	  	var xAxis = chart.addMeasureAxis("x", "trial_count");
	  			xAxis.title = "Trial Count"
	  	var chartSeries = chart.addSeries(null, dimple.plot.bar);
          chartSeries.getTooltipText = function(e) {
            var tool_text = String(e.cx) + " " + String(e.cy) + " trials";
            return [tool_text];
          };
	  	chart.draw();
});