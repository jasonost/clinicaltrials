// setting css for elements
var windowHeight = window.innerHeight - 8;
var windowWidth = window.innerWidth - 8;
d3.select("#wrapper")
    .style("height", windowHeight + "px")
    .style("width", windowWidth + "px")
    .style("margin", "4px");
d3.select("#header")
    .style("font-size", (0.04 * windowHeight) + "px")
    .style("width", "96%")
    .style("height", "5%")
    .style("background-color", "#666")
    .style("padding-left", "1%")
    .style("padding-right", "3%");
d3.select("#options")
    .style("height", (0.38 * windowHeight) + "px");
d3.select("#navigator")
    .style("height", (0.48 * windowHeight) + "px");
d3.selectAll(".side-div")
    .style("margin-top", (0.02 * windowHeight) + "px")
    .style("padding", (0.01 * windowHeight) + "px")
    .style("width", (0.2 * windowWidth - 0.02 * windowHeight) + "px")
    .style("background-color", "#999");
d3.select("#sidebar")
    .style("float", "left")
d3.select("#bubbleviz")
    .style("float", "left")
    .style("width", (0.5 * windowWidth) + "px")
    .style("height", (0.95 * windowHeight) + "px");
d3.select("#dashboard")
    .style("float", "left")
    .style("width", (0.3 * windowWidth - 0.02 * windowHeight) + "px")
    .style("height", (0.91 * windowHeight) + "px")
    .style("padding", (0.01 * windowHeight) + "px")
    .style("margin-top", (0.02 * windowHeight) + "px")
    .style("background-color", "#999");

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
    mesh,
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

// overall data parameters
var current_vals = {level: 0, showby: "cond", values: "studies"};

// bubble chart parameters
var bubble_width = 0.5 * windowWidth,
    bubble_height = 0.95 * windowHeight,
    padding = 3,
    maxRadius = 100,
    color = d3.scale.category20c(),
    node,
    link,
    nodes_bubbles = [],
    links_bubbles = [];

var force = d3.layout.force()
    .nodes(nodes_bubbles)
    .links(links_bubbles)
    .linkDistance(80)
    .size([bubble_width, bubble_height])
    .on("tick", tick)
    .charge(charge);

var vis = d3.select("#bubbleviz").append("svg")
    .attr("width", bubble_width)
    .attr("height", bubble_height)
    .attr("class", "bubble");

// load data
d3.json("vizdata/all_data.json", function(error, json) {
    if (error) return console.warn(error);

    data = json.studies;
    mesh = json.mesh;
    intervention = json.interventions;
    loc = json.locations;
    phase = json.phase;
    sponsor = json.sponsors;
    stat = json.status;
    update(current_vals.level, current_vals.showby, current_vals.values, data);

});

// procedure to update all the chart data objects
function update(level, showby, values, curdata) {

    // create dictionaries with raw counts
    var bubble_dict = {},
        time_dict = {},
        sponsor_dict = {},
        status_dict = {},
        phase_dict = {},
        location_dict = {},
        intervention_dict = {};
    for (i=0; i<data.length; i++) {
        var enrollment = data[i]['en'];
        // bubbles
        var conds = d3.set(data[i]['co'].map(function(c) {return mesh[c]['id'].slice(0,level_length[level])})).values();
        for (var c=0; c<conds.length; c++) {
            if ( !(conds[c] in bubble_dict) ) {
                bubble_dict[conds[c]] = {studies: 0, enrollment: 0};
            }
            bubble_dict[conds[c]].studies += 1;
            bubble_dict[conds[c]].enrollment += enrollment;
        }
        // time
        if ( !(data[i]['yr'] in time_dict) ) {
            time_dict[data[i]['yr']] = {studies: 0, enrollment: 0};
        }
        time_dict[data[i]['yr']].studies += 1;
        time_dict[data[i]['yr']].enrollment += enrollment;
        // sponsors
        var sponsor_name = sponsor[data[i]['sp']];
        if ( !(sponsor_name in sponsor_dict) ) {
            sponsor_dict[sponsor_name] = {industry: {studies: 0, enrollment: 0}, no_industry: {studies: 0, enrollment: 0}};
        }
        if ( data[i]['in'] == 1) {
            sponsor_dict[sponsor_name]['industry'].studies += 1;
            sponsor_dict[sponsor_name]['industry'].enrollment += enrollment;
        } else {
            sponsor_dict[sponsor_name]['no_industry'].studies += 1;
            sponsor_dict[sponsor_name]['no_industry'].enrollment += enrollment;
        }
        // status
        var status_name = stat[data[i]['st']];
        if ( !(status_name in status_dict) ) {
            status_dict[status_name] = {studies: 0, enrollment: 0};
        }
        status_dict[status_name].studies += 1;
        status_dict[status_name].enrollment += enrollment;
        // phase
        var phase_name = phase[data[i]['ph']]
        if ( !(phase_name in phase_dict) ) {
            phase_dict[phase_name] = {studies: 0, enrollment: 0};
        }
        phase_dict[phase_name].studies += 1;
        phase_dict[phase_name].enrollment += enrollment;
        // location
        for (var l=0; l<data[i]['lo'].length; l++) {
            var loc_name = loc[data[i]['lo'][l]];
            if ( !(loc_name in location_dict) ) {
                location_dict[loc_name] = {studies: 0, enrollment: 0};
            }
            location_dict[loc_name].studies += 1;
            location_dict[loc_name].enrollment += enrollment;
        }
        // intervention
        for (var v=0; v<data[i]['iv'].length; v++) {
            var iv_name = intervention[data[i]['iv'][v]];
            if ( !(iv_name in intervention_dict) ) {
                intervention_dict[iv_name] = {studies: 0, enrollment: 0};
            }
            intervention_dict[iv_name].studies += 1;
            intervention_dict[iv_name].enrollment += enrollment;
        }
    }

    // translate dictionaries into lists of dictionaries
    var objkeys = Object.keys(time_dict);
    while(time_data.length > 0) {
        time_data.pop();
    };
    for (var i=0; i<objkeys.length; i++) {
        time_data.push({
            name: objkeys[i],
            studies: time_dict[objkeys[i]].studies,
            enrollment: time_dict[objkeys[i]].enrollment
        });
    }

    // get largest bubble value and scale all other values appropriately
    var maxval = d3.max(Object.keys(bubble_dict).map(function(key) {return bubble_dict[key].studies;}));
    var minval = d3.min(Object.keys(bubble_dict).map(function(key) {return bubble_dict[key].studies;}));
    var maxsize = bubble_height / 4;
    var minsize = bubble_height / 80;
    var bubble_keys = Object.keys(bubble_dict);
    for (i=0; i<bubble_keys.length; i++) {
        var oldval = bubble_dict[bubble_keys[i]].studies;
        nodes_bubbles.push({
          name: bubble_keys[i],
          val: oldval,
          size: ((oldval - minval) / (maxval - minval) * (maxsize - minsize)) + minsize
        });
    }

    node = vis.selectAll("circle.node")
        .data(nodes_bubbles)
        .style("fill", "steelblue")
        .attr("r", function(d) { return d.size; });

    node.enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) {return d.size; })
      .style("fill", "steelblue")
      .call(force.drag);

    node.exit().remove();

    link = vis.selectAll("line.link")
        .data(links_bubbles, function(d) { return d.target.id; });

    // Enter any new links.
    link.enter()
        .insert("line", ".node")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    force.start() 

}

// function to get values from dictionary
var get_values = function(dict) {
    return Object.keys(dict).map(function(key) {return dict[key];});
};

function charge(d) {
  return -Math.pow(d.size, 2.0) / 7;
}

function tick(e) {
  node.each(collide(0.5));

  node
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
  
  link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
}

function collide(alpha) {
  return function(d) {
    nodes_bubbles.forEach(function(d2) {
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
