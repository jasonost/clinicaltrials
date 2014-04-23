$(document).ready(function() {

    // size div elements
    var windowHeight = $(window).height() - 8;
    var windowWidth = $(window).width() - 8;

    $("#wrapper").css({
        "height": windowHeight + "px",
        "width": windowWidth + "px",
        "margin": "4px"
    });
    $("#header").css({
        "width": "96%",
        "height": "5%",
        "padding-left": "1%",
        "padding-right": "3%",
        "background-color": "#666",
        "font-size": (0.04 * windowHeight) + "px"
    });
    $("#chord-diagram").css({
        "height": "95%",
        "width": "65%",
        "float": "left"
    });
    $(".side-chart").css({
        "height": "28%",
        "width": "35%",
        "float": "left",
        "visibility": "hidden"
    });
    $("#legend").css({
        "height": "6%",
        "width": "35%",
        "float": "left",
        "visibility": "hidden",
        "font-size": (0.018 * windowHeight) + "px"
    });
    $("#sources").css({
        "height": "5%",
        "width": "35%",
        "float": "left"
    });
    $(".charttitle").css({
        "font-size": (0.02 * windowHeight) + "px",
        "margin-top": (0.01 * windowHeight) + "px"
    });
    $("#sourcetext").css({
        "font-size": (0.015 * windowHeight) + "px",
        "margin": (0.01 * windowHeight) + "px",
        "color": "#333"
    })

    var states = Object.keys(migration);

    // function to get values from dictionary
    var get_values = function(dict) {
        return Object.keys(dict).map(function(key) {return dict[key];});
    };

    // functions to get biggest in- and out-migration state
    var inmigrate = function(stusab) {
        var topstate = "";
        var highest = 0;
        for (var idx in migration[stusab]) {
            if (migration[stusab][idx] > highest) {
                highest = migration[stusab][idx];
                topstate = idx;
            }
        }
        return topstate;
    };

    var outmigrate = function(stusab) {
        var topstate = "";
        var highest = 0;
        for (var idx in migration) {
            if (migration[idx][stusab] > highest) {
                highest = migration[idx][stusab];
                topstate = idx;
            }
        }
        return topstate;
    };

    // create associative arrays with top in- and out-migration states
    var topstates = {};
    for (s = 0; s < states.length; s++) {
        var stusab = states[s];
        topstates[stusab] = {"in": inmigrate(stusab), "out": outmigrate(stusab)};
    };

    // function to create array of housing price data
    var housingarray = function(stusablist) {
        var objarray = [];
        for (h = 0; h < homeprice_scale.length; h++) {
            var obj = {"date": homeprice_scale[h]};
            for (s = 0; s < stusablist.length; s++) {
                obj[stusablist[s]] = homeprice[stusablist[s]][h];
            };
            objarray[h] =  obj;
        };
        return objarray;
    };

    // function to create array of unemployment data
    var unemparray = function(stusablist) {
        var objarray = [];
        for (u = 0; u < unemployment_scale.length; u++) {
            var obj = {"date": unemployment_scale[u]};
            for (s = 0; s < stusablist.length; s++) {
                obj[stusablist[s]] = unemployment[stusablist[s]][u];
            };
            objarray[u] =  obj;
        };
        return objarray;
    };

    // generate matrix for chord diagram
    var matrix = function(dict) {
        return Object.keys(dict).map(function(key) {return Object.keys(dict[key]).map(function(key2) {return dict[key][key2];});});
    };

    // set up chord diagram
    var chorddiv = $("#chord-diagram");

    var chord = d3.layout.chord()
        .padding(.01)
        .sortSubgroups(d3.descending)
        .matrix(matrix(migration));

    var width_chord = chorddiv.width(),
        height_chord = chorddiv.height(),
        innerRadius = Math.min(width_chord, height_chord) * .41,
        outerRadius = innerRadius * 1.1;

    var fill = d3.scale.category20c();

    var svg = d3.select("#chord-diagram")
        .append("svg")
        .attr("width", width_chord)
        .attr("height", height_chord)
        .append("g")
        .attr("id", "circle")
        .attr("transform", "translate(" + width_chord / 2 + "," + height_chord / 2 + ")");

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var g = svg.selectAll("g.group")
        .data(chord.groups())
        .enter()
        .append("g")
        .attr("class", "group")
        .on("mouseover", mouseover_group)
        .on("mouseout", mouseout);

    g.append("path")
        .style("stroke", function(d) { return fill(d.index); })
        .style("fill", function(d) { return fill(d.index); })
        .attr("d", arc);

    g.append("text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".35em")
        .style("font-family", "helvetica, arial, sans-serif")
        .style("font-size", "10px")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
              + "translate(" + (innerRadius + (windowHeight * 0.05)) + ")"
              + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d) { return states[d.index]; });

    var chordPaths = svg.selectAll("path.chord")
        .data(chord.chords())
        .enter()
        .append("path")
        .attr("class", "chord")
        .style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
        .style("fill", function(d) { return fill(d.source.index); })
        .attr("d", d3.svg.chord().radius(innerRadius))
        .on("mouseover", mouseover_chord)
        .on("mouseout", mouseout);

    function mouseover_group(d, i) {
        d3.select("#tooltip")
            .style("visibility", "visible")
            .html(groupTip(d))
            .style("top", function () { return (d3.max([50,d3.event.pageY - 80]))+"px"})
            .style("left", function () { return (d3.max([0,d3.event.pageX - 130]))+"px";})

        var stusab = states[d.index];
        housingGroup(stusab);
        unempGroup(stusab);
        taxesGroup(stusab);

        chordPaths.classed("fade", function(p) {
          return p.source.index != i
              && p.target.index != i;
        });
    };

    function mouseover_chord(d, i) {
        d3.select("#tooltip")
            .style("visibility", "visible")
            .html(chordTip(d))
            .style("top", function () { return (d3.max([50,d3.event.pageY - 80]))+"px"})
            .style("left", function () { return (d3.max([0,d3.event.pageX - 80]))+"px";})

        var stusab1 = states[d.source.index];
        var stusab2 = states[d.target.index];
        housingChord(stusab1, stusab2);
        unempChord(stusab1, stusab2);
        taxesChord(stusab1, stusab2);

    };

    function mouseout(d, i) { 
        d3.select("#tooltip").style("visibility", "hidden");
        d3.select("#housing-chart").style("visibility", "hidden");
        d3.select("#housing-chart").select("svg").remove();
        d3.select("#unemp-chart").style("visibility", "hidden");
        d3.select("#unemp-chart").select("svg").remove();
        d3.select("#taxes-chart").style("visibility", "hidden");
        d3.select("#taxes-chart").select("svg").remove();
        d3.select("#legend").style("visibility", "hidden");
        d3.select("#legend").selectAll("p").remove();
    };

    function groupTip (d) {
        var p = d3.format(".1%"), q = d3.format(",");
        var stusab = states[d.index];
        var inmig = topstates[stusab]["in"];
        var outmig = topstates[stusab]["out"];
        return "Biggest source of " + states[d.index] + " in-migration:<br/>"
            + "&nbsp;&nbsp;&nbsp;" + inmig + " (" + q(migration[stusab][inmig]) + " people)<br/>"
            + "Biggest destination of " + states[d.index] + " out-migration:<br/>"
            + "&nbsp;&nbsp;&nbsp;" + outmig + " (" + q(migration[outmig][stusab]) + " people)";
    };

    function chordTip (d) {
        var p = d3.format(".1%"), q = d3.format(",");
        var stusab1 = states[d.target.index];
        var stusab2 = states[d.source.index];
        var move1to2 = migration[stusab2][stusab1];
        var move2to1 = migration[stusab1][stusab2];
        if (move1to2 > move2to1) {
            return q(move1to2) + " people moved from " + stusab1 + " to " + stusab2 + "<br/>"
                + q(move2to1) + " people moved from " + stusab2 + " to " + stusab1;
        }
        else {
            return q(move2to1) + " people moved from " + stusab2 + " to " + stusab1 + "<br/>"
                + q(move1to2) + " people moved from " + stusab1 + " to " + stusab2;
        }
    };

    function legendGroup(statelist) {
        if (statelist.length == 2) {
            $("#legend").append("<p class='legendtext'>In 2012 <span style='color: green; font-weight: bolder;'>" + statename[statelist[1]] + "</span> sent the most people to <span style='color: #FFF; background-color: #000; font-weight: bolder;'>" + statename[statelist[0]] + "</span> (and was also the state to which " + statename[statelist[0]] + " sent the most people).</p>");
        }
        else {
            $("#legend").append("<p class='legendtext'>In 2012 <span style='color: green; font-weight: bolder;'>" + statename[statelist[1]] + "</span> sent the most people to <span style='color: #FFF; background-color: #000; font-weight: bolder;'>" + statename[statelist[0]] + "</span>, and <span style='color: red; font-weight: bolder;'>" + statename[statelist[2]] + "</span> was the state to which " + statename[statelist[0]] + " sent the most people.</p>");
        }
        d3.select("#legend").style("visibility", "visible");
    }

    function legendChord(stusab1, stusab2) {
        $("#legend").append("<p class='legendtext'>In 2012 more people moved from <span style='color: red; font-weight: bolder;'>" + statename[stusab2] + "</span> to <span style='color: green; font-weight: bolder;'>" + statename[stusab1] + "</span> than vice versa.</p>");
        d3.select("#legend").style("visibility", "visible");
    }

    function housingGroup(stusab) {
        var margin = {top: 5, right: 80, bottom: 30, left: 50},
            width = $("#housing-chart").width() - margin.left - margin.right,
            height = $("#housing-chart").height() - margin.top - margin.bottom - (0.03 * windowHeight);

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal()
            .domain([0, 1, 2])
            .range(["black", "green", "red"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .outerTickSize(0)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.houseindex); });

        var svg = d3.select("#housing-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chart_states = [stusab, topstates[stusab]["in"]];
        if (topstates[stusab]["in"] !== topstates[stusab]["out"]) {
            chart_states[2] = topstates[stusab]["out"];
        };

        color.domain(chart_states);

        var chart_data = housingarray(chart_states);

        chart_data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function(name) {
        return {
          name: name,
          values: chart_data.map(function(d) {
            return {date: d.date, houseindex: d[name]};
          })
        };
        });

        x.domain(d3.extent(chart_data, function(d) { return d.date; }));

        y.domain([
            d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.houseindex; }); }),
            d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.houseindex; }); })
        ]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "0.3em")
            .attr("dy", "1em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });;

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        var city = svg.selectAll(".city")
          .data(cities)
          .enter()
          .append("g")
          .attr("class", "city");

        city.append("path")
          .attr("class", function(d) { if (d.name == stusab) { return "mainline line"; } else {return "line";} })
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });

        city.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.houseindex) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .text(function(d) { return d.name; });

        d3.select("#housing-chart").style("visibility", "visible");
        legendGroup(chart_states);
    };

    function unempGroup(stusab) {
        var margin = {top: 5, right: 80, bottom: 30, left: 50},
            width = $("#unemp-chart").width() - margin.left - margin.right,
            height = $("#unemp-chart").height() - margin.top - margin.bottom - (0.03 * windowHeight);

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal()
            .domain([0, 1, 2])
            .range(["black", "green", "red"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .outerTickSize(0)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.unemprate); });

        var svg = d3.select("#unemp-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chart_states = [stusab, topstates[stusab]["in"]];
        if (topstates[stusab]["in"] !== topstates[stusab]["out"]) {
            chart_states[2] = topstates[stusab]["out"];
        };

        color.domain(chart_states);

        var chart_data = unemparray(chart_states);

        chart_data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function(name) {
        return {
          name: name,
          values: chart_data.map(function(d) {
            return {date: d.date, unemprate: d[name]};
          })
        };
        });

        x.domain(d3.extent(chart_data, function(d) { return d.date; }));

        y.domain([
            d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.unemprate; }); }),
            d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.unemprate; }); })
        ]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "0.3em")
            .attr("dy", "1em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });;

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        var city = svg.selectAll(".city")
          .data(cities)
          .enter()
          .append("g")
          .attr("class", "city");

        city.append("path")
          .attr("class", function(d) { if (d.name == stusab) { return "mainline line"; } else {return "line";} })
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });

        city.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.unemprate) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .text(function(d) { return d.name; });

        d3.select("#unemp-chart").style("visibility", "visible");
    };

    function taxesGroup(stusab) {
        var p = d3.format(".2%");
        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = $("#taxes-chart").width() - margin.left - margin.right,
            height = $("#taxes-chart").height() - margin.top - margin.bottom - (0.03 * windowHeight);

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal()
            .domain([0, 1, 2])
            .range(["black", "green", "red"]);

        var svg = d3.select("#taxes-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chart_states = [stusab, topstates[stusab]["in"]];
        if (topstates[stusab]["in"] !== topstates[stusab]["out"]) {
            chart_states[2] = topstates[stusab]["out"];
        };

        color.domain(chart_states);

        var chart_data = [];
        for (s = 0; s < chart_states.length; s++) {
            var obj = {"state": chart_states[s], "taxrate": tax_rates[chart_states[s]]};
            chart_data[s] = obj;
        };

        var barWidth = 80;
        y.domain([0, d3.max(chart_data, function(d) { return d.taxrate; })]);
        var startx = (width - (chart_states.length * barWidth)) / 2 - 10;

        var bar = svg.selectAll("g")
            .data(chart_data)
            .enter()
            .append("g")
            .attr("transform", function(d, i) { return "translate(" + (i * barWidth + 20) + ",0)"; });

        bar.append("rect")
          .attr("x", startx)
          .attr("y", function(d) { return y(d.taxrate); })
          .attr("height", function(d) { return height - y(d.taxrate); })
          .attr("width", barWidth - 20)
          .style("fill", function(d) { return color(d.state); });

        bar.append("text")
          .attr("x", startx + 30)
          .attr("y", height + 20)
          .attr("text-anchor", "middle")
          .text(function(d) { return d.state; });

        bar.append("text")
          .attr("x", startx + 30)
          .attr("y", function(d) { return y(d.taxrate) - 5; })
          .attr("text-anchor", "middle")
          .text(function(d) { return p(d.taxrate/100); })
          .style("fill", function(d) {return color(d.state); })
          .style("font-weight", "bold");

        svg.append("line")
            .attr({
                "x1": 0,
                "x2": width,
                "y1": height,
                "y2": height,
                "stroke-width": 1,
                "stroke": "#ccc"
            });

        d3.select("#taxes-chart").style("visibility", "visible");
}

    function housingChord(stusab1, stusab2) {
        var margin = {top: 5, right: 80, bottom: 30, left: 50},
            width = $("#housing-chart").width() - margin.left - margin.right,
            height = $("#housing-chart").height() - margin.top - margin.bottom - (0.03 * windowHeight);

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal()
            .domain([0, 1])
            .range(["green", "red"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .outerTickSize(0)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.houseindex); });

        var svg = d3.select("#housing-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chart_states = [stusab1, stusab2];

        color.domain(chart_states);

        var chart_data = housingarray(chart_states);

        chart_data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function(name) {
        return {
          name: name,
          values: chart_data.map(function(d) {
            return {date: d.date, houseindex: d[name]};
          })
        };
        });

        x.domain(d3.extent(chart_data, function(d) { return d.date; }));

        y.domain([
            d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.houseindex; }); }),
            d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.houseindex; }); })
        ]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "0.3em")
            .attr("dy", "1em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });;

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        var city = svg.selectAll(".city")
          .data(cities)
          .enter()
          .append("g")
          .attr("class", "city");

        city.append("path")
          .attr("class", "mainline line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });

        city.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.houseindex) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .text(function(d) { return d.name; });

        d3.select("#housing-chart").style("visibility", "visible");
        legendChord(stusab1, stusab2);
    };

    function unempChord(stusab1, stusab2) {
        var margin = {top: 5, right: 80, bottom: 30, left: 50},
            width = $("#unemp-chart").width() - margin.left - margin.right,
            height = $("#unemp-chart").height() - margin.top - margin.bottom - (0.03 * windowHeight);

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal()
            .domain([0, 1])
            .range(["green", "red"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .outerTickSize(0)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.unemprate); });

        var svg = d3.select("#unemp-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chart_states = [stusab1, stusab2];

        color.domain(chart_states);

        var chart_data = unemparray(chart_states);

        chart_data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function(name) {
        return {
          name: name,
          values: chart_data.map(function(d) {
            return {date: d.date, unemprate: d[name]};
          })
        };
        });

        x.domain(d3.extent(chart_data, function(d) { return d.date; }));

        y.domain([
            d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.unemprate; }); }),
            d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.unemprate; }); })
        ]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "0.3em")
            .attr("dy", "1em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });;

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        var city = svg.selectAll(".city")
          .data(cities)
          .enter()
          .append("g")
          .attr("class", "city");

        city.append("path")
          .attr("class", "mainline line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });

        city.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.unemprate) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .text(function(d) { return d.name; });

        d3.select("#unemp-chart").style("visibility", "visible");
    };

    function taxesChord(stusab1, stusab2) {
        var p = d3.format(".2%");
        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = $("#taxes-chart").width() - margin.left - margin.right,
            height = $("#taxes-chart").height() - margin.top - margin.bottom - (0.03 * windowHeight);

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal()
            .domain([0, 1])
            .range(["red", "green"]);

        var svg = d3.select("#taxes-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chart_states = [stusab2, stusab1];

        color.domain(chart_states);

        var chart_data = [];
        for (s = 0; s < chart_states.length; s++) {
            var obj = {"state": chart_states[s], "taxrate": tax_rates[chart_states[s]]};
            chart_data[s] = obj;
        };

        var barWidth = 80;
        y.domain([0, d3.max(chart_data, function(d) { return d.taxrate; })]);
        var startx = (width - (chart_states.length * barWidth)) / 2 - 10;

        var bar = svg.selectAll("g")
            .data(chart_data)
            .enter()
            .append("g")
            .attr("transform", function(d, i) { return "translate(" + (i * barWidth + 20) + ",0)"; });

        bar.append("rect")
          .attr("x", startx)
          .attr("y", function(d) { return y(d.taxrate); })
          .attr("height", function(d) { return height - y(d.taxrate); })
          .attr("width", barWidth - 20)
          .style("fill", function(d) { return color(d.state); });

        bar.append("text")
          .attr("x", startx + 30)
          .attr("y", height + 20)
          .attr("text-anchor", "middle")
          .text(function(d) { return d.state; });

        bar.append("text")
          .attr("x", startx + 30)
          .attr("y", function(d) { return y(d.taxrate) - 5; })
          .attr("text-anchor", "middle")
          .text(function(d) { return p(d.taxrate/100); })
          .style("fill", function(d) {return color(d.state); })
          .style("font-weight", "bold");

        svg.append("line")
            .attr({
                "x1": 0,
                "x2": width,
                "y1": height,
                "y2": height,
                "stroke-width": 1,
                "stroke": "#ccc"
            });

        d3.select("#taxes-chart").style("visibility", "visible");
    };

})
