/****************************************************

    SETTING UP STYLES AND DIVS

****************************************************/

// setting css for elements
var windowHeight = window.innerHeight - 8;
var windowWidth = window.innerWidth - 8;

var borderWidth = 1;

var headerHeight = 0.07 * windowHeight;
if (headerHeight > 50) { headerHeight = 50; }

var headerFontSize = 0.05 * windowHeight;
if (headerFontSize > 36) { headerFontSize = 36; }

var titleHeight = 0.06 * windowHeight;
if (titleHeight > 43) { titleHeight = 43; }

var titleFontSize = 0.035 * windowHeight;
if (titleFontSize > 26) { titleFontSize = 26; }

var tooltipFontSize = 0.015 * windowHeight;
if (tooltipFontSize < 8) { tooltipFontSize = 8; }

var headerFontSpacing = windowWidth * 0.0025;
if (headerFontSpacing > 3) { headerFontSpacing = 3; }

var topMargin = 0.02 * windowHeight;
if (topMargin > 10) { topMargin = 10; }

var divPadding = 0.01 * windowHeight;
if (divPadding > 8) { divPadding = 8; }

var leftWidth = 0.2 * windowWidth - (2 * divPadding) - (2 * borderWidth);
if (leftWidth > 240 - (2 * divPadding) - (2 * borderWidth)) { leftWidth = 240 - (2 * divPadding) - (2 * borderWidth); }

var rightWidth = 0.3 * windowWidth;
if (rightWidth > 400) { rightWidth = 400; }

var centerWidth = windowWidth - (leftWidth + (2 * divPadding) + (2 * borderWidth)) - rightWidth;

var mainHeight = windowHeight - headerHeight - topMargin - titleHeight;
var optionsHeight = ((mainHeight + titleHeight) * 0.4) - (2 * divPadding) - (2 * borderWidth);
var navigatorHeight = (mainHeight + titleHeight) - optionsHeight - topMargin - (4 * divPadding) - (4 * borderWidth);

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

d3.select("#sidebar")
    .style("float", "left");
d3.selectAll(".side-div")
    .style("margin-top", topMargin + "px")
    .style("padding", divPadding + "px")
    .style("width", leftWidth + "px")
    .style("border", borderWidth + "px solid")
    .style("border-color", "rgb(229,150,54)")
    .style("background-color", "#fff");

d3.select("#options")
    .style("height", optionsHeight + "px");

d3.select("#navigator")
    .style("height", navigatorHeight + "px")
    .style("font-size", (navigatorHeight / 30) + "px");

d3.select("#mainsection")
    .style("float", "left")
    .style("margin-top", topMargin + "px")
    .style("width", (centerWidth + rightWidth) + "px")
    .style("height", (mainHeight + titleHeight) + "px");
d3.selectAll("#mainsection div")
    .style("float", "left");
d3.select("#maintitle")
    .style("width", (centerWidth + rightWidth) + "px")
    .style("height", titleHeight + "px")
    .style("font-size", titleFontSize + "px")
    .style("vertical-align","middle")
    .style("text-align", "center");
d3.select("#bubbleviz")
    .style("width", centerWidth + "px")
    .style("height", mainHeight + "px")
    .style("float", "left");
d3.select("#timechart")
    .style("width", rightWidth + "px")
    .style("height", (mainHeight * 0.20) + "px");
d3.select("#phasechart")
    .style("width", rightWidth + "px")
    .style("height", (mainHeight * 0.15) + "px");
d3.select("#sponsorchart")
    .style("width", rightWidth + "px")
    .style("height", (mainHeight * 0.20) + "px");
d3.select("#outcomechart")
    .style("width", rightWidth + "px")
    .style("height", (mainHeight * 0.15) + "px");
d3.select("#locationchart")
    .style("width", rightWidth + "px")
    .style("height", (mainHeight * 0.30) + "px");
d3.select("#tooltip")
    .style("font-size", tooltipFontSize + "px");

// add selection buttons to options frame
var buttons = d3.select("#buttons").append("svg")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 2 + 3) + "px");

buttons.append("text")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .attr("dy", (optionsHeight * (11/128)) + "px")
    .attr("dx", (leftWidth / 32) + "px")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (optionsHeight / 16) + "px")
    .style("font-weight", "700")
    .text("Show bubbles as");
var button_showby = buttons.append("g")
    .attr("class", "option_button")
    .attr("transform", "translate(0," + (optionsHeight / 8) + ")");
button_showby.append("rect")
    .attr("class", "button_showby_cond")
    .attr("width", (leftWidth / 2 - 6) + "px")
    .attr("x", "3px")
    .attr("height", (optionsHeight / 8) + "px")
    .style("stroke", "rgb(229,150,54)")
    .style("stroke-opacity", 1)
    .style("stroke-width", "3px")
    .style("fill", "#444");
button_showby.append("text")
    .attr("class", "button_showby_cond")
    .attr("dy", (optionsHeight * (11/128)) + "px")
    .attr("dx", (leftWidth / 4) + "px")
    .attr("text-anchor", "middle")
    .style("fill", "#fff")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (optionsHeight / 18) + "px")
    .text("conditions");
button_showby.append("rect")
    .attr("class", "button_showby_inv")
    .attr("x", (leftWidth / 2 + 3) + "px")
    .attr("width", (leftWidth / 2 - 6) + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .style("stroke", "rgb(229,150,54)")
    .style("stroke-opacity", 0)
    .style("stroke-width", "3px")
    .style("fill", "#ddd");
button_showby.append("text")
    .attr("class", "button_showby_inv")
    .attr("dy", (optionsHeight * (11/128)) + "px")
    .attr("dx", (leftWidth * 3 / 4) + "px")
    .attr("text-anchor", "middle")
    .style("fill", "#000")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (optionsHeight / 18) + "px")
    .text("interventions");

buttons.append("text")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .attr("dy", (optionsHeight * (43/128)) + "px")
    .attr("dx", (leftWidth / 32) + "px")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (optionsHeight / 16) + "px")
    .style("font-weight", "700")
    .text("Count by");
var button_sizeby = buttons.append("g")
    .attr("class", "option_button")
    .attr("transform", "translate(0," + (optionsHeight * 3 / 8) + ")");
button_sizeby.append("rect")
    .attr("class", "button_sizeby_studies")
    .attr("width", (leftWidth / 2 - 6) + "px")
    .attr("x", "3px")
    .attr("height", (optionsHeight / 8) + "px")
    .style("stroke", "rgb(229,150,54)")
    .style("stroke-opacity", 1)
    .style("stroke-width", "3px")
    .style("fill", "#444");
button_sizeby.append("text")
    .attr("class", "button_sizeby_studies")
    .attr("dy", (optionsHeight * (11/128)) + "px")
    .attr("dx", (leftWidth / 4) + "px")
    .attr("text-anchor", "middle")
    .style("fill", "#fff")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (optionsHeight / 18) + "px")
    .text("studies");
button_sizeby.append("rect")
    .attr("class", "button_sizeby_enrollment")
    .attr("x", (leftWidth / 2 + 3) + "px")
    .attr("width", (leftWidth / 2 - 6) + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .style("stroke", "rgb(229,150,54)")
    .style("stroke-opacity", 0)
    .style("stroke-width", "3px")
    .style("fill", "#ddd");
button_sizeby.append("text")
    .attr("class", "button_sizeby_enrollment")
    .attr("dy", (optionsHeight * (11/128)) + "px")
    .attr("dx", (leftWidth * 3 / 4) + "px")
    .attr("text-anchor", "middle")
    .style("fill", "#000")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (optionsHeight / 18) + "px")
    .text("enrollment");

var click_buttons = d3.selectAll("#options .option_button")
    .selectAll("rect,text")
    .on("click", clickButton);

// reset button
var resetbutton = d3.select("#resetbutton").append("svg")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 12) + "px");

var resetbutton_button = resetbutton.append("g")
    .attr("class", "reset_button")
    .attr("width", (leftWidth / 3) + "px")
    .attr("height", (optionsHeight / 12) + "px")
    .attr("transform", "translate(" + (leftWidth / 3) + ",2)");
resetbutton_button.append("rect")
    .attr("width", (leftWidth / 3 - 4) + "px")
    .attr("height", (optionsHeight / 12 - 4) + "px")
    .style("stroke", "#444")
    .style("stroke-width", "2px")
    .style("fill", "crimson");
resetbutton_button.append("text")
    .attr("dy", (optionsHeight * .05) + "px")
    .attr("dx", (leftWidth / 6) + "px")
    .attr("text-anchor", "middle")
    .style("fill", "#000")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-weight", "700")
    .style("font-size", (optionsHeight / 24) + "px")
    .text("reset all");

d3.select(".reset_button")
    .selectAll("rect,text")
    .on("click", resetAll);

// make time selector in options box
var timeselector = d3.select("#timeselector").append("svg")
    .attr("width", leftWidth + "px")
    .attr("height", ((optionsHeight * .39) - 3) + "px")
    .append("g")
    .attr("transform", "translate(0," + (optionsHeight / 24) + ")");

var timeselector_barheight,
    timeselector_barwidth,
    timeselector_brush,
    time_filter = [],
    timeselector_data = {},
    data,
    curdata;

function makeTimeSelector() {

    var timeselector_x = d3.time.scale()
        .domain([new Date(1998, 1, 1), new Date(2013, 12, 31)])
        .range([0, leftWidth]);

    var temp_data = [];
    for (var y=1998; y<2014; y++) {
        temp_data.push(y);
    }

    timeselector_barheight = optionsHeight * .28;
    timeselector_barwidth = leftWidth / temp_data.length;

    var bar_container = timeselector.append("g")
        .attr("id", "bar_container")
        .attr("width", leftWidth)
        .attr("height", timeselector_barheight);

    bar_container.selectAll("rect")
        .data(temp_data)
        .enter()
        .append("rect")
        .attr("class", "timebars")
        .attr("transform", function(d, i) { return "translate(" + i * timeselector_barwidth + "," + (timeselector_barheight - 0) + ")"; })
        .attr("width", timeselector_barwidth)
        .attr("height", 0)
        .style("fill", "rgb(229,150,54)");

    timeselector_brush = d3.svg.brush()
        .x(timeselector_x)
        .on("brushend", brushended);

    timeselector.append("line")
        .attr("x1", 0)
        .attr("x2", leftWidth)
        .attr("y1", timeselector_barheight)
        .attr("y2", timeselector_barheight)
        .attr("class", "axis")
        .style("stroke-width", "0.25px")
        .style("stroke", "#333");

    var timeselector_text = timeselector.append("g")
        .attr("transform", "translate(0," + (timeselector_barheight + (optionsHeight / 24)) + ")");
    timeselector_text.append("text")
        .style("fill", "#000")
        .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
        .style("font-size", (optionsHeight / 24) + "px")
        .text("Pre-1999");
    timeselector_text.append("text")
        .attr("x", leftWidth)
        .attr("text-anchor", "end")
        .style("fill", "#000")
        .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
        .style("font-size", (optionsHeight / 24) + "px")
        .text("2013");

    var gBrush = timeselector.append("g")
        .attr("class", "brush")
        .call(timeselector_brush)
        .call(timeselector_brush.event);

    gBrush.selectAll("rect")
        .attr("height", timeselector_barheight);

    function brushended() {
        if (!d3.event.sourceEvent) return; // only transition after input
        var extent0 = timeselector_brush.extent(),
            extent1 = extent0.map(d3.time.year.round);

        // if empty when rounded, use floor & ceil instead
        if (extent1[0] >= extent1[1]) {
            extent1[0] = d3.time.year.floor(extent0[0]);
            extent1[1] = d3.time.year.ceil(extent0[1]);
        }

        d3.select(this).transition()
            .call(timeselector_brush.extent(extent1))
            .call(timeselector_brush.event);

        var date_range = [parseInt(String(timeselector_brush.extent()[0]).slice(11,15)),parseInt(String(timeselector_brush.extent()[1]).slice(11,15))];
        time_filter[0] = date_range[0];
        time_filter[1] = date_range[1];
        updateViz();
    }

}

// draw map
var map_chart_position = {
    'na': {left: 0.19, top: 0.42},
    'sa': {left: 0.28, top: 0.80},
    'eu': {left: 0.48, top: 0.34},
    'af': {left: 0.51, top: 0.71},
    'as': {left: 0.70, top: 0.48},
    'oc': {left: 0.80, top: 0.82}
};
var map_chart_height = (mainHeight * 0.30);

var continent_dict = {
    'North America': 'na',
    'Latin America': 'sa',
    'Europe': 'eu',
    'Africa': 'af',
    'Asia': 'as',
    'Oceania': 'oc',
    'Unknown': 'unk'
};

function drawMap(world) {

    var projection = d3.geo.robinson().translate([0, 0]).scale(rightWidth / 2 / Math.PI);
    var path = d3.geo.path().projection(projection);

    var worldsvg = d3.select("#locationchart").append("svg")
          .attr("width", rightWidth)
          .attr("height", (mainHeight * 0.30));

    var outterg = worldsvg.append("g")
        .attr("transform", "translate(" + rightWidth / 2 + "," + (mainHeight * 0.30) * .6 + ")");

    var g = outterg.append("g").attr("id", "innerg");

    var countries = topojson.feature(world, world.objects.countries);

    //feature collections only have type, id, and name so i would not sitck properties in there but i dont think its invalid!
    //http://geojson.org/geojson-spec.html#introduction
    var asia = {type: "FeatureCollection", name: "Asia", color: "#ffbb78", id:1, features: countries.features.filter(function(d) { return d.properties.continent=="Asia"; })};
    var africa = {type: "FeatureCollection", name: "Africa", color: "#2ca02c", id:2, features: countries.features.filter(function(d) { return d.properties.continent=="Africa"; })};
    var europe = {type: "FeatureCollection", name: "Europe", color: "#ff7f0e", id:3, features: countries.features.filter(function(d) { return d.properties.continent=="Europe"; })};
    var na = {type: "FeatureCollection", name: "North America", color: "#1f77b4", id:4, features: countries.features.filter(function(d) { return d.properties.continent=="North America"; })};
    var sa = {type: "FeatureCollection", name: "South America", color: "#d62728", id:5, features: countries.features.filter(function(d) { return d.properties.continent=="South America"; })};
    var oceania = {type: "FeatureCollection", name: "Oceania", color: "#aec7e8", id:7, features: countries.features.filter(function(d) { return d.properties.continent=="Oceania"; })};
    //skipped: Seven seas (open ocean) - only applies to French Southern and Antarctic Lands

    var continents = [asia,africa,europe,na,sa,oceania];

    var continent = g.selectAll(".continent").data(continents);

    continent.enter().insert("path")
      .attr("class", "continent")
      .attr("d", path)
      .style("fill", "#fff")
      .style("stroke", "#555")
      .style("stroke-width", 0.5);

    Object.keys(map_chart_position).forEach(function(m) {
        var loc_chart = worldsvg.append("g")
            .attr("id", "locchart_" + m);
        loc_chart.selectAll("rect")
            .data([0,0])
            .enter()
            .append("rect")
            .on("mouseover", mouseoverGeneral)
            .on("mouseout", mouseoutGeneral)
            .attr("transform", function(d, i) { return "translate(" + (rightWidth * (map_chart_position[m].left + 0.02 + (i * .04)))  + "," + (map_chart_height * map_chart_position[m].top) + ")"; })
            .attr("width", rightWidth * 0.04)
            .attr("height", 0)
            .style("fill", function(d,i) { return i == 0 ? "rgb(229,150,54)" : "#222" });
        loc_chart.append("line")
            .attr("class", "locationaxis")
            .attr("x1", rightWidth * map_chart_position[m].left)
            .attr("x2", rightWidth * (map_chart_position[m].left + 0.12))
            .attr("y1", map_chart_height * map_chart_position[m].top)
            .attr("y2", map_chart_height * map_chart_position[m].top);
    })

    d3.selectAll(".locationaxis")
        .style("stroke-width", "1px")
        .style("stroke", "#333");

}













/****************************************************

    SETTING GLOBAL VARIABLES

****************************************************/

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
};

// data placeholders
var mesh,
    reverse_mesh = {},
    intervention,
    loc,
    phase,
    sponsor,
    stat,
    bubble_data = [],
    cond_data = [],
    inv_data = [],
    time_data = [],
    time_data_total = [],
    sponsor_data = [],
    sponsor_data_total = [],
    status_data = [],
    status_data_total = [],
    phase_data = [],
    phase_data_total = [],
    location_data = [],
    location_data_total = [];

// filter and display parameter placeholders
var cond_filter = '',
    intervention_filter = -1,
    filter_test,
    filter_test_notime,
    charttitle = '',
    curcounts = '',
    curconds = 'All',
    curinv = 'All',
    curyears = 'Pre-1999 to 2013'
    level = 0,
    showby = "cond",
    values = "studies";

// bubble chart parameters
var bubble_color = "steelblue",
    bubble_width = centerWidth,
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










/****************************************************

    LOADING DATA AND DOING FIRST UPDATE

****************************************************/

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

    updateData(curdata);
    time_data_total = [].concat(time_data),
    sponsor_data_total = [].concat(sponsor_data),
    status_data_total = [].concat(status_data),
    phase_data_total = [].concat(phase_data),
    location_data_total = [].concat(location_data);

    updateText();
    makeTimeSelector();
    updateTimeBars();
    makeBubble();

    d3.json("vizdata/continent-geogame-110m.json", function(error, geojson) {
        drawMap(geojson);
        updateLocationChart();
    })
});

// procedure to update all the chart data objects
function updateData(dataset) {

    writeFilter();

    // create dictionaries with raw counts
    var cond_dict = {},
        time_dict = {},
        sponsor_dict = {},
        status_dict = {},
        phase_dict = {},
        location_dict = {},
        inv_dict = {};
    var cur_length = dataset.length;
    var istrue = 1==1;
    for (var y=1998; y<2014; y++) {
        timeselector_data[y] = {studies: 0, enrollment: 0};
    }

    while (cur_length--) {
        if ( eval(filter_test) ) {

            var enrollment = dataset[cur_length]['en'];
            if ( enrollment == 'undefined' ) {console.log(dataset[cur_length]);}

            // conditions
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
                if ( !(cond_term in cond_dict) ) {
                    cond_dict[cond_term] = {cond_id: conds[c], studies: 0, enrollment: 0};
                }
                cond_dict[cond_term].studies += 1;
                cond_dict[cond_term].enrollment += enrollment;
            }

            // intervention
            for (var v=0; v<dataset[cur_length]['iv'].length; v++) {
                var iv_name = intervention[dataset[cur_length]['iv'][v]];
                if ( !(iv_name in inv_dict) ) {
                    inv_dict[iv_name] = {inv_id: dataset[cur_length]['iv'][v], studies: 0, enrollment: 0};
                }
                inv_dict[iv_name].studies += 1;
                inv_dict[iv_name].enrollment += enrollment;
            }

            // time
            if ( !(dataset[cur_length]['yr'] in time_dict) ) {
                time_dict[dataset[cur_length]['yr']] = {studies: 0, enrollment: 0};
            }
            time_dict[dataset[cur_length]['yr']].studies += 1;
            time_dict[dataset[cur_length]['yr']].enrollment += enrollment;
            if (+dataset[cur_length]['yr'] < 1999) {
                timeselector_data[1998].studies += 1;
                timeselector_data[1998].enrollment += enrollment;
            } else if (+dataset[cur_length]['yr'] > 2013) {
                timeselector_data[2013].studies += 1;
                timeselector_data[2013].enrollment += enrollment;
            } else {
                timeselector_data[+dataset[cur_length]['yr']].studies += 1;
                timeselector_data[+dataset[cur_length]['yr']].enrollment += enrollment;
            }

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

        } else if ( eval(filter_test_notime) ) {
            if (+dataset[cur_length]['yr'] < 1999) {
                timeselector_data[1998].studies += 1;
                timeselector_data[1998].enrollment += enrollment;
            } else if (+dataset[cur_length]['yr'] > 2013) {
                timeselector_data[2013].studies += 1;
                timeselector_data[2013].enrollment += enrollment;
            } else {
                timeselector_data[+dataset[cur_length]['yr']].studies += 1;
                timeselector_data[+dataset[cur_length]['yr']].enrollment += enrollment;
            }
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

    objkeys = Object.keys(cond_dict);
    clearArray(cond_data);
    for (var i=0; i<objkeys.length; i++) {
        cond_data.push({
            name: objkeys[i],
            id: cond_dict[objkeys[i]].cond_id,
            studies: cond_dict[objkeys[i]].studies,
            enrollment: cond_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(inv_dict);
    clearArray(inv_data);
    for (var i=0; i<objkeys.length; i++) {
        inv_data.push({
            name: objkeys[i],
            id: inv_dict[objkeys[i]].inv_id,
            studies: inv_dict[objkeys[i]].studies,
            enrollment: inv_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(sponsor_dict);
    clearArray(sponsor_data);
    for (var i=0; i<objkeys.length; i++) {
        sponsor_data.push({
            name: objkeys[i],
            studies_industry: sponsor_dict[objkeys[i]].industry.studies,
            enrollment_industry: sponsor_dict[objkeys[i]].industry.enrollment,
            studies_no_industry: sponsor_dict[objkeys[i]].no_industry.studies,
            enrollment_no_industry: sponsor_dict[objkeys[i]].no_industry.enrollment
        });
    }

    objkeys = Object.keys(status_dict);
    clearArray(status_data);
    for (var i=0; i<objkeys.length; i++) {
        status_data.push({
            name: objkeys[i],
            studies: status_dict[objkeys[i]].studies,
            enrollment: status_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(phase_dict);
    clearArray(phase_data);
    for (var i=0; i<objkeys.length; i++) {
        phase_data.push({
            name: objkeys[i],
            studies: phase_dict[objkeys[i]].studies,
            enrollment: phase_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(location_dict);
    clearArray(location_data);
    for (var i=0; i<objkeys.length; i++) {
        location_data.push({
            name: objkeys[i],
            studies: location_dict[objkeys[i]].studies,
            enrollment: location_dict[objkeys[i]].enrollment
        });
    }

}

function writeFilter() {

    // write data filter test to identify records of interest 
    filter_test = '';
    filter_test_notime = '';
    charttitle = 'Studies of ';

    // conditions
    if ( cond_filter.length > 0 ) {
        filter_test = "getCond(dataset[cur_length]['co']).has('" + cond_filter + "') > 0";
        charttitle += reverse_mesh[cond_filter] + ' ';
        var thiscond = '';
        var condarray = cond_filter.split('.');
        for (var c=0; c<condarray.length; c++) {
            if ( c == 0 ) {
                thiscond = condarray[c];
                curconds = reverse_mesh[thiscond.slice(0,1)] + '<br/>';
                if ( condarray[c].length > 1 ) {
                    curconds += '&nbsp;' + reverse_mesh[thiscond] + '<br/>';
                }
            } else {
                thiscond += "." + condarray[c];
                curconds += Array(c+2).join('&nbsp;') + reverse_mesh[thiscond];
                if ( c < condarray.length - 1 ) {
                    curconds += '<br/>';
                }
            }
        }
    } else {
        curconds = 'All';
        charttitle += 'all conditions ';
    }

    // interventions
    if ( intervention_filter >= 0 ) {
        if ( filter_test.length > 0 ) {
            filter_test += " && dataset[cur_length]['iv'].indexOf(" + intervention_filter + ") > 0";
        } else {
            filter_test += "dataset[cur_length]['iv'].indexOf(" + intervention_filter + ") > 0";
        }
        charttitle += 'using ' + intervention[intervention_filter] + ' interventions';
        curinv = intervention[intervention_filter];
    } else {
        curinv = 'All';
        charttitle += 'using any intervention';
    }

    filter_test_notime = filter_test;
    if (filter_test_notime.length == 0) {
        filter_test_notime = "dataset[cur_length]['yr'] <= 2013";
    }

    // time
    if ( time_filter.length > 0 ) {
        var time_series = '';
        for (var t=+time_filter[0]; t<+time_filter[1]; t++ ) {
            if ( time_filter.length > 0 ) {
                time_series += "," + t;
            } else {
                time_series += t;
            }
        }
        var time_filter_string = '';
        if (time_filter[0] == 1998) {
            time_filter_string = "(dataset[cur_length]['yr'] < 1998 || [" + time_series + "].indexOf(dataset[cur_length]['yr']) >= 0)"
        } else {
            time_filter_string = "[" + time_series + "].indexOf(dataset[cur_length]['yr']) >= 0";
        }
        if ( filter_test.length > 0 ) {
            filter_test += " && " + time_filter_string;
        } else {
            filter_test += time_filter_string;
        }
        var startyear = +time_filter[0];
        var endyear = +time_filter[1] - 1;
        if (endyear == 1998) {
            charttitle += ", 1998 or earlier";
            curyears = "Pre-1999";
        } else if (startyear == 1998) {
            charttitle += ", " + endyear + " or earlier";
            curyears = "Pre-1999 to " + endyear;
        } else {
            charttitle += ', from ' + time_filter[0] + ' to ' + endyear;
            curyears = time_filter[0] + ' to ' + endyear;
        }
    } else {
        var all_time = [];
        if ( filter_test.length > 0 ) {
            filter_test += " && dataset[cur_length]['yr'] <= 2013";
        } else {
            filter_test += "dataset[cur_length]['yr'] <= 2013";
        }
        curyears = 'Pre-1999 to 2013';
        charttitle += ', 2013 or earlier';
    }

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










/****************************************************

    CHART DRAWING FUNCTIONS

****************************************************/

function updateTimeBars() {
    var newdata = Object.keys(timeselector_data).map(function(v) { return timeselector_data[v][values]; });
    var maxval = d3.max(newdata);
    var timeselector_scale = d3.scale.linear().domain([0,maxval]).range([0,timeselector_barheight]);
    d3.select("#bar_container")
        .selectAll("rect")
        .data(newdata)
        .transition()
        .duration(500)
        .attr("transform", function(d, i) { return "translate(" + i * timeselector_barwidth + "," + (timeselector_barheight - timeselector_scale(d)) + ")"; })
        .attr("height", function(d) { return timeselector_scale(d); });
}

function updateViz() {
    disappearBubbles();
    updateData(curdata);
    updateText();
    makeBubble();
    updateLocationChart();
}

function updateText () {
    d3.select("#maintitle")
        .html("<p>" + charttitle + "</p");
    var num_studies = 0;
    var num_enroll = 0;
    for (var t=0; t<time_data.length; t++) {
        num_studies += time_data[t].studies;
        num_enroll += time_data[t].enrollment;
    }
    d3.select("#numstudies")
        .html(addCommas(num_studies));
    d3.select("#enrollpart")
        .html(addCommas(num_enroll));
    d3.select("#navigate_conditions")
        .html(curconds);
    d3.select("#navigate_interventions")
        .html(curinv);
    d3.select("#navigate_time")
        .html(curyears);
}

function makeBubble() {

    bubble_color = showby == "cond" ? "steelblue" : "darksalmon";

    // get largest bubble value and scale all other values appropriately
    var temp_data = showby == "cond" ? cond_data : inv_data;
    var val_array = [];
    for (var b=0; b<temp_data.length; b++) {
        val_array.push(temp_data[b][values]);
    }
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

    clearArray(bubble_data);
    for (i=0; i<temp_data.length; i++) {
        var oldval = temp_data[i][values];
        bubble_data.push({
          name: temp_data[i].name,
          id: temp_data[i].id,
          studies: temp_data[i].studies,
          enrollment: temp_data[i].enrollment,
          size: bubble_scale(oldval) * size_scale
        });
    }

    node = vis.selectAll(".node")
        .data(bubble_data);

    node.enter()
      .append("g")
      .attr("class", "node")
      .on("mouseover", mouseoverBubble)
      .on("mouseout", mouseoutBubble)
      .on("click", clickBubble)
      .call(force.drag);

    node.append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) {return d.size; })
      .style("fill", bubble_color);

    node.append("text")
        .attr("transform", function(d) { 
            return "translate(" + d.x + ")"; })
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

function updateLocationChart() {

    // get array of values and scale to max height
    var maxheight = map_chart_height * 0.25;

    var val_array = [],
        cur_studies = [],
        cur_enrollment = [];
    location_data.forEach(function(m) { 
        val_array.push(m[values]);
        cur_studies.push(m.studies);
        cur_enrollment.push(m.enrollment);
    });
    var maxval = d3.max(val_array);
    var totalval = d3.sum(val_array);

    var studies = [];


    var val_array_total = [],
        cur_studies_total = [],
        cur_enrollment_total = [];
    location_data_total.forEach(function(m) { 
        val_array_total.push(m[values]);
        cur_studies_total.push(m.studies);
        cur_enrollment_total.push(m.enrollment);
    });
    var maxval_total = d3.max(val_array_total);
    var totalval_total = d3.sum(val_array_total);

    var maxpct = d3.max([maxval / totalval, maxval_total / totalval_total]);
    var barscale = d3.scale.linear().domain([0,maxpct]).range([0,maxheight]);

    location_data.forEach(function(m) { 
        m.size = barscale(m[values] / totalval);
        m.studies_total = d3.sum(cur_studies);
        m.enrollment_total = d3.sum(cur_enrollment);
        m.subset = 1; 
    });
    location_data_total.forEach(function(m) { 
        m.size = barscale(m[values] / totalval_total);
        m.studies_total = d3.sum(cur_studies_total);
        m.enrollment_total = d3.sum(cur_enrollment_total);
        m.subset = 0;
    });

    // rearrange total list to conform to current data list
    var total_data = [];
    location_data.forEach(function(m) {
        location_data_total.forEach(function(m2) {
            if (m.name == m2.name) { total_data.push(m2); }
        });
    });

    for (var c=0; c<location_data.length; c++) {
        var contcode = continent_dict[location_data[c].name];
        d3.select("#locchart_" + contcode)
            .selectAll("rect")
            .data([location_data[c],total_data[c]])
            .transition()
            .duration(500)
            .attr("transform", function(d, i) { return "translate(" + (rightWidth * (map_chart_position[contcode].left + 0.02 + (i * .04)))  + "," + ((map_chart_height * (map_chart_position[contcode].top - 0.25)) + (maxheight - d.size)) + ")"; })
            .attr("height", function(d) { return d.size; })
            .style("opacity", 1);
    }
}










/****************************************************

    CHART INTERACTION FUNCTIONS

****************************************************/

function clickButton(d, i) {
    var button_class = d3.select(this).attr("class");
    var button_type = button_class.slice(7,13);
    var button_value = button_class.slice(14);

    var other_value;
    if ( button_type == 'showby' ) {
        showby = button_value;
        if ( button_value == 'cond' ) {
            other_value = 'inv';
        } else {
            other_value = 'cond';
        }
    } else {
        values = button_value;
        if ( button_value == 'studies' ) {
            other_value = 'enrollment';
        } else {
            other_value = 'studies';
        }
    }

    highlightButton('button_' + button_type + '_' + button_value);
    lowlightButton('button_' + button_type + '_' + other_value);

    updateViz();
    updateTimeBars();

}

function highlightButton(butclass) {
    d3.select("rect." + butclass)
        .style("stroke-opacity", 1)
        .style("fill", "#444");
    d3.select("text." + butclass)
        .style("fill", "#fff");
}

function lowlightButton(butclass) {
    d3.select("rect." + butclass)
        .style("stroke-opacity", 0)
        .style("fill", "#ddd");
    d3.select("text." + butclass)
        .style("fill", "#000");
}

function resetAll() {
    cond_filter = '';
    intervention_filter = -1;
    time_filter = [];
    level = 0;
    showby = "cond";
    values = "studies";
    highlightButton("button_showby_cond");
    lowlightButton("button_showby_inv");
    highlightButton("button_sizeby_studies");
    lowlightButton("button_sizeby_enrollment");
    d3.select(".brush").call(timeselector_brush.clear());
    updateViz();
    updateTimeBars();
}

function mouseoverGeneral(d, i) {
    var pct = d3.format("%");
    var tooltext = "<span style='font-weight: bold; font-size: 120%'>" + d.name + " - ";
    tooltext += d.subset == 1 ? "these studies" : "all studies";
    tooltext += "</span><br/># of studies:&nbsp;" + addCommas(d.studies) + " (" + pct(d.studies/d.studies_total) + " of total)";
    tooltext += "<br/># enrolled:&nbsp;" + addCommas(d.enrollment) + " (" + pct(d.enrollment/d.enrollment_total) + " of total)";
    d3.select("#tooltip")
        .style("visibility", "visible")
        .html(tooltext)
        .style("top", function () { return (d3.max([50,d3.event.pageY - 80]))+"px"})
        .style("left", function () { return (d3.max([0,d3.event.pageX - 80]))+"px";});
}

function mouseoutGeneral(d, i) {
    d3.select("#tooltip")
        .style("visibility", "hidden")
}

function mouseoverBubble(d, i) {
    d3.select(this)
        .select("circle")
        .style("stroke", "#000")
        .style("stroke-width", "3px");

    d3.select("#tooltip")
        .style("visibility", "visible")
        .html("<span style='font-weight: bold; font-size: 120%'>" + d.name + "</span><br/># of studies:&nbsp;" + addCommas(d.studies) + "<br/># enrolled:&nbsp;" + addCommas(d.enrollment))
        .style("top", function () { return (d3.max([50,d3.event.pageY - 80]))+"px"})
        .style("left", function () { return (d3.max([0,d3.event.pageX - 80]))+"px";});
}

function mouseoutBubble(d, i) {
    d3.select(this)
        .select("circle")
        .style("stroke", "#fff")
        .style("stroke-width", "0.5px");

    mouseoutGeneral(d, i);
}

function clickBubble(d, i) {

    // udpate total variables
    if (showby == "cond") {
        cond_filter = d.id;
        level += 1;
    } else {
        intervention_filter = d.id;
    }
    showby = "cond";
    highlightButton("button_showby_cond");
    lowlightButton("button_showby_inv");

    updateViz();
    updateTimeBars();
}

function disappearBubbles() {
    // disappear old bubbles and call function to replace them
    d3.select("#tooltip")
        .style("visibility", "hidden");

    d3.selectAll(".node")
        .select("text")
        .transition()
        .duration(200)
        .style("font-size", 0)
        .style("opacity", 0);
    d3.selectAll(".node")
        .select("circle")
        .transition()
        .duration(200)
        .attr("r", 0);

    clearArray(bubble_data);
    node = vis.selectAll(".node")
        .data(bubble_data);
    node.exit().remove();

}










/****************************************************

    HELPER AND FORMATTING FUNCTIONS

****************************************************/

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

// function for cleaning up y axis
// from: http://stackoverflow.com/questions/23305230/how-do-you-reduce-the-number-of-y-axis-ticks-in-dimple-js
// Pass in an axis object and an interval.
 var cleanAxis = function (axis, oneInEvery) {
     // This should have been called after draw, otherwise do nothing
     if (axis.shapes.length > 0) {
         // Leave the first label
         var del = false;
         // If there is an interval set
         if (oneInEvery > 1) {
             // Operate on all the axis text
             axis.shapes.selectAll("text")
             .each(function (d) {
                 // Remove all but the nth label
                 if (del % oneInEvery !== 0) {
                     this.remove();
                     // Find the corresponding tick line and remove
                     axis.shapes.selectAll("line").each(function (d2) {
                         if (d === d2) {
                             this.remove();
                         }
                     });
                 }
                 del += 1;
             });
         }
     }
 };

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


