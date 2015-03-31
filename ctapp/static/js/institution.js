var wrap = function (text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        tspan.attr("dy", (dy - (lineHeight / 2)) + "em");
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight - (lineHeight / 2) + dy + "em").text(word);
      }
    }
  });
};

var inst_id = window.location.search.split('=')[1];

$.getJSON( $SCRIPT_ROOT + "_top_condition", {inst: inst_id}, function( data ) {
  var items = [];
  var i = 1;
  $.each( data.result, function( key, val ) {
    var item = data.result[key];
    item["sortOrder"] = i++;
    items.push(item);
  });

  var svg = dimple.newSvg("#top-conditions", 500, 600);

  var chart = new dimple.chart(svg, items);
      chart.setBounds(165, 20, 325, 27.5 * items.length);

  var yAxis = chart.addCategoryAxis("y", "cond_name");
      yAxis.addOrderRule('trial_count', false);
      yAxis.title = "";

  var xAxis = chart.addMeasureAxis("x", "trial_count");
      xAxis.title = "Trial Count";

  var chartSeries = chart.addSeries(null, dimple.plot.bar);
      chartSeries.getTooltipText = function(e) {
        var tool_text = String(e.cx) + " " + String(e.cy) + " trials";
        return [tool_text,];
      };

  chart.draw();

  yAxis.shapes.selectAll(".tick text").call(wrap, 140);

});

