/****************************************************

    SETTING UP STYLES AND DIVS

****************************************************/

// setting css for elements
var highlight_color = "rgb(229,150,5)";
var highlight_color_xtra = "rgb(235,160,56)";
var highlight_color_xtra2 = "rgb(242,183,64)";
var base_color = "#222";

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
if (leftWidth > 400 - (2 * divPadding) - (2 * borderWidth)) { leftWidth = 400 - (2 * divPadding) - (2 * borderWidth); }

var rightWidth = 0.4 * (windowWidth - leftWidth);
if (rightWidth > 800) { rightWidth = 800; }

var centerWidth = (windowWidth - (leftWidth + (2 * divPadding) + (2 * borderWidth)) - rightWidth) / 2;

var mainHeight = windowHeight - headerHeight - topMargin - titleHeight;
var sideHeight = mainHeight / 3;
var bottomHeight = mainHeight / 4;
var optionsHeight = ((mainHeight + titleHeight) * 0.4) - (2 * divPadding) - (2 * borderWidth);
var navigatorHeight = (mainHeight + titleHeight) - optionsHeight - topMargin - (4 * divPadding) - (4 * borderWidth);

d3.select("#wrapper")
    .style("height", windowHeight + "px")
    .style("width", windowWidth + "px")
    .style("padding", "4px");

d3.select("#header")
    .style("font-size", headerFontSize + "px")
    .style("letter-spacing", headerFontSpacing + "px")
    .style("width", windowWidth * 0.99)
    .style("height", headerHeight + "px")
    .style("vertical-align","middle")
    .style("background-color", "rgb(68,68,68)")
    .style("padding-left", "1%");

d3.select("#main-title")
    .style("width", windowWidth * 0.49 + "px")
    .style("height", headerHeight + "px");

d3.select("#headerbuttons")
    .style("width", windowWidth * 0.5 + "px")
    .style("height", headerHeight + "px");

d3.select("#sidebar")
    .style("margin-top", topMargin + "px")
    .style("float", "left")
    .style("border-right", "2px solid")
    .style("border-color", "#bdbdbd");
d3.selectAll(".side-div")
    .style("padding", divPadding + "px")
    .style("width", leftWidth + "px");

d3.select("#options")
    .style("margin-top", topMargin + "px")
    .style("height", optionsHeight + "px");

d3.select("#navigator")
    .style("height", navigatorHeight + "px")
    .style("font-size", (leftWidth * 0.05) + "px");

d3.select("#mainsection")
    .style("float", "left")
    .style("margin-top", topMargin + "px")
    .style("width", ((centerWidth * 2) + rightWidth) + "px")
    .style("height", (mainHeight + titleHeight) + "px");
d3.selectAll("#mainsection div")
    .style("float", "left");
d3.select("#maintitle")
    .style("width", ((centerWidth * 2) + rightWidth - 8) + "px")
    .style("height", titleHeight + "px")
    .style("font-size", titleFontSize + "px")
    .style("padding-left", "4px")
    .style("padding-right", "4px")
    .style("vertical-align","middle")
    .style("text-align", "left");
d3.select("#centersection")
    .style("float", "left")
    .style("width", (centerWidth * 2) + "px")
    .style("height", mainHeight + "px");
d3.select("#bubbleviz")
    .style("width", (centerWidth * 2) + "px")
    .style("height", (mainHeight - bottomHeight) + "px")
    .style("float", "left");
d3.select("#bottomcharts")
    .style("float", "left")
    .style("width", (centerWidth * 2) + "px")
    .style("height", bottomHeight + "px");
d3.select("#phasechart")
    .style("width", centerWidth + "px")
    .style("height", bottomHeight + "px");
d3.select("#statuschart")
    .style("width", centerWidth + "px")
    .style("height", bottomHeight + "px")
    .style("float", "left");
d3.select("#sidecharts")
    .style("float", "left")
    .style("width", rightWidth + "px")
    .style("height", mainHeight + "px");
d3.select("#timechart")
    .style("width", rightWidth + "px")
    .style("height", sideHeight + "px");
d3.select("#sponsorchart")
    .style("width", rightWidth + "px")
    .style("height", sideHeight + "px");
d3.select("#locationchart")
    .style("width", rightWidth + "px")
    .style("height", sideHeight + "px");
d3.select("#tooltip")
    .style("font-size", tooltipFontSize + "px");

// add selection buttons to options frame
var buttons = d3.select("#buttons").append("svg")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 2 + 3) + "px");

buttons.append("text")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .attr("dy", (leftWidth * .1) + "px")
    .attr("dx", (leftWidth / 32) + "px")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (leftWidth * .065) + "px")
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
    .style("stroke", highlight_color)
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
    .style("font-size", (leftWidth * .06) + "px")
    .text("conditions");
button_showby.append("rect")
    .attr("class", "button_showby_inv")
    .attr("x", (leftWidth / 2 + 3) + "px")
    .attr("width", (leftWidth / 2 - 6) + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .style("stroke", highlight_color)
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
    .style("font-size", (leftWidth * .06) + "px")
    .text("interventions");

buttons.append("text")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .attr("dy", (leftWidth * .1 + optionsHeight / 4) + "px")
    .attr("dx", (leftWidth / 32) + "px")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (leftWidth * .065) + "px")
    .style("font-weight", "700")
    .text("Size everything by");
var button_sizeby = buttons.append("g")
    .attr("class", "option_button")
    .attr("transform", "translate(0," + (optionsHeight * 3 / 8) + ")");
button_sizeby.append("rect")
    .attr("class", "button_sizeby_trials")
    .attr("width", (leftWidth / 2 - 6) + "px")
    .attr("x", "3px")
    .attr("height", (optionsHeight / 8) + "px")
    .style("stroke", highlight_color)
    .style("stroke-opacity", 1)
    .style("stroke-width", "3px")
    .style("fill", "#444");
button_sizeby.append("text")
    .attr("class", "button_sizeby_trials")
    .attr("dy", (optionsHeight * (11/128)) + "px")
    .attr("dx", (leftWidth / 4) + "px")
    .attr("text-anchor", "middle")
    .style("fill", "#fff")
    .style("font-family", "'Roboto', Helvetica, Arial, sans-serif")
    .style("font-size", (leftWidth * .06) + "px")
    .text("trials");
button_sizeby.append("rect")
    .attr("class", "button_sizeby_enrollment")
    .attr("x", (leftWidth / 2 + 3) + "px")
    .attr("width", (leftWidth / 2 - 6) + "px")
    .attr("height", (optionsHeight / 8) + "px")
    .style("stroke", highlight_color)
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
    .style("font-size", (leftWidth * .06) + "px")
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
    .style("font-size", (leftWidth * .045) + "px")
    .text("reset all");

d3.select(".reset_button")
    .selectAll("rect,text")
    .on("click", resetAll);

// make time selector in options box
var timeselector = d3.select("#timeselector").append("svg")
    .attr("width", leftWidth + "px")
    .attr("height", ((optionsHeight * .39) - 3) + "px")
    .append("g")
    .attr("transform", "translate(0," + (optionsHeight / 24) + ")")
    .on("mouseover", mouseoverTimeSelector)
    .on("mouseout", mouseoutTimeSelector);

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
        .style("fill", highlight_color);

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
    'na': {left: 0.19, top: 0.44},
    'sa': {left: 0.28, top: 0.82},
    'eu': {left: 0.48, top: 0.36},
    'af': {left: 0.51, top: 0.73},
    'as': {left: 0.70, top: 0.50},
    'oc': {left: 0.80, top: 0.84}
};
var map_chart_height = sideHeight;

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
          .attr("height", sideHeight);

    var outterg = worldsvg.append("g")
        .attr("transform", "translate(" + rightWidth / 2 + "," + sideHeight * .64 + ")");

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
            .style("fill", function(d,i) { return i == 0 ? highlight_color : base_color });
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

    worldsvg.append("text")
        .attr("class", "locationchart_title")
        .attr("width", rightWidth)
        .attr("height", mainHeight * 0.03)
        .attr("transform", "translate(" + (rightWidth / 2) + "," + (mainHeight * 0.03) + ")")
        .style("text-anchor", "middle")
        .style("font-size", rightWidth * 0.032)
        .html('Location, <tspan style="font-weight: bold; fill: ' + highlight_color +'">Current Selection</tspan> vs. <tspan style="font-weight: bold; fill: ' + base_color + '">All Trials</tspan>')

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

var reverse_level = {};
for (l in level_length) {
    reverse_level[level_length[l]] = parseInt(l);
}

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
    search_string,
    search_filter = 0,
    filter_test_notime,
    charttitle = '',
    curcounts = '',
    curconds = 'All',
    curinv = 'All',
    curyears = 'Pre-1999 to 2013'
    level = 1,
    showby = "cond",
    values = "trials";











/****************************************************

    LOADING DATA AND DOING FIRST UPDATE

****************************************************/

// load data
d3.json("static/assets/all_data.json", function(error, json) {
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
    drawTimeChart();
    drawPhaseChart();
    drawSponsorChart();
    drawStatusChart();

    d3.json("static/assets/continent-geogame-110m.json", function(error, geojson) {
        drawMap(geojson);
        updateLocationChart();
        drawTutorial();
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
        timeselector_data[y] = {trials: 0, enrollment: 0};
    }

    while (cur_length--) {
        if ( eval(filter_test) ) {

            var enrollment = dataset[cur_length]['en'];
            if ( typeof enrollment == 'undefined' ) {console.log(dataset[cur_length]);}

            // conditions
            var conds = d3.set(dataset[cur_length]['co']
                .map(function(c) {
                    if ( level == 1 || cond_filter == mesh[c]['id'].slice(0,level_length[level - 1]) ) {
                        return mesh[c]['id'].slice(0,level_length[level]);
                    }
                    return;
                }))
                .values()
                .filter(function(t) { return t !== "undefined"});
            for (var c=0; c<conds.length; c++) {
                var cond_term = reverse_mesh[conds[c]];
                if ( !(cond_term in cond_dict) ) {
                    cond_dict[cond_term] = {cond_id: conds[c], trials: 0, enrollment: 0};
                }
                cond_dict[cond_term].trials += 1;
                cond_dict[cond_term].enrollment += enrollment;
            }

            // intervention
            for (var v=0; v<dataset[cur_length]['iv'].length; v++) {
                var iv_name = intervention[dataset[cur_length]['iv'][v]];
                if ( !(iv_name in inv_dict) ) {
                    inv_dict[iv_name] = {inv_id: dataset[cur_length]['iv'][v], trials: 0, enrollment: 0};
                }
                inv_dict[iv_name].trials += 1;
                inv_dict[iv_name].enrollment += enrollment;
            }

            // time
            if (+dataset[cur_length]['yr'] < 1999) {
                if ( !(1998 in time_dict) ) {
                    time_dict[1998] = {trials: 0, enrollment: 0};
                }
                time_dict[1998].trials += 1;
                time_dict[1998].enrollment += enrollment;
                timeselector_data[1998].trials += 1;
                timeselector_data[1998].enrollment += enrollment || 0;
            } else if (+dataset[cur_length]['yr'] > 2013) {
                if ( !(2013 in time_dict) ) {
                    time_dict[2013] = {trials: 0, enrollment: 0};
                }
                time_dict[2013].trials += 1;
                time_dict[2013].enrollment += enrollment;
                timeselector_data[2013].trials += 1;
                timeselector_data[2013].enrollment += enrollment || 0;
            } else {
                if ( !(dataset[cur_length]['yr'] in time_dict) ) {
                    time_dict[dataset[cur_length]['yr']] = {trials: 0, enrollment: 0};
                }
                time_dict[dataset[cur_length]['yr']].trials += 1;
                time_dict[dataset[cur_length]['yr']].enrollment += enrollment;
                timeselector_data[+dataset[cur_length]['yr']].trials += 1;
                timeselector_data[+dataset[cur_length]['yr']].enrollment += enrollment || 0;
            }

            // sponsors
            var sponsor_name = sponsor[dataset[cur_length]['sp']];
            if (sponsor_name == 'Academic') {sponsor_name='Other';}
            if ( !(sponsor_name in sponsor_dict) ) {
                sponsor_dict[sponsor_name] = {industry: {trials: 0, enrollment: 0}, no_industry: {trials: 0, enrollment: 0}};
            }
            if ( dataset[cur_length]['in'] == 1) {
                sponsor_dict[sponsor_name]['industry'].trials += 1;
                sponsor_dict[sponsor_name]['industry'].enrollment += enrollment;
            } else {
                sponsor_dict[sponsor_name]['no_industry'].trials += 1;
                sponsor_dict[sponsor_name]['no_industry'].enrollment += enrollment;
            }

            // status
            var status_name = stat[dataset[cur_length]['st']];
            if ( !(status_name in status_dict) ) {
                status_dict[status_name] = {trials: 0, enrollment: 0};
            }
            status_dict[status_name].trials += 1;
            status_dict[status_name].enrollment += enrollment;

            // phase
            var phase_name = phase[dataset[cur_length]['ph']]
            if ( !(phase_name in phase_dict) ) {
                phase_dict[phase_name] = {trials: 0, enrollment: 0};
            }
            phase_dict[phase_name].trials += 1;
            phase_dict[phase_name].enrollment += enrollment;

            // location
            for (var l=0; l<dataset[cur_length]['lo'].length; l++) {
                var loc_name = loc[dataset[cur_length]['lo'][l]];
                if ( !(loc_name in location_dict) ) {
                    location_dict[loc_name] = {trials: 0, enrollment: 0};
                }
                location_dict[loc_name].trials += 1;
                location_dict[loc_name].enrollment += enrollment;
            }

        } else if ( eval(filter_test_notime) ) {
            if (+dataset[cur_length]['yr'] < 1999) {
                timeselector_data[1998].trials += 1;
                timeselector_data[1998].enrollment += enrollment || 0;
            } else if (+dataset[cur_length]['yr'] > 2013) {
                timeselector_data[2013].trials += 1;
                timeselector_data[2013].enrollment += enrollment || 0;
            } else {
                timeselector_data[+dataset[cur_length]['yr']].trials += 1;
                timeselector_data[+dataset[cur_length]['yr']].enrollment += enrollment || 0;
            }
        }
    }

    // translate dictionaries into lists of dictionaries
    var objkeys = Object.keys(time_dict);
    clearArray(time_data);
    for (var i=0; i<objkeys.length; i++) {
        time_data.push({
            name: objkeys[i],
            dateval: new Date(objkeys[i] + "-06-01"),
            trials: time_dict[objkeys[i]].trials,
            enrollment: time_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(cond_dict);
    clearArray(cond_data);
    for (var i=0; i<objkeys.length; i++) {
        cond_data.push({
            name: objkeys[i],
            id: cond_dict[objkeys[i]].cond_id,
            trials: cond_dict[objkeys[i]].trials,
            enrollment: cond_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(inv_dict);
    clearArray(inv_data);
    for (var i=0; i<objkeys.length; i++) {
        inv_data.push({
            name: objkeys[i],
            id: inv_dict[objkeys[i]].inv_id,
            trials: inv_dict[objkeys[i]].trials,
            enrollment: inv_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(sponsor_dict);
    clearArray(sponsor_data);
    for (var i=0; i<objkeys.length; i++) {
        sponsor_data.push({
            name: objkeys[i],
            trials_industry: sponsor_dict[objkeys[i]].industry.trials,
            enrollment_industry: sponsor_dict[objkeys[i]].industry.enrollment,
            trials_no_industry: sponsor_dict[objkeys[i]].no_industry.trials,
            enrollment_no_industry: sponsor_dict[objkeys[i]].no_industry.enrollment
        });
    }

    objkeys = Object.keys(status_dict);
    clearArray(status_data);
    for (var i=0; i<objkeys.length; i++) {
        status_data.push({
            name: objkeys[i],
            trials: status_dict[objkeys[i]].trials,
            enrollment: status_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(phase_dict);
    clearArray(phase_data);
    for (var i=0; i<objkeys.length; i++) {
        phase_data.push({
            name: objkeys[i],
            trials: phase_dict[objkeys[i]].trials,
            enrollment: phase_dict[objkeys[i]].enrollment
        });
    }

    objkeys = Object.keys(location_dict);
    clearArray(location_data);
    for (var i=0; i<objkeys.length; i++) {
        location_data.push({
            name: objkeys[i],
            trials: location_dict[objkeys[i]].trials,
            enrollment: location_dict[objkeys[i]].enrollment
        });
    }

}

function writeFilter() {

    // write data filter test to identify records of interest 
    filter_test = '';
    filter_test_notime = '';
    search_string = 'http://clinicaltrials.gov/ct2/results?type=Intr';
    search_filter = 0;
    charttitle = 'Registered trials studying ';

    // conditions
    if ( cond_filter.length > 0 ) {
        filter_test = "getCond(dataset[cur_length]['co']).has('" + cond_filter + "') > 0";
        charttitle += reverse_mesh[cond_filter] + ' ';
        var search_string_cond = '';
        var thiscond = '';
        var condarray = cond_filter.split('.');
        for (var c=0; c<condarray.length; c++) {
            if ( c == 0 ) {
                thiscond = condarray[c];
                curconds = '<p class="condlist" id="condlist_Z">All</p>'
                curconds += '<p class="condlist" id="condlist_' + thiscond.slice(0,1) + '" style="padding-left: 6px";>' + reverse_mesh[thiscond.slice(0,1)] + '</p>';
                if ( condarray[c].length > 1 ) {
                curconds += '<p class="condlist" id="condlist_' + thiscond + '" style="padding-left: 12px;">' + reverse_mesh[thiscond] + '</p>';
                search_string_cond = reverse_mesh[thiscond].replace(/ /g, '+');
                }
            } else {
                thiscond += "." + condarray[c];
                curconds += '<p class="condlist" id="condlist_' + thiscond + '" style="padding-left: ' + ((c+2) * 6) + 'px;">' + reverse_mesh[thiscond] + '</p>';
                search_string_cond = reverse_mesh[thiscond].replace(/ /g, '+');
            }
        }
        if (search_string_cond.length > 0) {
            search_string += '&cond="' + search_string_cond + '"';
            search_filter = 1;
        }
    } else {
        curconds = 'All';
        charttitle += 'all conditions ';
    }

    // interventions
    if ( intervention_filter >= 0 ) {
        if ( filter_test.length > 0 ) {
            filter_test += " && dataset[cur_length]['iv'].indexOf(" + intervention_filter + ") >= 0";
        } else {
            filter_test += "dataset[cur_length]['iv'].indexOf(" + intervention_filter + ") >= 0";
        }
        charttitle += 'using ' + intervention[intervention_filter] + ' interventions';
        curinv = '<p>' + intervention[intervention_filter] + ' (<span class="invlist">clear</span>)</p>';
        search_string += '&intr="' + intervention[intervention_filter].replace(/ /g, '+') + '"';
        search_filter = 1;
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
    updateTimeChart();
    updatePhaseChart();
    updateSponsorChart();
    updateStatusChart();
    updateLocationChart();
}

function updateText () {
    d3.select("#maintitle")
        .html("<p>" + charttitle + "</p");
    var num_trials = 0;
    var num_enroll = 0;
    for (var t=0; t<time_data.length; t++) {
        num_trials += time_data[t].trials;
        num_enroll += time_data[t].enrollment;
    }
    d3.select("#numstudies")
        .html(addCommas(num_trials));
    d3.select("#enrollpart")
        .html(addCommas(num_enroll));
    d3.select("#navigate_conditions")
        .html(curconds);
    d3.select("#navigate_interventions")
        .html(curinv);
    d3.select("#navigate_time")
        .html(curyears);

    d3.selectAll(".condlist")
        .on("click", clickCondition);
    d3.selectAll(".invlist")
        .on("click", clearIntervention);

    d3.select("#ctgovlink")
        .html("<p><a href='" + search_string + "' target='_blank'>Search for similar trials at clinicaltrials.gov (includes trials from all years)</a></p>")
        .style("text-align", "right");
}

// bubble chart parameters
var bubble_color = "steelblue",
    bubble_width = centerWidth * 2,
    bubble_height = mainHeight - bottomHeight,
    padding = 3,
    maxRadius = 100,
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

var visrect = vis.append("rect")
    .attr("width", bubble_width)
    .attr("height", bubble_height)
    .style("opacity", 0)
    .on("click", function() {
        if (level > 1) {
            cond_filter = level == 2 ? "" : cond_filter.slice(0,level_length[level-2]);
            level -= 1;
            updateViz();
            updateTimeBars();
        }
    });

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
    var bubble_scale = d3.scale.linear().domain([1, maxval]).range([minsize, maxsize]);
    var sum_size = d3.sum(val_array.map(function(c) {return 3.14159 * Math.pow(bubble_scale(c), 2);}));
    var canv_size = bubble_height * bubble_width;
    var size_scale = Math.pow((canv_size * 0.33) / sum_size, 0.5);

    clearArray(bubble_data);
    for (i=0; i<temp_data.length; i++) {
        var oldval = temp_data[i][values];
        bubble_data.push({
          name: temp_data[i].name,
          id: temp_data[i].id,
          trials: temp_data[i].trials,
          enrollment: temp_data[i].enrollment,
          size: bubble_scale(oldval) * size_scale
        });
    }

    node = vis.selectAll(".node")
        .data(bubble_data);

    node.enter()
      .append("g")
      .attr("class", "node")
      .call(force.drag)
      .on("mouseover", mouseoverBubble)
      .on("mouseout", mouseoutBubble)
      .on("click", clickBubble);

    node.append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) {return d.size; })
      .style("fill", bubble_color);

    node.append("text")
        .attr("transform", function(d) { 
            return "translate(" + d.x + ")"; })
        .attr("class", "bubble_label")
        .style("font-size", function(d) { return d.size * 0.28; })
        .style("opacity", function(d) { return d.size >= 24 ? 1 : 0; })
        .each(function(d) {
            var strings = splitLines(d.name, 14);
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
        cur_trials = [],
        cur_enrollment = [];
    location_data.forEach(function(m) { 
        val_array.push(m[values]);
        cur_trials.push(m.trials);
        cur_enrollment.push(m.enrollment);
    });
    var maxval = d3.max(val_array);
    var totalval = d3.sum(val_array);

    var trials = [];


    var val_array_total = [],
        cur_trials_total = [],
        cur_enrollment_total = [];
    location_data_total.forEach(function(m) { 
        val_array_total.push(m[values]);
        cur_trials_total.push(m.trials);
        cur_enrollment_total.push(m.enrollment);
    });
    var maxval_total = d3.max(val_array_total);
    var totalval_total = d3.sum(val_array_total);

    var maxpct = d3.max([maxval / totalval, maxval_total / totalval_total]);
    var barscale = d3.scale.linear().domain([0,maxpct]).range([0,maxheight]);

    location_data.forEach(function(m) { 
        m.size = barscale(m[values] / totalval);
        m.trials_total = d3.sum(cur_trials);
        m.enrollment_total = d3.sum(cur_enrollment);
        m.subset = 1; 
    });
    location_data_total.forEach(function(m) { 
        m.size = barscale(m[values] / totalval_total);
        m.trials_total = d3.sum(cur_trials_total);
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

// timeline chart
var timechart_x = d3.time.scale().range([0, rightWidth * 0.8]);
var timechart_y = d3.scale.linear().range([(sideHeight * 0.7),0]);
var timechart_y_total = d3.scale.linear().range([(sideHeight * 0.7),0]);

var timechart_xAxis,
    timechart_yAxis1,
    timechart_yAxis2;

function drawTimeChart() {

    // set x axis domain
    var valid_dates = [];
    time_data.forEach(function(d) { valid_dates.push(d.dateval); });
    var low_date = d3.min(valid_dates);
    var hi_date = d3.max(valid_dates);
    timechart_x.domain([low_date, hi_date]);

    // set y axes domains
    var valid_y = [];
    time_data.forEach(function(d) { valid_y.push(d[values]); });
    timechart_y.domain([0, d3.max(valid_y)]);

    var valid_y_total = [];
    time_data_total.forEach(function(d) { 
        if (d.dateval >= low_date && d.dateval <= hi_date) { 
            valid_y_total.push(d[values]);
        }
    });
    timechart_y_total.domain([0, d3.max(valid_y_total)]);

    timechart_xAxis = d3.svg.axis()
        .scale(timechart_x)
        .orient("bottom")
        .tickSize(2);
    timechart_yAxis1 = d3.svg.axis()
        .scale(timechart_y)
        .orient("left")
        .tickFormat(d3.format(".2s"))
        .tickSize(2);
    timechart_yAxis2 = d3.svg.axis()
        .scale(timechart_y_total)
        .orient("right")
        .tickFormat(d3.format(".2s"))
        .tickSize(2);

    var timechart_svg = d3.select("#timechart").append("svg")
        .attr("width", rightWidth)
        .attr("height", sideHeight)
      .append("g")
        .attr("width", rightWidth)
        .attr("height", sideHeight)
        .attr("class", "timechart_area");

    timechart_svg.append("g")
      .attr("class", "timechart_xaxis")
      .attr("transform", "translate(" + (rightWidth * 0.1) + "," + (sideHeight * 0.82) + ")")
      .style("stroke", "#000")
      .style("stroke-width", "1px")
      .style("fill", "none")
      .call(timechart_xAxis)
      .selectAll("text")
      .style("fill", "#000")
      .style("font-size", rightWidth * 0.025);

    timechart_svg.append("g")
      .attr("class", "timechart_yaxis1")
      .attr("transform", "translate(" + (rightWidth * 0.1) + "," + (sideHeight * 0.12) + ")")
      .call(timechart_yAxis1)
      .selectAll("text")
      .style("fill", highlight_color)
      .style("font-size", rightWidth * 0.02);

    timechart_svg.selectAll(".timechart_yaxis1 line, .timechart_yaxis1 path")
      .style("fill", "none")
      .style("stroke", highlight_color)
      .style("stroke-width", "1px");

    timechart_svg.append("g")
      .attr("class", "timechart_yaxis2")
      .attr("transform", "translate(" + (rightWidth * 0.90) + "," + (sideHeight * 0.12) + ")")
      .call(timechart_yAxis2)
      .selectAll("text")
      .style("fill", base_color)
      .style("font-size", rightWidth * 0.02);

    timechart_svg.selectAll(".timechart_yaxis2 line, .timechart_yaxis2 path")
      .style("fill", "none")
      .style("stroke", base_color)
      .style("stroke-width", "1px");

    var timechart_line_total = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return timechart_x(d.dateval); })
        .y(function(d) { return d3.max(timechart_y_total.range()); });

    var line1 = timechart_svg.selectAll(".timeline1")
      .data([0])
      .enter().append("g")
      .attr("class", "timeline1")
      .attr("transform", "translate(" + (rightWidth * 0.1) + "," + (sideHeight * 0.12) + ")");

    line1.append("path")
      .attr("class", "timeline1_line")
      .attr("d", function(d) { return timechart_line_total(time_data_total); })
      .style("stroke", base_color)
      .style("stroke-width", "1.5px")
      .style("fill", "none");

    var timechart_line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return timechart_x(d.dateval); })
        .y(function(d) { return d3.max(timechart_y.range()); });

    var line2 = timechart_svg.selectAll(".timeline2")
      .data([0])
      .enter().append("g")
      .attr("class", "timeline2")
      .attr("transform", "translate(" + (rightWidth * 0.1) + "," + (sideHeight * 0.12) + ")");

    line2.append("path")
      .attr("class", "timeline2_line")
      .attr("d", function(d) { return timechart_line(time_data); })
      .style("stroke", highlight_color)
      .style("stroke-width", "1.5px")
      .style("fill", "none");

    timechart_svg.append("text")
        .attr("class", "timechart_title")
        .attr("width", rightWidth)
        .attr("height", sideHeight * 0.09)
        .attr("transform", "translate(" + (rightWidth / 2) + "," + (sideHeight * 0.08) + ")")
        .style("text-anchor", "middle")
        .style("font-size", rightWidth * 0.03)
        .html('Year, <tspan style="font-weight: bold; fill: ' + highlight_color +'">Current Selection</tspan> vs. <tspan style="font-weight: bold; fill: ' + base_color + '">All Trials</tspan>')

    timechart_svg.append("text")
        .attr("class", "timechart_specialtext")
        .attr("width", rightWidth * 0.25)
        .attr("height", sideHeight * 0.05)
        .attr("transform", "translate(" + (rightWidth * 0.75) + "," + (sideHeight * 0.95) + ")")
        .style("font-size", rightWidth * 0.02)
        .html('* 2013 has partial data')

    updateTimeChart();

}

function updateTimeChart() {

    // set x axis domain
    var valid_dates = [];
    time_data.forEach(function(d) { valid_dates.push(d.dateval); });
    var low_date = d3.min(valid_dates);
    var hi_date = d3.max(valid_dates);
    timechart_x.domain([low_date, hi_date]);

    // set y axes domains
    var valid_y = [];
    time_data.forEach(function(d) { valid_y.push(d[values]); });
    timechart_y.domain([0, d3.max(valid_y)]);
    var valid_y_total = [];
    var time_data_total_temp = [];
    time_data_total.forEach(function(d) { 
        if (d.dateval >= low_date && d.dateval <= hi_date) { 
            valid_y_total.push(d[values]);
            time_data_total_temp.push(d);
        }
    });
    timechart_y_total.domain([0, d3.max(valid_y_total)]);

    d3.select(".timechart_xaxis")
        .transition()
        .duration(500)
        .call(timechart_xAxis)
        .selectAll("text")
        .style("font-size", rightWidth * 0.025)
        .each(function(d) {
            if (d3.select(this).text() == 2013) {
                d3.select(this).text("2013*");
            } else if (d3.select(this).text() % 1 != 0) {
                this.remove();
            }
        });
    d3.select(".timechart_yaxis1")
        .transition()
        .duration(500)
        .call(timechart_yAxis1)
        .selectAll("text")
        .style("fill", highlight_color)
        .style("font-size", rightWidth * 0.02)
        .each(function(d, i) {
            d3.select(this).style("visibility", "visible");
            if (i % 2 == 0) { d3.select(this).style("visibility","hidden"); }
        });
    d3.select(".timechart_yaxis2")
        .transition()
        .duration(500)
        .call(timechart_yAxis2)
        .selectAll("text")
        .style("fill", base_color)
        .style("font-size", rightWidth * 0.02)
        .each(function(d, i) {
            d3.select(this).style("visibility", "visible");
            if (i % 2 == 0) { d3.select(this).style("visibility","hidden"); }
        });

    var timechart_line_total = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return timechart_x(d.dateval); })
        .y(function(d) { return timechart_y_total(d[values]); });

    d3.selectAll(".timechart_area .timeline1 .timeline1_line")
      .transition()
      .duration(500)
      .attr("d", function(d) { return timechart_line_total(time_data_total_temp); });

    var timechart_line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return timechart_x(d.dateval); })
        .y(function(d) { return timechart_y(d[values]); });

    d3.selectAll(".timechart_area .timeline2 .timeline2_line")
      .transition()
      .duration(500)
      .attr("d", function(d) { return timechart_line(time_data); });

    d3.select(".timechart_specialtext")
        .style("visibility", hi_date >= new Date(2013,1,1) ? "visible" : "hidden");

}

// study phase chart
var phases = ["Phase 0", "Phase 1", "Phase 2", "Phase 3", "Phase 4", "N/A"];
var phase_colors = ["#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#bdbdbd"];
var phasechart_x = d3.scale.linear().range([0, centerWidth * .8]),
    phasechart_total_x = d3.scale.linear().range([0, centerWidth * .8]);
var phasechart_topbar_y = bottomHeight * 0.2,
    phasechart_bottombar_y = bottomHeight * 0.5,
    phasechart_barheight = bottomHeight * 0.18;

function drawPhaseChart() {

    var phase_data_ordered = [],
        phase_data_values = 0,
        phase_data_trials = 0,
        phase_data_enrollment = 0;
    phases.forEach(function(p) {
        var done = 1;
        phase_data.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = phase_data_values;
                p2.subset = 1;
                phase_data_ordered.push(p2);
                phase_data_values += p2[values];
                phase_data_trials += p2.trials;
                phase_data_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            phase_data_ordered.push({name: p, trials: 0, enrollment: 0, x0: phase_data_values});
        }
    });
    phase_data_ordered.forEach(function(d, i) { 
        phase_data_ordered[i].trials_total = phase_data_trials;
        phase_data_ordered[i].enrollment_total = phase_data_enrollment;
    });

    var phase_data_total_ordered = [],
        phase_data_total_values = 0
        phase_data_total_trials = 0,
        phase_data_total_enrollment = 0;
    phases.forEach(function(p) {
        var done = 1;
        phase_data_total.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = phase_data_total_values;
                p2.subset = 0;
                phase_data_total_ordered.push(p2);
                phase_data_total_values += p2[values];
                phase_data_total_trials += p2.trials;
                phase_data_total_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            phase_data_total_ordered.push({name: p, trials: 0, enrollment: 0, x0: phase_data_values});
        }
    });
    phase_data_total_ordered.forEach(function(d, i) { 
        phase_data_total_ordered[i].trials_total = phase_data_total_trials;
        phase_data_total_ordered[i].enrollment_total = phase_data_total_enrollment;
    });

    phasechart_x.domain([0, phase_data_values]);
    phasechart_total_x.domain([0, phase_data_total_values]);

    var phasechart_svg = d3.select("#phasechart").append("svg")
        .attr("width", centerWidth)
        .attr("height", bottomHeight)
      .append("g")
        .attr("width", centerWidth)
        .attr("height", bottomHeight)
        .attr("class", "phasechart_area");

    var phasechart_bar1 = phasechart_svg.append("g")
        .attr("class", "phasechart_bar1")
        .attr("transform", "translate(" + centerWidth * 0.18 + "," + phasechart_topbar_y + ")");

    phasechart_bar1.selectAll(".phasechart_bar1_rect")
        .data(phase_data_ordered)
        .enter()
        .append("rect")
        .attr("class", "phasechart_bar1_rect")
        .attr("x", function(d) { return phasechart_x(d.x0); })
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", phasechart_barheight)
        .style("fill", function(d, i) { return phase_colors[i]; })
        .style("opacity", 1);

    var phasechart_bar2 = phasechart_svg.append("g")
        .attr("class", "phasechart_bar2")
        .attr("transform", "translate(" + centerWidth * 0.18 + "," + phasechart_bottombar_y + ")");

    phasechart_bar2.selectAll(".phasechart_bar2_rect")
        .data(phase_data_total_ordered)
        .enter()
        .append("rect")
        .attr("class", "phasechart_bar2_rect")
        .attr("x", function(d) { return phasechart_total_x(d.x0); })
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", phasechart_barheight)
        .style("fill", function(d, i) { return phase_colors[i]; })
        .style("opacity", 1);

    d3.selectAll(".phasechart_bar1_rect, .phasechart_bar2_rect")
        .on("mouseover", mouseoverGeneral)
        .on("mouseout", mouseoutGeneral);

    var phaselabel1 = phasechart_svg.append("text")
        .attr("class", "phasechart_label1")
        .attr("transform", "translate(0," + (phasechart_topbar_y + (bottomHeight * 0.07)) + ")")
        .style("text-anchor", "end")
        .style("font-size", bottomHeight * 0.07)
        .style("fill", highlight_color)
        .style("font-weight", "bold");

    phaselabel1.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .text("Current");
    phaselabel1.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .attr("dy", ".95em")
        .text("Selection");

    var phaselabel2 = phasechart_svg.append("text")
        .attr("class", "phasechart_label2")
        .attr("transform", "translate(0," + (phasechart_bottombar_y + (bottomHeight * 0.07)) + ")")
        .style("text-anchor", "end")
        .style("font-size", bottomHeight * 0.07)
        .style("fill", base_color)
        .style("font-weight", "bold");

    phaselabel2.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .text("All");
    phaselabel2.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .attr("dy", ".95em")
        .text("Trials");

    phasechart_svg.append("text")
        .attr("class", "phasechart_title")
        .attr("width", centerWidth)
        .attr("height", bottomHeight * 0.12)
        .attr("transform", "translate(" + (centerWidth / 2) + "," + (bottomHeight * 0.12) + ")")
        .style("text-anchor", "middle")
        .style("font-size", rightWidth * 0.03)
        .html('Phase')

    var phasechart_legend = phasechart_svg.append("g")
        .attr("class", "phasechart_legend")
        .attr("width", centerWidth * 0.95)
        .attr("height", bottomHeight * 0.2)
        .attr("transform", "translate(" + (centerWidth * 0.05) + "," + (bottomHeight * 0.8) + ")");

    var legend_items = phasechart_legend.selectAll(".phasechart_legend_item")
        .data(phases)
        .enter()
        .append("g")
        .attr("class", "phasechart_legend_item")
        .attr("transform", function(d, i) { return "translate(" + (centerWidth * 0.17 * i) + ")"; });

    legend_items.append("rect")
        .attr("width", bottomHeight * 0.07)
        .attr("height", bottomHeight * 0.07)
        .style("fill", function(d, i) { return phase_colors[i]; });
    legend_items.append("text")
        .attr("x", bottomHeight * 0.083)
        .attr("y", centerWidth * 0.027)
        .style("font-size", centerWidth * 0.027)
        .text(function(d) { return d; });

    updatePhaseChart();

}

function updatePhaseChart() {

    var phase_data_ordered = [],
        phase_data_values = 0,
        phase_data_trials = 0,
        phase_data_enrollment = 0;
    phases.forEach(function(p) {
        var done = 1;
        phase_data.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = phase_data_values;
                p2.subset = 1;
                phase_data_ordered.push(p2);
                phase_data_values += p2[values];
                phase_data_trials += p2.trials;
                phase_data_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            phase_data_ordered.push({name: p, trials: 0, enrollment: 0, x0: phase_data_values, subset: 1});
        }
    });
    phase_data_ordered.forEach(function(d, i) { 
        phase_data_ordered[i].trials_total = phase_data_trials;
        phase_data_ordered[i].enrollment_total = phase_data_enrollment;
    });

    var phase_data_total_ordered = [],
        phase_data_total_values = 0
        phase_data_total_trials = 0,
        phase_data_total_enrollment = 0;
    phases.forEach(function(p) {
        var done = 1;
        phase_data_total.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = phase_data_total_values;
                p2.subset = 0;
                phase_data_total_ordered.push(p2);
                phase_data_total_values += p2[values];
                phase_data_total_trials += p2.trials;
                phase_data_total_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            phase_data_total_ordered.push({name: p, trials: 0, enrollment: 0, x0: phase_data_values, subset: 0});
        }
    });
    phase_data_total_ordered.forEach(function(d, i) { 
        phase_data_total_ordered[i].trials_total = phase_data_total_trials;
        phase_data_total_ordered[i].enrollment_total = phase_data_total_enrollment;
    });

    phasechart_x.domain([0, phase_data_values]);
    phasechart_total_x.domain([0, phase_data_total_values]);

    d3.selectAll(".phasechart_bar1_rect")
        .data(phase_data_ordered)
        .transition()
        .duration(500)
        .attr("x", function(d) { return phasechart_x(d.x0); })
        .attr("width", function(d) { return phasechart_x(d[values]); });

    d3.selectAll(".phasechart_bar2_rect")
        .data(phase_data_total_ordered)
        .transition()
        .duration(500)
        .attr("x", function(d) { return phasechart_total_x(d.x0); })
        .attr("width", function(d) { return phasechart_total_x(d[values]); });

}

// sponsor chart
var sponsor_types = ["Other", "Industry", "US Federal"];
var sponsorchart_y = d3.scale.linear().domain([0, 3]).range([sideHeight*0.6, 0]);
var sponsorchart_x = d3.scale.linear().range([0, rightWidth * .7]);

var sponsorchart_xAxis,
    sponsorchart_yAxis;

function drawSponsorChart() {

    // set y axis domain
    sponsorchart_x.domain([0, 0.3]);

    sponsorchart_yAxis = d3.svg.axis()
        .scale(sponsorchart_y)
        .orient("left")
        .tickValues([0.5, 1.5, 2.5])
        .tickSize(2)
        .tickFormat(function(d, i) { return sponsor_types[i] == "Other" ? "Academic/Other" : sponsor_types[i]; });
    sponsorchart_xAxis = d3.svg.axis()
        .scale(sponsorchart_x)
        .orient("bottom")
        .tickFormat(d3.format("%"))
        .tickSize(2);

    var sponsorchart_svg = d3.select("#sponsorchart").append("svg")
        .attr("width", rightWidth)
        .attr("height", sideHeight)
      .append("g")
        .attr("width", rightWidth)
        .attr("height", sideHeight)
        .attr("class", "sponsorchart_area");

    var sponsorchart_bar1 = sponsorchart_svg.append("g")
        .attr("class", "sponsorchart_bar1")
        .attr("transform", "translate(" + (rightWidth * 0.25) + "," + (sideHeight * 0.25) + ")");

    for (var b=1; b<4; b++) {
        var inner_g = sponsorchart_bar1.selectAll(".sponsorchart_bar1_rect" + b)
            .data([0])
            .enter()
            .append("g")
            .attr("class", "sponsorchart_bar1_rect" + b)
            .attr("transform", "translate(0," + (sideHeight * (0.03 + 0.2 * (b-1))) + ")");
        inner_g.selectAll("rect")
            .data([0,0])
            .enter()
            .append("rect")

            .attr("width", 0)
            .attr("height", sideHeight * 0.07)
            .style("fill", highlight_color)
            .style("opacity", function(d, i) { return i == 0 ? 1 : 0.5; })
            .on("mouseover", mouseoverSponsor)
            .on("mouseout", mouseoutGeneral);
    }

    var sponsorchart_bar2 = sponsorchart_svg.append("g")
        .attr("class", "sponsorchart_bar2")
        .attr("transform", "translate(" + (rightWidth * 0.25) + "," + (sideHeight * 0.25) + ")");

    for (var b=1; b<4; b++) {
        var inner_g = sponsorchart_bar2.selectAll(".sponsorchart_bar2_rect" + b)
            .data([0])
            .enter()
            .append("g")
            .attr("class", "sponsorchart_bar2_rect" + b)
            .attr("transform", "translate(0," + (sideHeight * (0.1 + 0.2 * (b-1))) + ")");
        inner_g.selectAll("rect")
            .data([0,0])
            .enter()
            .append("rect")
            .attr("width", 0)
            .attr("height", sideHeight * 0.07)
            .style("fill", base_color)
            .style("opacity", function(d, i) { return i == 0 ? 1 : 0.5; })
            .on("mouseover", mouseoverSponsor)
            .on("mouseout", mouseoutGeneral);
    }

    sponsorchart_svg.append("g")
      .attr("class", "sponsorchart_yaxis")
      .attr("transform", "translate(" + (rightWidth * 0.25) + "," + (sideHeight * 0.25) + ")")
      .style("stroke", "#000")
      .style("stroke-width", "1px")
      .style("fill", "none")
      .call(sponsorchart_yAxis)
      .selectAll("text")
      .style("fill", "#000")
      .style("font-size", rightWidth * 0.025)
      .style("text-align", "right");

    sponsorchart_svg.append("g")
      .attr("class", "sponsorchart_xaxis")
      .attr("transform", "translate(" + (rightWidth * 0.25) + "," + (sideHeight * 0.85) + ")")
      .style("stroke", "#000")
      .style("stroke-width", "1px")
      .style("fill", "none")
      .call(sponsorchart_xAxis)
      .selectAll("text")
      .style("fill", "#000")
      .style("font-size", rightWidth * 0.02);

    sponsorchart_svg.append("text")
        .attr("class", "sponsorchart_title")
        .attr("width", rightWidth)
        .attr("height", sideHeight * 0.1)
        .attr("transform", "translate(" + (rightWidth / 2) + "," + (sideHeight * 0.2) + ")")
        .style("text-anchor", "middle")
        .style("font-size", rightWidth * 0.03)
        .html('Lead Sponsor Type')

    var sponsorchart_legend = sponsorchart_svg.append("g")
        .attr("class", "sponsorchart_legend")
        .attr("width", rightWidth * 0.22)
        .attr("height", sideHeight * 0.25)
        .attr("transform", "translate(" + (rightWidth * 0.78) + "," + (sideHeight * 0.05) + ")");

    var legend_boxes = sponsorchart_legend.selectAll(".sponsorchart_legend_box")
        .data([[0,0],[0,1],[1,0],[1,1]])
        .enter()
        .append("rect")
        .attr("class", "sponsorchart_legend_box")
        .attr("x", function(d) { return rightWidth * 0.04 * d[0]; })
        .attr("y", function(d) { return (sideHeight * 0.2) + (rightWidth * 0.04 * d[1]); })
        .attr("width", rightWidth * 0.03)
        .attr("height", rightWidth * 0.03)
        .style("fill", function(d) { return d[0] == 0 ? highlight_color : base_color; })
        .style("opacity", function(d) { return d[1] == 0 ? 0.5 : 1; });

    var legend_text_right = sponsorchart_legend.append("g")
        .attr("class", "sponsorchart_legendtext_right")
        .attr("transform", "translate(" + (rightWidth * .079) + "," + (sideHeight * 0.2) + ")");
    legend_text_right.selectAll("text")
        .data(["with Industry","no Industry"])
        .enter()
        .append("text")
        .attr("y", function(d, i) {return (rightWidth * 0.04 * i) + (rightWidth * 0.02);})
        .style("font-size", rightWidth * 0.02)
        .style("text-anchor", "start")
        .text(function(d) { return d; });

    var legend_text_top = sponsorchart_legend.append("g")
        .attr("class", "sponsorchart_legendtext_top")
        .attr("transform", "translate(" + (rightWidth * .01) + "," + (sideHeight * 0.18) + ")");
    legend_text_top.selectAll("text")
        .data(["selection","all trials"])
        .enter()
        .append("text")
        .attr("transform", function(d, i) {return "translate(" + ((rightWidth * 0.04 * i) + (rightWidth * 0.01)) + ")rotate(-45)"; })
        .style("font-size", rightWidth * 0.022)
        .style("text-anchor", "start")
        .text(function(d) { return d; });

    sponsor_types.reverse();

    updateSponsorChart();

}

function updateSponsorChart() {

    // order data and set domain
    var sponsor_data_ordered = [],
        sponsor_data_values = [],
        sponsor_data_trials = 0,
        sponsor_data_enrollment = 0,
        sponsor_data_total_ordered = [],
        sponsor_data_total_values = [],
        sponsor_data_total_trials = 0,
        sponsor_data_total_enrollment = 0;

    sponsor_types.forEach(function(p) {
        var done = 1;
        sponsor_data.forEach(function(p2) {
            if (p2.name == p) {
                var out_array = [
                    { name: p2.name,
                      trials: p2.trials_no_industry,
                      enrollment: p2.enrollment_no_industry,
                      industry: 0,
                      subset: 1,
                      total_trials: p2.trials_no_industry + p2.trials_industry,
                      total_enrollment: p2.enrollment_no_industry + p2.enrollment_industry
                    },
                    { name: p2.name,
                      trials: p2.trials_industry,
                      enrollment: p2.enrollment_industry,
                      industry: 1,
                      subset: 1,
                      total_trials: p2.trials_no_industry + p2.trials_industry,
                      total_enrollment: p2.enrollment_no_industry + p2.enrollment_industry
                    }
                ];
                sponsor_data_ordered.push(out_array);
                sponsor_data_values.push(p2[values + "_industry"] + p2[values + "_no_industry"]);
                sponsor_data_trials += p2.trials_industry + p2.trials_no_industry;
                sponsor_data_enrollment += p2.enrollment_industry + p2.enrollment_no_industry;
                done = 0;
            }
        });
        if ( done == 1 ) {
            sponsor_data_ordered.push([
                    { name: p,
                      trials: 0,
                      enrollment: 0,
                      industry: 0,
                      subset: 1,
                      total_trials: 1,
                      total_enrollment: 1
                    },
                    { name: p,
                      trials: 0,
                      enrollment: 0,
                      industry: 1,
                      subset: 1,
                      total_trials: 1,
                      total_enrollment: 1
                    }
            ]);
        }
    });
    sponsor_data_ordered.forEach(function(d, i) {
        sponsor_data_ordered[i].forEach(function(d2, i2) {
            sponsor_data_ordered[i][i2].trials_total = sponsor_data_trials;
            sponsor_data_ordered[i][i2].enrollment_total = sponsor_data_enrollment;
        })
    })

    sponsor_types.forEach(function(p) {
        var done = 1;
        sponsor_data_total.forEach(function(p2) {
            if (p2.name == p) {
                var out_array = [
                    { name: p2.name,
                      trials: p2.trials_no_industry,
                      enrollment: p2.enrollment_no_industry,
                      industry: 0,
                      subset: 0,
                      total_trials: p2.trials_no_industry + p2.trials_industry,
                      total_enrollment: p2.enrollment_no_industry + p2.enrollment_industry
                    },
                    { name: p2.name,
                      trials: p2.trials_industry,
                      enrollment: p2.enrollment_industry,
                      industry: 1,
                      subset: 0,
                      total_trials: p2.trials_no_industry + p2.trials_industry,
                      total_enrollment: p2.enrollment_no_industry + p2.enrollment_industry
                    }
                ];
                sponsor_data_total_ordered.push(out_array);
                sponsor_data_total_values.push(p2[values + "_industry"] + p2[values + "_no_industry"]);
                sponsor_data_total_trials += p2.trials_industry + p2.trials_no_industry;
                sponsor_data_total_enrollment += p2.enrollment_industry + p2.enrollment_no_industry;
                done = 0;
            }
        });
        if ( done == 1 ) {
            sponsor_data_total_ordered.push([
                    { name: p,
                      trials: 0,
                      enrollment: 0,
                      industry: 0,
                      subset: 0,
                      total_trials: 1,
                      total_enrollment: 1
                    },
                    { name: p,
                      trials: 0,
                      enrollment: 0,
                      industry: 1,
                      subset: 0,
                      total_trials: 1,
                      total_enrollment: 1
                    }
            ]);
        }
    });
    sponsor_data_total_ordered.forEach(function(d, i) {
        sponsor_data_total_ordered[i].forEach(function(d2, i2) {
            sponsor_data_total_ordered[i][i2].trials_total = sponsor_data_total_trials;
            sponsor_data_total_ordered[i][i2].enrollment_total = sponsor_data_total_enrollment;
        })
    })

    // set y axis domain
    sponsorchart_x.domain([0, d3.max([d3.max(sponsor_data_values) / d3.sum(sponsor_data_values), d3.max(sponsor_data_total_values) / d3.sum(sponsor_data_total_values)])]);

    d3.select(".sponsorchart_xaxis")
        .transition()
        .duration(500)
        .call(sponsorchart_xAxis)
        .selectAll("text")
        .style("font-size", rightWidth * 0.02);

    for (var b=1; b<4; b++) {
        var inner_g = d3.selectAll(".sponsorchart_bar1_rect" + b);
        inner_g.selectAll("rect")
            .data(sponsor_data_ordered[b-1])
            .transition()
            .duration(500)
            .attr("x", function(d, i) { return i == 0 ? 0 : sponsorchart_x((d['total_' + values] - d[values])/ d3.sum(sponsor_data_values)) })
            .attr("width", function(d) { return sponsorchart_x(d[values] / d3.sum(sponsor_data_values)); });
    }

    for (var b=1; b<4; b++) {
        var inner_g = d3.selectAll(".sponsorchart_bar2_rect" + b);
        inner_g.selectAll("rect")
            .data(sponsor_data_total_ordered[b-1])
            .transition()
            .duration(500)
            .attr("x", function(d, i) { return i == 0 ? 0 : sponsorchart_x((d['total_' + values] - d[values])/ d3.sum(sponsor_data_total_values)) })
            .attr("width", function(d) { return sponsorchart_x(d[values] / d3.sum(sponsor_data_total_values)); });
    }

}

// study status chart
var statuses = [
  "Not yet recruiting",
  "Recruiting",
  "Enrolling by invitation",
  "Active, not recruiting",
  "Completed",
  "Terminated",
  "Suspended",
  "Withdrawn"
];
var status_colors = [
  "#d9f0a3",
  "#addd8e",
  "#78c679",
  "#41ab5d",
  "#238443",
  "#fc8d59",
  "#ef6548",
  "#d7301f"
];
var statuschart_x = d3.scale.linear().range([0, centerWidth * .8]),
    statuschart_total_x = d3.scale.linear().range([0, centerWidth * .8]);
var statuschart_topbar_y = bottomHeight * 0.2,
    statuschart_bottombar_y = bottomHeight * 0.5,
    statuschart_barheight = bottomHeight * 0.18;

function drawStatusChart() {

    var status_data_ordered = [],
        status_data_values = 0,
        status_data_trials = 0,
        status_data_enrollment = 0;
    statuses.forEach(function(p) {
        var done = 1;
        status_data.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = status_data_values;
                p2.subset = 1;
                status_data_ordered.push(p2);
                status_data_values += p2[values];
                status_data_trials += p2.trials;
                status_data_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            status_data_ordered.push({name: p, trials: 0, enrollment: 0, x0: status_data_values, subset: 1});
        }
    });
    status_data_ordered.forEach(function(d, i) { 
        status_data_ordered[i].trials_total = status_data_trials;
        status_data_ordered[i].enrollment_total = status_data_enrollment;
    });

    var status_data_total_ordered = [],
        status_data_total_values = 0
        status_data_total_trials = 0,
        status_data_total_enrollment = 0;
    statuses.forEach(function(p) {
        var done = 1;
        status_data_total.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = status_data_total_values;
                p2.subset = 0;
                status_data_total_ordered.push(p2);
                status_data_total_values += p2[values];
                status_data_total_trials += p2.trials;
                status_data_total_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            status_data_total_ordered.push({name: p, trials: 0, enrollment: 0, x0: status_data_values, subset: 0});
        }
    });
    status_data_total_ordered.forEach(function(d, i) { 
        status_data_total_ordered[i].trials_total = status_data_total_trials;
        status_data_total_ordered[i].enrollment_total = status_data_total_enrollment;
    });

    statuschart_x.domain([0, status_data_values]);
    statuschart_total_x.domain([0, status_data_total_values]);

    var statuschart_svg = d3.select("#statuschart").append("svg")
        .attr("width", centerWidth)
        .attr("height", bottomHeight)
      .append("g")
        .attr("width", centerWidth)
        .attr("height", bottomHeight)
        .attr("class", "statuschart_area");

    var statuschart_bar1 = statuschart_svg.append("g")
        .attr("class", "statuschart_bar1")
        .attr("transform", "translate(" + centerWidth * 0.18 + "," + statuschart_topbar_y + ")");

    statuschart_bar1.selectAll(".statuschart_bar1_rect")
        .data(status_data_ordered)
        .enter()
        .append("rect")
        .attr("class", "statuschart_bar1_rect")
        .attr("x", function(d) { return statuschart_x(d.x0); })
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", statuschart_barheight)
        .style("fill", function(d, i) { return status_colors[i]; });

    var statuschart_bar2 = statuschart_svg.append("g")
        .attr("class", "statuschart_bar2")
        .attr("transform", "translate(" + centerWidth * 0.18 + "," + statuschart_bottombar_y + ")");

    statuschart_bar2.selectAll(".statuschart_bar2_rect")
        .data(status_data_total_ordered)
        .enter()
        .append("rect")
        .attr("class", "statuschart_bar2_rect")
        .attr("x", function(d) { return statuschart_total_x(d.x0); })
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", statuschart_barheight)
        .style("fill", function(d, i) { return status_colors[i]; })
        .style("opacity", 1);

    d3.selectAll(".statuschart_bar1_rect, .statuschart_bar2_rect")
        .on("mouseover", mouseoverGeneral)
        .on("mouseout", mouseoutGeneral);

    var statuslabel1 = statuschart_svg.append("text")
        .attr("class", "statuschart_label1")
        .attr("transform", "translate(0," + (statuschart_topbar_y + (bottomHeight * 0.07)) + ")")
        .style("text-anchor", "end")
        .style("font-size", bottomHeight * 0.07)
        .style("fill", highlight_color)
        .style("font-weight", "bold");

    statuslabel1.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .text("Current");
    statuslabel1.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .attr("dy", ".95em")
        .text("Selection");

    var statuslabel2 = statuschart_svg.append("text")
        .attr("class", "statuschart_label2")
        .attr("transform", "translate(0," + (statuschart_bottombar_y + (bottomHeight * 0.07)) + ")")
        .style("text-anchor", "end")
        .style("font-size", bottomHeight * 0.07)
        .style("fill", base_color)
        .style("font-weight", "bold");

    statuslabel2.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .text("All");
    statuslabel2.append("tspan")
        .attr("text-anchor", "end")
        .attr("x", centerWidth * 0.17)
        .attr("dy", ".95em")
        .text("Trials");

    statuschart_svg.append("text")
        .attr("class", "statuschart_title")
        .attr("width", centerWidth)
        .attr("height", bottomHeight * 0.12)
        .attr("transform", "translate(" + (centerWidth / 2) + "," + (bottomHeight * 0.12) + ")")
        .style("text-anchor", "middle")
        .style("font-size", rightWidth * 0.03)
        .html('Status')

    var statuschart_legend = statuschart_svg.append("g")
        .attr("class", "statuschart_legend")
        .attr("width", centerWidth * 0.95)
        .attr("height", bottomHeight * 0.25)
        .attr("transform", "translate(" + (centerWidth * 0.05) + "," + (bottomHeight * 0.75) + ")");

    var legend_items = statuschart_legend.selectAll(".statuschart_legend_item")
        .data(statuses)
        .enter()
        .append("g")
        .attr("class", "statuschart_legend_item")
        .attr("transform", function(d, i) { return "translate(" + (centerWidth * 0.195 * i) + ")"; });

    legend_items.append("rect")
        .attr("width", bottomHeight * 0.07)
        .attr("height", bottomHeight * 0.07)
        .attr("transform", function(d, i) { return "translate(" + (i >= 5 ? centerWidth * -0.975 : 0) + "," + (i >= 5 ? bottomHeight * .13 : 0) + ")"})
        .style("fill", function(d, i) { return status_colors[i]; });
    legend_items.append("text")
        .attr("transform", function(d, i) { return "translate(" + ((i >= 5 ? centerWidth * -0.975 : 0) + (bottomHeight * .083)) + "," + ((i >= 5 ? bottomHeight * .13 : 0) + (centerWidth * 0.025)) + ")"})
        .style("font-size", centerWidth * 0.025)
        .each(function(d) { 
            var strings = splitLines(d, 14);
            for (var s=0; s<strings.length; s++) {
                d3.select(this).append("tspan")
                    .attr("x", 0)
                    .attr("dy", s == 0 ? 0 : "0.92em")
                    .text(strings[s]);
            }
        });

    updateStatusChart();

}

function updateStatusChart() {

    var status_data_ordered = [],
        status_data_values = 0,
        status_data_trials = 0,
        status_data_enrollment = 0;
    statuses.forEach(function(p) {
        var done = 1;
        status_data.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = status_data_values;
                p2.subset = 1;
                status_data_ordered.push(p2);
                status_data_values += p2[values];
                status_data_trials += p2.trials;
                status_data_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            status_data_ordered.push({name: p, trials: 0, enrollment: 0, x0: status_data_values, subset: 1});
        }
    });
    status_data_ordered.forEach(function(d, i) { 
        status_data_ordered[i].trials_total = status_data_trials;
        status_data_ordered[i].enrollment_total = status_data_enrollment;
    });

    var status_data_total_ordered = [],
        status_data_total_values = 0
        status_data_total_trials = 0,
        status_data_total_enrollment = 0;
    statuses.forEach(function(p) {
        var done = 1;
        status_data_total.forEach(function(p2) {
            if (p2.name == p) {
                p2.x0 = status_data_total_values;
                p2.subset = 0;
                status_data_total_ordered.push(p2);
                status_data_total_values += p2[values];
                status_data_total_trials += p2.trials;
                status_data_total_enrollment += p2.enrollment;
                done = 0;
            }
        });
        if ( done == 1 ) {
            status_data_total_ordered.push({name: p, trials: 0, enrollment: 0, x0: status_data_values, subset: 0});
        }
    });
    status_data_total_ordered.forEach(function(d, i) { 
        status_data_total_ordered[i].trials_total = status_data_total_trials;
        status_data_total_ordered[i].enrollment_total = status_data_total_enrollment;
    });

    statuschart_x.domain([0, status_data_values]);
    statuschart_total_x.domain([0, status_data_total_values]);

    d3.selectAll(".statuschart_bar1_rect")
        .data(status_data_ordered)
        .transition()
        .duration(500)
        .attr("x", function(d) { return statuschart_x(d.x0); })
        .attr("width", function(d) { return statuschart_x(d[values]); });

    d3.selectAll(".statuschart_bar2_rect")
        .data(status_data_total_ordered)
        .transition()
        .duration(500)
        .attr("x", function(d) { return statuschart_total_x(d.x0); })
        .attr("width", function(d) { return statuschart_total_x(d[values]); });

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
        if ( button_value == 'trials' ) {
            other_value = 'enrollment';
        } else {
            other_value = 'trials';
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
    level = 1;
    showby = "cond";
    values = "trials";
    highlightButton("button_showby_cond");
    lowlightButton("button_showby_inv");
    highlightButton("button_sizeby_trials");
    lowlightButton("button_sizeby_enrollment");
    d3.select(".brush").call(timeselector_brush.clear());
    updateViz();
    updateTimeBars();
}

function clickCondition() {
    var cond_selection = d3.select(this).attr("id").slice(9);
    cond_filter = cond_selection == 'Z' ? '': cond_selection;
    level = reverse_level[cond_filter.length] + 1 || 1;
    updateViz();
    updateTimeBars();
}

function clearIntervention() {
    intervention_filter = -1;
    updateViz();
    updateTimeBars();
}

function mouseoverGeneral(d, i) {
    var pct = d3.format("%");
    var tooltext = "<span style='font-weight: bold; font-size: 120%'>" + d.name + " - ";
    tooltext += d.subset == 1 ? "selection" : "all trials";
    tooltext += "</span><br/>" + pct(d.trials/d.trials_total) + " of trials (" + addCommas(d.trials) + ")<br/>";
    tooltext += pct(d.enrollment/d.enrollment_total) + " of enrollment (" + addCommas(d.enrollment) + ")";
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

function mouseoverSponsor(d, i) {
    var pct = d3.format("%");
    var tooltext = "<span style='font-weight: bold; font-size: 120%'>" + d.name;
    if (d.name != "Industry" && d.industry == 1) {
        tooltext += " (with industry) - ";
    } else {
        tooltext += " - ";
    }
    tooltext += d.subset == 1 ? "selection" : "all trials";
    tooltext += "</span><br/>" + pct(d.trials/d.trials_total) + " of trials (" + addCommas(d.trials) + ")<br/>";
    tooltext += pct(d.enrollment/d.enrollment_total) + " of enrollment (" + addCommas(d.enrollment) + ")<br/>";
    if (d.name != "Industry") {
        tooltext += '<p class="space"></p>';
        tooltext += "<span style='font-weight: bold;'>" + pct(d[values]/d['total_'+values]) + "</span> of ";
        tooltext += (d.subset == 1 ? "selected" : "all") + " " + d.name + " " + values + " had ";
        tooltext += d.industry == 1 ? "" : "no ";
        tooltext += "industry involvement"
        }
    d3.select("#tooltip")
        .style("visibility", "visible")
        .html(tooltext)
        .style("top", function () { return (d3.max([50,d3.event.pageY - 80]))+"px"})
        .style("left", function () { return (d3.max([0,d3.event.pageX - 80]))+"px";});
}

function mouseoverTimeSelector(d, i) {
    offsets = document.getElementById("timeselector").getBoundingClientRect();
    d3.select("#tooltip")
        .style("visibility", "visible")
        .html("<span style='font-weight: bold; font-size: 120%'>Click and drag to select a time range.</span>")
        .style("top", (offsets.top -30) +"px")
        .style("left", offsets.left +"px");
}

//mouseout tool tip for tree
function mouseoutTimeSelector(d, i) {
    d3.select("#tooltip")
        .style("visibility", "hidden");
}

function mouseoverBubble(d, i) {
    d3.select(this)
        .select("circle")
        .style("stroke", "#000")
        .style("stroke-width", "3px");

    d3.select("#tooltip")
        .style("visibility", "visible")
        .html("<span style='font-weight: bold; font-size: 120%'>" + d.name + "</span><br/>" + addCommas(d.trials) + " trials<br/>" + addCommas(d.enrollment) + " enrolled participants")
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
            var numlines = splitLines(d.name, 14).length;
            return d.y - (numlines * (d.size * .18)); 
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



















/****************************************************

    TUTORIAL WINDOW

****************************************************/

var info_background = "#444";
var info_fontsize = leftWidth * 0.07;

function drawTutorial() {

    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;

    var tutorial = d3.select("#tutorial")
        .attr("width", windowWidth)
        .attr("height", windowHeight);

    var tutorialscreen = tutorial.append("svg")
        .attr("class", "tutorialscreen")
        .attr("width", windowWidth)
        .attr("height", windowHeight)
        .append("g");

    tutorialscreen.append("rect")
        .attr("class", "tutorialitem")
        .attr("width", windowWidth)
        .attr("height", windowHeight)
        .style("fill", "#000")
        .style("opacity", 0.6);

    var navbox = tutorialscreen.append("g")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(5," + (headerHeight + topMargin) + ")");

    navbox.append("rect")
        .attr("class", "tutorialitem")
        .attr("width", leftWidth * 1.05)
        .attr("height", navigatorHeight * .65)
        .attr("rx", 8)
        .attr("ry", 8)
        .style("stroke", highlight_color_xtra)
        .style("stroke-width", "2px")
        .style("fill", info_background)
        .style("fill-opacity", 0.55)
        .style("stroke-opacity", 1);

    var navtext = navbox.append("text")
        .attr("class", "tutorialitem")
        .attr("width", leftWidth * .8)
        .attr("height", navigatorHeight * 0.45)
        .attr("transform", "translate(0," + (navigatorHeight * 0.15) + ")")
        .style("stroke", highlight_color_xtra2)
        .style("fill", highlight_color_xtra2)
        .style("font-size", info_fontsize)
        .style("font-weight", "400");

    var strings = splitLines("This area contains a description of your current selection", 18);
    for (var s=0; s<strings.length; s++) {
        navtext.append("tspan")
            .attr("x", leftWidth * 0.5)
            .attr("dy", "1.35em")
            .attr("text-anchor", "middle")
            .text(strings[s]);
    }

    var optbox = tutorialscreen.append("g")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(5," + (windowHeight - optionsHeight - 10) + ")");

    optbox.append("rect")
        .attr("class", "tutorialitem")
        .attr("width", leftWidth * 1.05)
        .attr("height", optionsHeight)
        .attr("rx", 8)
        .attr("ry", 8)
        .style("stroke", highlight_color_xtra)
        .style("stroke-width", "2px")
        .style("fill", info_background)
        .style("fill-opacity", 0.55)
        .style("stroke-opacity", 1);

    var opttext = optbox.append("text")
        .attr("class", "tutorialitem")
        .attr("width", leftWidth * 0.8)
        .attr("height", optionsHeight * 0.8)
        .attr("transform", "translate(0," + (optionsHeight * 0.1) + ")")
        .style("stroke", highlight_color_xtra2)
        .style("fill", highlight_color_xtra2)
        .style("font-size", info_fontsize)
        .style("font-weight", "400");

    var strings = splitLines("These are tools you can use to change the display or filter trials by time", 18);
    for (var s=0; s<strings.length; s++) {
        opttext.append("tspan")
            .attr("x", leftWidth * 0.5)
            .attr("dy", "1.35em")
            .attr("text-anchor", "middle")
            .text(strings[s]);
    }

    var bubblecircle = tutorialscreen.append("g")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(" + (leftWidth * 1.1) + "," + (headerHeight + titleHeight) + ")");

    bubblecircle.append("circle")
        .attr("class", "tutorialitem")
        .attr("r", (mainHeight - bottomHeight) * 0.51)
        .attr("transform", "translate(" + centerWidth + "," + ((mainHeight - bottomHeight) * 0.53) + ")")
        .style("stroke", highlight_color_xtra)
        .style("stroke-width", "2px")
        .style("fill", info_background)
        .style("fill-opacity", 0.55)
        .style("stroke-opacity", 1);

    var bubbletext = bubblecircle.append("text")
        .attr("class", "tutorialitem")
        .attr("width", centerWidth * 1.5)
        .attr("height", centerWidth * 1.5)
        .attr("transform", "translate(" + centerWidth + "," + ((mainHeight - bottomHeight) * 0.4) + ")")
        .style("stroke", highlight_color_xtra2)
        .style("fill", highlight_color_xtra2)
        .style("font-size", info_fontsize)
        .style("font-weight", "400");

    var strings = splitLines("These bubbles represent the number of trials or enrolled patients being studied for each condition, depending on your selections on the lower left", 31);
    for (var s=0; s<strings.length; s++) {
        bubbletext.append("tspan")
            .attr("x", 0)
            .attr("dy", "1.35em")
            .attr("text-anchor", "middle")
            .text(strings[s]);
    }

    var chartbox = tutorialscreen.append("g")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(" + (leftWidth * 1.1 + centerWidth * 2) + "," + (headerHeight + topMargin + titleHeight) + ")");

    chartbox.append("rect")
        .attr("class", "tutorialitem")
        .attr("width", rightWidth * .95)
        .attr("height", sideHeight)
        .attr("rx", 8)
        .attr("ry", 8)
        .style("stroke", highlight_color_xtra)
        .style("stroke-width", "2px")
        .style("fill", info_background)
        .style("fill-opacity", 0.55)
        .style("stroke-opacity", 1);

    var charttext = chartbox.append("text")
        .attr("class", "tutorialitem")
        .attr("width", rightWidth * 0.8)
        .attr("height", sideHeight * 0.8)
        .attr("transform", "translate(0," + (sideHeight * 0.1) + ")")
        .style("stroke", highlight_color_xtra2)
        .style("fill", highlight_color_xtra2)
        .style("font-size", info_fontsize)
        .style("font-weight", "400");

    var strings = splitLines("This chart and others along the side and bottom compare the distribution of your current selection to the distribution of all trials. This line chart has two y-axes: the left is your current selection, and the right is all trials.", 40);
    for (var s=0; s<strings.length; s++) {
        charttext.append("tspan")
            .attr("x", rightWidth * 0.5)
            .attr("dy", "1.35em")
            .attr("text-anchor", "middle")
            .text(strings[s]);
    }

    var closetutorial = tutorialscreen.append("g")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(" + (windowWidth * 0.34) + "," + (windowHeight * 0.85) + ")")
        .attr("class", "got_it");

    closetutorial.append("rect")
        .attr("class", "tutorialitem")
        .attr("width", windowWidth * 0.22)
        .attr("height", windowWidth * 0.05)
        .attr("rx", 8)
        .attr("ry", 8)
        .style("fill", highlight_color)
        .style("stroke", "#ccc")
        .style("stroke-width", "2px")
        .style("stroke-opacity", .4);

    closetutorial.append("text")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(" + (windowWidth * 0.11) + "," + (windowWidth * 0.032) + ")")
        .style("font-size", windowWidth * 0.025)
        .style("font-weight", "700")
        .style("stroke", "#eee")
        .style("fill", "#eee")
        .style("text-anchor", "middle")
        .text("Got it, let's go!")
        .on("click", removeTutorial);

    var closeicon = tutorialscreen.append("g")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(" + (windowWidth * 0.98) + "," + (windowWidth * 0.02) + ")")
        .attr("class", "got_it")
        .on("click", removeTutorial);

    closeicon.append("circle")
        .attr("class", "tutorialitem")
        .attr("r", 12)
        .attr("x", 12)
        .attr("y", 12)
        .style("fill", "#000")
        .style("fill-opacity", 0.7)
        .style("stroke", "#bbb")
        .style("stroke-width", "2px")
        .style("stroke-opacity", 0.9)

    closeicon.append("text")
        .attr("class", "tutorialitem")
        .attr("transform", "translate(0,6)")
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", 16)
        .style("stroke", "#bbb")
        .style("fill", "#bbb")
        .text("X");

}

function removeTutorial() {
    d3.selectAll(".tutorialitem")
        .transition()
        .duration(500)
        .attr("transform", "translate(" + (windowWidth * 0.95) + "," + (windowHeight * 0.05) + ")")
        .attr("width", 0)
        .attr("height", 0)
        .attr("opacity", 0)
        .each("end", function() {
            d3.selectAll(".tutorialscreen").remove();
        });
    var tutorialbutton = d3.select("#headerbuttons").append("svg")
        .attr("class", "tutorialbutton")
        .attr("width", windowWidth * 0.5)
        .attr("height", headerHeight)
        .append("g")
        .attr("transform", "translate(" + windowWidth * 0.43 + "," + headerHeight * 0.2 + ")");
    tutorialbutton.append("rect")
        .attr("width", windowWidth * .05)
        .attr("height", headerHeight * 0.6)
        .style("fill", "#666");
    tutorialbutton.append("text")
        .attr("transform", "translate(" + windowWidth * 0.025 + "," + headerHeight * .4 + ")")
        .style("text-anchor", "middle")
        .style("font-size", headerHeight * 0.3)
        .style("font-style", "normal")
        .style("font-weight", "400")
        .style("stroke", "#ddd")
        .style("fill", "#ddd")
        .text("help");
    tutorialbutton.on("click", function() {
        drawTutorial();
        d3.selectAll(".tutorialbutton").remove();
    });
}
