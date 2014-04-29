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
    .style("font-size", (navigatorHeight / 24) + "px");

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
d3.selectAll("#timechart, #phasechart, #sponsorchart, #outcomechart, #locationchart")
    .style("width", rightWidth + "px")
    .style("height", ((mainHeight - (topMargin / 3)) / 5) + "px");
d3.select("#timechart")
    .style("margin-top", (topMargin / 3) + "px");
d3.select(".tooltip")
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

var timeselector = d3.select("#timeselector").append("svg")
    .attr("width", leftWidth + "px")
    .attr("height", (optionsHeight / 2 - 3) + "px")
    .append("g")
    .attr("transform", "translate(0," + (optionsHeight / 12) + ")");

var timeselector_barheight,
    timeselector_barwidth,
    time_filter = [],
    timeselector_data = {},
    data,
    curdata;

// make time selector in options box
function makeTimeSelector() {

    var timeselector_x = d3.time.scale()
        .domain([new Date(1998, 1, 1), new Date(2013, 12, 31)])
        .range([0, leftWidth]);

    var temp_data = [];
    for (var y=1998; y<2014; y++) {
        temp_data.push(y);
    }

    timeselector_barheight = optionsHeight / 3;
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

    var timeselector_brush = d3.svg.brush()
        .x(timeselector_x)
        .on("brushend", brushended);

    timeselector.append("line")
        .attr("x1", 0)
        .attr("x2", leftWidth)
        .attr("y1", optionsHeight / 3)
        .attr("y2", optionsHeight / 3)
        .attr("class", "axis")
        .style("stroke-width", "0.25px")
        .style("stroke", "#333");

    var timeselector_text = timeselector.append("g")
        .attr("transform", "translate(0," + (optionsHeight * 9 / 24) + ")");
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
        .attr("height", optionsHeight / 3);

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
        curdata = data;
        updateViz();
    }

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
    intervention_filter = '',
    filter_test,
    charttitle = '',
    curcounts = '',
    curconds = 'All',
    curinv = 'All',
    curyears = 'Pre-1999 to 2013'
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
    time_data_total = time_data,
    sponsor_data = sponsor_data_total,
    status_data = status_data_total,
    phase_data = phase_data_total,
    location_data = location_data_total;

    updateText();
    makeTimeSelector();
    updateTimeBars();
    makeBubble();
    /*
    makeviewfinder();
    histo = makehisto();
    */
});

// procedure to update all the chart data objects
function updateData(dataset) {

    writeFilter();

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
            //curdata.splice(cur_length, 1);
        }
    }

    // translate dictionaries into lists of dictionaries
    var objkeys = Object.keys(time_dict);
    for (var y=1998; y<2014; y++) {
        timeselector_data[y] = {studies: 0, enrollment: 0};
    }
    clearArray(time_data);
    for (var i=0; i<objkeys.length; i++) {
        time_data.push({
            name: objkeys[i],
            studies: time_dict[objkeys[i]].studies,
            enrollment: time_dict[objkeys[i]].enrollment
        });
        if (+objkeys[i] < 1999) {
            timeselector_data[1998].studies += time_dict[objkeys[i]].studies;
            timeselector_data[1998].enrollment += time_dict[objkeys[i]].enrollment;
        } else if (+objkeys[i] == 2014) {
            timeselector_data[2013].studies += time_dict[objkeys[i]].studies;
            timeselector_data[2013].enrollment += time_dict[objkeys[i]].enrollment;
        } else {
            timeselector_data[+objkeys[i]].studies += time_dict[objkeys[i]].studies;
            timeselector_data[+objkeys[i]].enrollment += time_dict[objkeys[i]].enrollment;
        }
    }

    // get largest bubble value and scale all other values appropriately
    var val_array = Object.keys(bubble_dict).map(function(key) {return bubble_dict[key][values];});
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

}

function writeFilter() {

    // write data filter test to identify records of interest 
    filter_test = '';
    charttitle = 'Studies of ';

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
    if ( intervention_filter.length > 0 ) {
        if ( filter_test.length > 0 ) {
            filter_test += " && dataset[cur_length]['iv'] == '" + intervention_filter + "'";
        } else {
            filter_test += "dataset[cur_length]['iv'] == '" + intervention_filter + "'";
        }
        charttitle += 'using ' + intervention_filter + ' interventions';
        curinv = intervention_filter;
    } else {
        curinv = 'All';
        charttitle += 'using any intervention';
    }
    if ( time_filter.length > 0 ) {
        var time_series = '';
        for (var t=+time_filter[0]; t<+time_filter[1]; t++ ) {
            if ( time_filter.length > 0 ) {
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
        var startyear = +time_filter[0];
        var endyear = +time_filter[1] - 1;
        if (startyear == 1998) {
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
var timeselector_scale;
function updateTimeBars() {
    var newdata = Object.keys(timeselector_data).map(function(v) { return timeselector_data[v][values]; });
    var maxval = d3.max(newdata);
    timeselector_scale = d3.scale.linear().domain([0,maxval]).range([0,timeselector_barheight]);
    d3.select("#bar_container")
        .selectAll("rect")
        .data(newdata)
        .attr("transform", function(d, i) { return "translate(" + i * timeselector_barwidth + "," + (timeselector_barheight - timeselector_scale(d)) + ")"; })
        .attr("height", function(d) { return timeselector_scale(d); });

}

function updateViz() {
    disappearBubbles();
    updateData(curdata);
    updateText();
    makeBubble();
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
      .style("fill", "steelblue");

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
/*
//function for making histogram
function makehisto() {

    time_new = [];
    time_data.forEach(function(d) {
        if (parseInt(d.name)>1998 && parseInt(d.name)<2014) {
            time_new.push({"years":parseInt(d.name), "studies": d.studies});
        }
    });

    // var maxY = d3.max(time_new.map(function(item) {return item.studies;}));

    var myChart = new dimple.chart(histosvg, time_new);
    myChart.setBounds('20%', '30%', '75%', '30%');
    var x = myChart.addCategoryAxis("x", "years");
    var y = myChart.addMeasureAxis("y", "studies");
    // y.overrideMax = maxY;
    myChart.addSeries("Studies", dimple.plot.bar);

    myChart.draw(1500);
    cleanAxis(y, 2);
    return myChart;
}
*/
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










/****************************************************

    CHART INTERACTION FUNCTIONS

****************************************************/

function clickButton(d, i) {
    var button_class = d3.select(this).attr("class");
    var button_type = button_class.slice(7,13);
    var button_value = button_class.slice(14);

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

}

function mouseoverBubble(d, i) {
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

function mouseoutBubble(d, i) {
    d3.select(this)
        .select("circle")
        .style("stroke", "#fff")
        .style("stroke-width", "0.5px");

    d3.select("#bubble-tooltip")
        .style("visibility", "hidden")
}

function clickBubble(d, i) {

    // udpate total variables
    cond_filter = d.cond_id;
    level += 1;

    updateViz();
    updateTimeBars();
}

function disappearBubbles() {
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
