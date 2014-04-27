// setting css for elements
var windowHeight = window.innerHeight - 8;
var windowWidth = window.innerWidth - 8;

var borderWidth = 1;

var headerHeight = 0.07 * windowHeight;
if (headerHeight > 50) { headerHeight = 50; }

var headerFontSize = 0.05 * windowHeight;
if (headerFontSize > 36) { headerFontSize = 36; }

var tooltipFontSize = 0.015 * windowHeight;
if (tooltipFontSize < 8) { tooltipFontSize = 8; }

var headerFontSpacing = windowWidth * 0.0025;
if (headerFontSpacing > 3) { headerFontSpacing = 3; }

var topMargin = 0.02 * windowHeight;
if (topMargin > 10) { topMargin = 10; }

var divPadding = 0.01 * windowHeight;
if (divPadding > 8) { divPadding = 8; }

var leftWidth = 0.2 * windowWidth - (2 * divPadding);
if (leftWidth > 240 - (2 * divPadding)) { leftWidth = 240 - (2 * divPadding); }

var rightWidth = 0.3 * windowWidth - (2 * divPadding);
if (rightWidth > 400 - (2 * divPadding)) { rightWidth = 400 - (2 * divPadding); }

var centerWidth = windowWidth - leftWidth - rightWidth - (4 * divPadding) - (4 * borderWidth);

var mainHeight = windowHeight - headerHeight - topMargin;
var dashboardHeight = mainHeight - (2 * divPadding) - (2 * borderWidth);
var optionsHeight = (mainHeight * 0.4) - (2 * divPadding) - (2 * borderWidth);
var navigatorHeight = mainHeight - optionsHeight - topMargin - (4 * divPadding) - (4 * borderWidth);

d3.select("#wrapper")
    .style("height", windowHeight + "px")
    .style("width", windowWidth + "px")
    .style("margin", "4px");
d3.select("#header")
    .style("font-size", headerFontSize + "px")
    .style("letter-spacing", headerFontSpacing + "px")
    .style("width", "96%")
    .style("height", headerHeight + "px")
    .style("vertical-align","middle")
    .style("background-color", "rgb(68,68,68)")
    .style("padding-left", "1%")
    .style("padding-right", "3%");
d3.select("#options")
    .style("height", optionsHeight + "px");
d3.select("#navigator")
    .style("height", navigatorHeight + "px");
d3.selectAll(".side-div")
    .style("margin-top", topMargin + "px")
    .style("padding", divPadding + "px")
    .style("width", leftWidth + "px")
    .style("border", borderWidth + "px solid")
    .style("border-color", "rgb(229,150,54)")
    .style("background-color", "#fff");
d3.select("#sidebar")
    .style("float", "left");
d3.select("#mainsection")
    .style("float", "left")
    .style("margin-top", topMargin + "px")
    .style("width", centerWidth + "px")
    .style("height", mainHeight + "px");
d3.selectAll("#bubbleviz,#extracanvas")
    .style("width", "100%")
    .style("height", "100%")
    .style("position", "absolute");
d3.select("#dashboard")
    .style("float", "left")
    .style("width", rightWidth + "px")
    .style("height", dashboardHeight + "px")
    .style("padding", divPadding + "px")
    .style("margin-top", topMargin + "px")
    .style("border", borderWidth + "px solid")
    .style("border-color", "rgb(229,150,54)")
    .style("background-color", "#fff");
d3.select(".tooltip")
    .style("font-size", tooltipFontSize + "px");

// dictionary to look up length of mesh_id to use
var level_length = {
    0: 1,
    1: 3,
    2: 7,
    3: 11,
    4: 15,
    5: 19,
    6: 23,
    7: 27,
    8: 31,
    9: 35,
    10: 39,
    11: 43,
    12: 47
}

// data placeholders
var data,
    curdata,
    mesh,
    reverse_mesh = {},
    intervention,
    loc,
    phase,
    sponsor,
    stat,
    bubble_data = [],
    time_data = [],
    sponsor_data = [],
    status_data = [],
    phase_data = [],
    location_data = [],
    intervention_data = [];

// filter and display parameter placeholders
var time_filter = [],
    cond_filter = '',
    intervention_filter = '',
    level = 0,
    showby = "cond",
    values = "studies";

// bubble chart parameters
var bubble_width = centerWidth,
    bubble_height = mainHeight,
    padding = 3,
    maxRadius = 100,
    color = d3.scale.category20c(),
    node,
    node_text,
    link,
    links_bubbles = [];

var force = d3.layout.force()
    .nodes(bubble_data)
    .size([bubble_width, bubble_height])
    .on("tick", tick)
    .charge(charge)
    .gravity(.11);

var vis = d3.select("#bubbleviz").append("svg")
    .attr("width", bubble_width)
    .attr("height", bubble_height)
    .attr("class", "bubble");

// load data
d3.json("vizdata/all_data.json", function(error, json) {
    if (error) return console.warn(error);

    data = curdata = json.studies;
    mesh = json.mesh;
    intervention = json.interventions;
    loc = json.locations;
    phase = json.phase;
    sponsor = json.sponsors;
    stat = json.status;

    // create associative array to look up mesh terms from id's
    var mesh_keys = Object.keys(mesh);
    for (m=0; m<mesh_keys.length; m++) {
        var k = mesh_keys[m];
        reverse_mesh[mesh[k].id] = mesh[k].term;
    }
    reverse_mesh['U'] = 'Unassigned';

    update(curdata);

});

// procedure to update all the chart data objects
function update(dataset) {

    // write data filter test to identify records of interest 
    var filter_test = '';
    if ( cond_filter.length > 0 ) {
        filter_test += "getCond(dataset[cur_length]['co']).has('" + cond_filter + "') > 0";
    }
    if ( intervention_filter.length > 0 ) {
        if ( filter_test.length > 0 ) {
            filter_test += " && dataset[cur_length]['iv'] == '" + intervention_filter + "'";
        } else {
            filter_test += "dataset[cur_length]['iv'] == '" + intervention_filter + "'";
        }
    }
    if ( time_filter.length > 0 ) {
        var time_series = '';
        for (var t=+time_series[0]; t<+time_series[1]+1; t++ ) {
            if ( time_series.length > 0 ) {
                time_series += "," + t;
            } else {
                time_series += t;
            }
        }
        if ( filter_test.length > 0 ) {
            filter_test += " && [" + time_series + "].indexOf(dataset[cur_length]['yr']) >= 0";
        } else {
            filter_test += "[" + time_series + "].indexOf(dataset[cur_length]['yr']) >= 0";
        }
    }
    if ( filter_test.length == 0 ) {
        filter_test = "1==1";
    }

    // create dictionaries with raw counts
    var bubble_dict = {},
        time_dict = {},
        sponsor_dict = {},
        status_dict = {},
        phase_dict = {},
        location_dict = {},
        intervention_dict = {};
    var cur_length = dataset.length;
    var istrue = 1==1;
    while (cur_length--) {
        if ( eval(filter_test) ) {
            var enrollment = dataset[cur_length]['en'];
            // bubbles
            var conds = d3.set(dataset[cur_length]['co']
                .map(function(c) {
                    if ( level == 0 || cond_filter == mesh[c]['id'].slice(0,level_length[level - 1]) ) {
                        return mesh[c]['id'].slice(0,level_length[level]);
                    }
                    return;
                }))
                .values()
                .filter(function(t) { return t !== "undefined"});
            for (var c=0; c<conds.length; c++) {
                var cond_term = reverse_mesh[conds[c]];
                if ( !(cond_term in bubble_dict) ) {
                    bubble_dict[cond_term] = {cond_id: conds[c], studies: 0, enrollment: 0};
                }
                bubble_dict[cond_term].studies += 1;
                bubble_dict[cond_term].enrollment += enrollment;
            }
            // time
            if ( !(dataset[cur_length]['yr'] in time_dict) ) {
                time_dict[dataset[cur_length]['yr']] = {studies: 0, enrollment: 0};
            }
            time_dict[dataset[cur_length]['yr']].studies += 1;
            time_dict[dataset[cur_length]['yr']].enrollment += enrollment;
            // sponsors
            var sponsor_name = sponsor[dataset[cur_length]['sp']];
            if ( !(sponsor_name in sponsor_dict) ) {
                sponsor_dict[sponsor_name] = {industry: {studies: 0, enrollment: 0}, no_industry: {studies: 0, enrollment: 0}};
            }
            if ( dataset[cur_length]['in'] == 1) {
                sponsor_dict[sponsor_name]['industry'].studies += 1;
                sponsor_dict[sponsor_name]['industry'].enrollment += enrollment;
            } else {
                sponsor_dict[sponsor_name]['no_industry'].studies += 1;
                sponsor_dict[sponsor_name]['no_industry'].enrollment += enrollment;
            }
            // status
            var status_name = stat[dataset[cur_length]['st']];
            if ( !(status_name in status_dict) ) {
                status_dict[status_name] = {studies: 0, enrollment: 0};
            }
            status_dict[status_name].studies += 1;
            status_dict[status_name].enrollment += enrollment;
            // phase
            var phase_name = phase[dataset[cur_length]['ph']]
            if ( !(phase_name in phase_dict) ) {
                phase_dict[phase_name] = {studies: 0, enrollment: 0};
            }
            phase_dict[phase_name].studies += 1;
            phase_dict[phase_name].enrollment += enrollment;
            // location
            for (var l=0; l<dataset[cur_length]['lo'].length; l++) {
                var loc_name = loc[dataset[cur_length]['lo'][l]];
                if ( !(loc_name in location_dict) ) {
                    location_dict[loc_name] = {studies: 0, enrollment: 0};
                }
                location_dict[loc_name].studies += 1;
                location_dict[loc_name].enrollment += enrollment;
            }
            // intervention
            for (var v=0; v<dataset[cur_length]['iv'].length; v++) {
                var iv_name = intervention[dataset[cur_length]['iv'][v]];
                if ( !(iv_name in intervention_dict) ) {
                    intervention_dict[iv_name] = {studies: 0, enrollment: 0};
                }
                intervention_dict[iv_name].studies += 1;
                intervention_dict[iv_name].enrollment += enrollment;
            }
        } else {
            curdata.splice(cur_length, 1);
        }
    }

    // translate dictionaries into lists of dictionaries
    var objkeys = Object.keys(time_dict);
    clearArray(time_data);
    for (var i=0; i<objkeys.length; i++) {
        time_data.push({
            name: objkeys[i],
            studies: time_dict[objkeys[i]].studies,
            enrollment: time_dict[objkeys[i]].enrollment
        });
    }

    // get largest bubble value and scale all other values appropriately
    var val_array = Object.keys(bubble_dict).map(function(key) {return values == "studies" ? bubble_dict[key].studies : bubble_dict[key].enrollment;});
    var maxval = d3.max(val_array);
    var minval = d3.min(val_array);
    var totalval = d3.sum(val_array);
    var scale_factor = d3.min([d3.max([4, totalval / maxval]), 8]) * 0.8;
    var maxsize = bubble_height / scale_factor;
    var minsize = bubble_height / 80;
    var bubble_scale = d3.scale.linear().domain([minval, maxval]).range([minsize, maxsize]);
    var sum_size = d3.sum(val_array.map(function(c) {return 3.14159 * Math.pow(bubble_scale(c), 2);}));
    var canv_size = bubble_height * bubble_width;
    var size_scale = Math.pow((canv_size * 0.33) / sum_size, 0.5);

    var bubble_keys = Object.keys(bubble_dict);
    clearArray(bubble_data);
    for (i=0; i<bubble_keys.length; i++) {
        var oldval = values == "studies" ? bubble_dict[bubble_keys[i]].studies : bubble_dict[bubble_keys[i]].enrollment;
        bubble_data.push({
          name: bubble_keys[i],
          cond_id: bubble_dict[bubble_keys[i]].cond_id,
          studies: bubble_dict[bubble_keys[i]].studies,
          enrollment: bubble_dict[bubble_keys[i]].enrollment,
          size: bubble_scale(oldval) * size_scale
        });
    }

makeBubble();

}

function getCond(cond_list) {
    var cond_array = [];
    for (var c=0; c<cond_list.length; c++) {
        if ( mesh[cond_list[c]]['id'].slice(0,level_length[level - 1]) == cond_filter ) {
            cond_array.push(cond_filter);
        }
    }
    return d3.set(cond_array);
}

function makeBubble() {

    node = vis.selectAll(".node")
        .data(bubble_data);

    node.enter()
      .append("g")
      .attr("class", "node")
      .on("mouseover", mouseover_bubble)
      .on("mouseout", mouseout_bubble)
      .on("click", click_bubble)
      .call(force.drag);

    node.append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) {return d.size; })
      .style("fill", "steelblue");

    node.append("text")
        .attr("transform", function(d) { 
            return "translate(" + d.x + ")"; })
        .attr("y", function(d) { 
            var numlines = splitLines(d.name, 20).length;
            return d.y - (numlines * (d.size / 6)); 
        })
        .style("font-size", function(d) { return d.size / 4; })
        .style("opacity", function(d) { return d.size > 30 ? 1 : 0; })
        .each(function(d) {
            var strings = splitLines(d.name, 20);
            for (var s=0; s<strings.length; s++) {
                d3.select(this).append("tspan")
                    .attr("x", 0)
                    .attr("dy", "1.2em")
                    .attr("text-anchor", "middle")
                    .text(strings[s]);
            }
        });

    node.exit().remove();

    force.start()

}

function charge(d) {
  return -Math.pow(d.size, 2.0) / 7;
}

function tick(e) {
    node.each(collide(0.5));

    node.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    node.selectAll("text")
        .attr("transform", function(d) { return "translate(" + d.x + ")"; })
        .attr("y", function(d) { 
            var numlines = splitLines(d.name, 20).length;
            return d.y - (numlines * (d.size / 6)); 
        });

}

function collide(alpha) {
  return function(d) {
    bubble_data.forEach(function(d2) {
      if(d != d2) {
        var x = d.x - d2.x;
        var y = d.y - d2.y;
        var distance = Math.sqrt(x * x + y * y);

        var minDistance = d.size + d2.size + padding;

        if(distance < minDistance) {
          var newDistance = ((distance - minDistance) / distance) * alpha;
          d.x = d.x - (x * newDistance);
          d.y = d.y - (y * newDistance);
          d2.x = d2.x + (x * newDistance);
          d2.y = d2.y + (y * newDistance);
        }
      }
    });
  };
}

function mouseover_bubble(d, i) {
    d3.select(this)
        .select("circle")
        .style("stroke", "#000")
        .style("stroke-width", "3px");

    d3.select("#bubble-tooltip")
        .style("visibility", "visible")
        .html("<span style='font-weight: bold; font-size: 120%'>" + d.name + "</span><br/># of studies:&nbsp;" + addCommas(d.studies) + "<br/># enrolled:&nbsp;" + addCommas(d.enrollment))
        .style("top", function () { return (d3.max([50,d3.event.pageY - 80]))+"px"})
        .style("left", function () { return (d3.max([0,d3.event.pageX - 80]))+"px";});
}

function mouseout_bubble(d, i) {
    d3.select(this)
        .select("circle")
        .style("stroke", "#fff")
        .style("stroke-width", "0.5px");

    d3.select("#bubble-tooltip")
        .style("visibility", "hidden")
}

function click_bubble(d, i) {

    // get parameters to recreate bubble
    var clicked_bubble = this;
    var clicked_circle = d3.select(clicked_bubble).select("circle");
/*
    var cur_fill = clicked_circle.style("fill"),
        cur_cx = clicked_circle.attr("cx"),
        cur_cy = clicked_circle.attr("cy"),
        cur_r = clicked_circle.attr("r");

    // recreate bubble as cicle
    vis2 = d3.select("#extracanvas").append("svg")
        .attr("width", bubble_width)
        .attr("height", bubble_height)
        .attr("class", "temp");
    vis2.append("circle")
        .attr("cx", cur_cx)
        .attr("cy", cur_cy)
        .attr("r", cur_r)
        .style("fill", cur_fill);

    // blow up the new circle and then get rid of it
    d3.select(".temp circle")
        .transition()
        .duration(1500)
        .attr("r", bubble_height)
        .style("opacity", 0)
        .each("end", function() {
            d3.select(".temp").remove();
        });
*/
    // disappear old bubbles and call function to replace them
    d3.select("#bubble-tooltip")
        .style("visibility", "hidden");

    d3.selectAll(".node")
        .select("text")
        .transition()
        .duration(200)
        .style("font-size", 0)
        .style("opacity", 0);
    d3.selectAll(".node")
        .select("circle")
        .filter(function(d) { return this != clicked_bubble; })
        .transition()
        .duration(200)
        .attr("r", 0);
    d3.select(clicked_bubble)
        .transition()
        .duration(201)
        .style("opacity", "0")
        .each("end", function() {
            clearArray(bubble_data);
            node = vis.selectAll(".node")
                .data(bubble_data);
            node.exit().remove();
            cond_filter = d.cond_id;
            level += 1;
            update(curdata);
        });

}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function splitLines(txt, maxchars) {
    var words = txt.split(" ");
    var output = [];
    var temp_output = "";
    var num_words = words.length;
    for (var w=0; w<num_words; w++) {
        var add_word = words.shift();
        if (temp_output.length > 0) {
            if ((temp_output + ' ' + add_word).length > maxchars) {
                output.push(temp_output);
                temp_output = add_word;
            } else {
                temp_output += ' ' + add_word;
            }
        } else if (add_word.length > maxchars) {
            output.push(add_word);
        } else {
            temp_output = add_word;
        }
    }
    if (temp_output.length > 0) {
        output.push(temp_output);
    }
    return output;
}

function clearArray(arr) {
    while(arr.length > 0) {
        arr.pop();
    };
}

