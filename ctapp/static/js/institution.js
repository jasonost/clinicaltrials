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

  var $t = $("#top-conditions");
  var divWidth = $t.innerWidth() - parseFloat($t.css("padding-left")) - parseFloat($t.css("padding-right"));
  var yAxisStart = 160;

  var svg = dimple.newSvg("#top-conditions", divWidth, 27.5 * data.result.length + 50);

  var chart = new dimple.chart(svg, data.result);
      chart.setBounds(yAxisStart, 20, divWidth - yAxisStart - 20, 27.5 * data.result.length);
      chart.defaultColors = [
        new dimple.color('#0054a8')
      ]; // green: #00a800, blue: #0054a8

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

  yAxis.shapes.selectAll(".tick text").call(wrap, yAxisStart - 10)

});

