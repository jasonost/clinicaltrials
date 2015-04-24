function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$.getJSON( $SCRIPT_ROOT + "_top_condition", {inst: getParameterByName('inst')}, function( data ) {

  // create lookup of term to condition id
  var id_lookup = {}
  for (i =0; i < data.result.length; i++) {
    id_lookup[data.result[i].cond_name] = data.result[i].cond_id;
  }

  var $t = $("#top-conditions");
  var divWidth = $t.innerWidth() - parseFloat($t.css("padding-left")) - parseFloat($t.css("padding-right"));
  var yAxisStart = 20;

  var svg = dimple.newSvg("#top-conditions", divWidth, 27.5 * data.result.length + 40);

  var chart = new dimple.chart(svg, data.result);
  chart.setBounds(yAxisStart, 5, divWidth - yAxisStart - 20, 27.5 * data.result.length);

  var myColor = new dimple.color('#0080db'); // green: #00a800, blue: #0054a8
  myColor.opacity = 0.3;
  chart.defaultColors = [
    myColor
  ]; 

  var yAxis = chart.addCategoryAxis("y", "cond_name");
      yAxis.addOrderRule('trial_count', false);
      yAxis.title = "";
      yAxis.fontSize = "1.05em";

  var xAxis = chart.addMeasureAxis("x", "trial_count");
      xAxis.title = "Trial Count";
      xAxis.fontSize = "0.9em";

  var chartSeries = chart.addSeries(null, dimple.plot.bar);
  chartSeries.getTooltipText = function(e) {
    var tool_text = String(e.cx) + " " + String(e.cy) + " trials";
    return [tool_text,];
  };
  chartSeries.addEventHandler("click", function (e) {
    window.location = $SCRIPT_ROOT + "condition?cond=" + id_lookup[e.yValue];
  });

  // remove spinner
  $("#top-cond-spinner").remove();

  chart.draw();

  var old_y = d3.select('g .dimple-axis-y').node();
  old_y.remove();
  $("svg g").first().append(old_y);


  yAxis.shapes.selectAll(".dimple-axis-y .tick line").remove();
  yAxis.shapes.selectAll(".dimple-axis-y .tick text").call(function(text) {
    text.each(function() {
      var text = d3.select(this),
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy"));
      text.style({'text-anchor': 'start', 'font-weight': 'bold'}).attr("x", 10).attr("y", y).attr("dy", dy + "em");
      $(this).parent().on("click", function (e) {
        var cond_id = id_lookup[$(this).text()];
        window.location = $SCRIPT_ROOT + "condition?cond=" + cond_id;
      });
    })
  });

});

