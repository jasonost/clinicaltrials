function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function thinking(description) {
    var header = '<h4>Loading list of trials...</h4>',
        spinner = '<i id="top-cond-spinner" class="fa fa-spinner fa-pulse" style="font-size: 5em; margin: .5em;"></i>';
    $("#trial-list").empty();
    $("#trial-list").html(header + spinner);
}

function stopThinking() {
    $("#trial-list").empty();
}

var cond_id = getParameterByName('cond'),
    inst_id = getParameterByName('inst'),
    viewtype = getParameterByName('filterBy'),
    cur_limit = 50,
    query_obj = {};
var has_filterBy = viewtype ? true : false;

if (cond_id) {
  viewtype = cond_id;
}

// initialize conditions typeahead for researcher filters
var conditions = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: $SCRIPT_ROOT + "static/assets/conditions.json"
});

conditions.initialize();

// patient filters
var distance_filter = "<div class='filter-div'>" +
                        "<h5>Location</h5>" +
                        '<h6>Trials within ' +
                        '<div id="trial-distance" class="btn-group form-inline">' +
                           '<button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">' +
                             'Distance <span class="caret"></span>' +
                           '</button>' +
                           '<ul class="dropdown-menu" role="menu">' +
                             '<li><a role="menuitem" tabindex="-1" href="#" onClick="return false;" class="trial-distance-val">5 miles</a></li>' +
                             '<li><a role="menuitem" tabindex="-1" href="#" onClick="return false;" class="trial-distance-val">25 miles</a></li>' +
                             '<li><a role="menuitem" tabindex="-1" href="#" onClick="return false;" class="trial-distance-val">100 miles</a></li>' +
                             '<li><a role="menuitem" tabindex="-1" href="#" onClick="return false;" class="trial-distance-val">Any distance</a></li>' +
                           '</ul>' +
                          '</div></h6>' +
                        '<h6>of <input type="text" class="form-inline" id="trial-zip" placeholder="ZIP Code" style="width: 75px"></h6>' +
                        '<h6 id="bad-zip"></h6>' +
                      '</div>';

var patient_filters_html =  '<div style="line-height: 0.8em; text-align: center">' +
                            '<small><p><strong>This view only shows trials that are in the recruiting phase or earlier.</strong></p>' +
                            '<p>Refine these results by providing information about the trial participant, then click</p></small></div>' +
                            '<div style="text-align:center; margin-top: .8em">' +
                                '<button class="update-patient-results btn btn-success btn-sm" type="submit">Update results</button>' +
                            '</div>' +
                            '<div id="patient-filters-demog" class="filter-div">' +
                                '<table>' +
                                    '<tr class="filter-row">' +
                                        '<td><h5>Gender:&nbsp;</h5></td>' +
                                        '<td>' +
                                            '<div class="btn-group btn-group-sm" data-toggle="buttons">' +
                                              '<label class="btn btn-default">' +
                                                '<input type="radio" value="female" name="gender-radio" id="gender-female">' +
                                                'Female' +
                                              '</label>' +
                                              '<label class="btn btn-default">' +
                                                '<input type="radio" value="male" name="gender-radio" id="gender-male">' +
                                                'Male' +
                                              '</label>' +
                                            '</div>' +
                                        '</td>' +
                                    '</tr>' +
                                    '<tr class="filter-row">' +
                                        '<td><h5>Age:&nbsp;</h5></td>' +
                                        '<td>' +
                                            '<input type="number" class="form-control form-inline" id="participant-age" placeholder="years" style="width: 75px">' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>' +
                            '</div>' +
                            (cond_id ? distance_filter : '') +
                            '<div id="patient-filters-crit">' +
                            '</div>' +
                            '<div id="patient-filters-healthy" class="filter-div">' +
                                '<label class="checkbox-inline">' +
                                  '<input type="checkbox" id="filter-only-healthy" value="only-healthy"> Only show trials accepting healthy volunteers' +
                                '</label>' +
                            '</div>' +
                            '<div style="text-align:center; margin-top: .8em">' +
                                '<button class="update-patient-results btn btn-success btn-sm" type="submit">Update results</button>' +
                            '</div>',
    table_head = "<div class='filter-div'>" +
                   "<h5>Eligibility Criteria</h5>" +
                   "<table id='concept-filter-table' style='text-align:center'>" +
                   "<col width='15%'><col width='70%'><col width='15%'>" +
                   "<tr>" +
                      "<td class='filter-col-header'>Yes</td>" +
                      "<td class='filter-col-header'></td>" +
                      "<td class='filter-col-header'>No</td>" +
                   "</tr>",
    table_foot = "</table></div>";

// researcher filters
var intr = ['All (default)',
            'Drug',
            'Procedure',
            'Behavioral',
            'Device',
            'Biological',
            'Dietary Supplement',
            'Radiation',
            'Genetic','Other'],
    stat = ['All (default)',
            'Completed',
            'Recruiting',
            'Active, not recruiting',
            'Not yet recruiting',
            'Terminated',
            'Withdrawn',
            'Enrolling by invitation',
            'Suspended',
            'Withheld',
            'Available',
            'No longer available',
            'Approved for marketing',
            'Temporarily not available'];
var research_filters_html = '<div style="text-align:center; line-height:0.8em"><small>Make selections, then click</small></div>' +
                             '<div style="text-align:center; margin-top: .8em">' +
                                '<button class="update-research-results btn btn-success btn-xs" type="submit">Update results</button>' +
                              '</div>' +
                              '<div class="filter-form" id="research-intr-type">' +
                              '<h5>Intervention Type(s)</h5>'+
                                '<select id="intervention-select" multiple class="form-control">' +
                                  '<option>' + intr.join('</option><option>') + '</option>' +
                                '</select>' +
                              '</div>' +
                              '<div class="filter-form" id="research-trial-status">' +
                              '<h5>Trial Status(es)</h5>' +
                              '<select id="status-select" multiple class="form-control">' +
                                '<option>' + stat.join('</option><option>') + '</option>' +
                              '</select>' +
                              '</div>' +
                              '<div id="research-cond-filter">' +
                                '<div class="filter-form"><h5>Condition(s)</h5></div>' +
                                  '<input id="research-input-condition" type="text" class="form-control" data-role="tagsinput"' +
                                    'placeholder="Enter a condition" aria-describedby="research-input-condition">' +
                              '</div>' +
                              '<div id="research-only-results" class="filter-div">' +
                                '<label class="checkbox-inline">' +
                                  '<input type="checkbox" id="research-results" value="research-results"> Only show trials that have submitted results' +
                                '</label>' +
                              '</div>' +
                              '<div style="text-align:center; margin-top: .8em">' +
                                '<button class="update-research-results btn btn-success btn-xs" type="submit">Update results</button>' +
                              '</div>';

function get_trials(trial_criteria) {

    $.getJSON( $SCRIPT_ROOT + "_trial_list", trial_criteria, function( data ) {

        stopThinking();
        if (data.num_results > 0) {
          $.each( data.result, function( key, val ) {

            var trial_div = "<div class='trial block-list-item'><h4><a href='" + $SCRIPT_ROOT + "trial?nct_id=" + 
                            val.nct_id + 
                            "'>" +
                            val.trial_title + 
                            "</a></h4>" +
                            "<p>" + val.lay_str + "</p>" +
                            "<small>" +
                            "<strong>Location(s): </strong>" + val.facility + "<br>" +
                            "<strong>Condition(s): </strong>" + val.conditions + "<br>" +
                            "<strong>Intervention(s): </strong>" + val.interventions +
                            "</small>" +
                            "</div>"
            $("#trial-list").append(trial_div);
          });
          if (data.num_results < data.total_results) {
            var num_left = data.total_results - data.num_results >= 50 ? 50 : data.total_results - data.num_results;
            var new_limit = cur_limit + num_left;
            var see_more = "<div class='trial block-list-item'><h4>Displaying <strong>" + data.num_results + " out of " +
                              data.total_results + "</strong> trials. <a id='see-more-trials' new-limit='" + new_limit + "'>" +
                              "Load next " + num_left + " trials</a></h4></div>";
            $("#trial-list").append(see_more);
          }
        } else {
          var no_results = "<div class='trial block-list-item><h4>There are no trials that match your selections. Please try again.</h4></div>";
          $("#trial-list").append(no_results);
        }
        if (cur_limit == 50) {
          $("#trial-list").scrollTop(0);
          $("#trial-pane-num").text(data.total_results);
          $("#trial-pane-num").effect("highlight", {}, 1000);
        }

        $("#trial-list").effect("highlight", {}, 1000);

        if (!data.okzip) {
          $("#bad-zip").html('<small class="text-danger">Unrecognized ZIP Code</small>');
        } else {
          $("#bad-zip").empty();
        }
    });

}


// make filter selection a switch
$("#filter-type-switch").bootstrapSwitch();

function get_patient_filters() {
    thinking();
    $("#filter-type-switch").bootstrapSwitch('labelText',"<div style='font-size: 10px; line-height: 1em; color: #888'>Go to<br>researcher<br>view</div>");
    $("#filter-type-switch").bootstrapSwitch('state', true);
    $("#filter-list").html(patient_filters_html);
    $.getJSON($SCRIPT_ROOT + "_patient_filters", {}, function(data) {
        if (data.concepts.length > 0) {
          var new_table = table_head;
          for (i=0; i<data.concepts.length; i++) {
            var con_name = data.concepts[i].concept_name,
                con_id = data.concepts[i].concept_id;
            new_table += "<tr class='filter-row'>" +
                          "<td><input type='radio' name='" + con_id + "' value='Y'></td>" +
                          "<td>&nbsp;" + con_name + "?&nbsp;</td>" +
                          "<td><input type='radio' name='" + con_id + "' value='N'></td>" +
                         "</tr>";
          }
          new_table += table_foot;
          $("#patient-filters-crit").html(new_table);
        }
    });

    cur_limit = 50;
    query_obj = {page: cond_id ? 'cond' : 'inst',
                  id: cond_id ? cond_id : inst_id,
                  status: JSON.stringify(['recruiting','not yet recruiting', 'enrolling by invitation']),
                  limit: cur_limit
                  };
    get_trials(query_obj);
}

function get_research_filters(filter_cond) {
    thinking();
    $("#filter-type-switch").bootstrapSwitch('labelText',"<div style='font-size: 10px; line-height: 1em; color: #888'>Go to<br>patient<br>view</div>");
    $("#filter-type-switch").bootstrapSwitch('state', false);
    $("#filter-list").html(research_filters_html);

    var cond_typeahead = $('#research-input-condition');
    cond_typeahead.tagsinput({
      tagClass: 'label label-primary',
      itemValue: 'value',
      itemText: 'text',
      typeaheadjs: {
        name: 'conditions',
        displayKey: 'text',
        source: conditions.ttAdapter()
      }
    });

    cur_limit = 50;
    query_obj = {page: cond_id ? 'cond' : 'inst', 
                 id: cond_id ? cond_id : inst_id,
                 limit: cur_limit
                };
    if (filter_cond) {
      query_obj.condition_filter = JSON.stringify([filter_cond]);
      $.getJSON($SCRIPT_ROOT + "_get_condition_name", {
        cond_id: filter_cond
      }, function(data) {
        cond_typeahead.tagsinput('add', {'value': filter_cond, 'text': data.condition_name})
      });
    }

    get_trials(query_obj);
}


$('#filter-type-switch').on('switchChange.bootstrapSwitch', function(event, state) {
  if (state) {
    // Patients
    $('#filter-list').empty();
    get_patient_filters();
  } else {
    // Researchers
    $('#filter-list').empty();
    get_research_filters(viewtype);
  }
});

// on page open, load patient filters if there's no filterBy condition
if (!has_filterBy) {
  get_patient_filters();
} else {
  $('#filter-type-switch').bootstrapSwitch('toggleState');
}



// update distance dropdown text based on selection
$("body").delegate(".trial-distance-val", "click", function(e) {
  $("#trial-distance button").html($(this).text() + ' <span class="caret"></span>');
});


// update trials based on new filters
$("body").delegate(".update-patient-results", 'click', function(e) {
  thinking();
  var gender = $('input[name=gender-radio]:checked').val(),
      age = $("#participant-age").val(),
      healthy = $("#filter-only-healthy").prop('checked'),
      zip_dist = $("#trial-distance button").text(),
      zip_val = $("#trial-zip").val();
  var criteria_filters = {};
  $("#concept-filter-table input:checked").each(function() {
    criteria_filters[$(this).attr('name')] = $(this).val();
  });
  gender = gender ? gender : false;
  cur_limit = 50;
  query_obj = {page: cond_id ? 'cond' : 'inst', 
                id: cond_id ? cond_id : inst_id,
                gender: gender,
                age: age,
                healthy: healthy,
                zip_dist: zip_dist,
                zip_val: zip_val,
                criteria_filters: JSON.stringify(criteria_filters),
                status: JSON.stringify(['recruiting','not yet recruiting', 'enrolling by invitation']),
                limit: cur_limit
              };
  get_trials(query_obj);
})

$("body").delegate(".update-research-results", 'click', function(e) {
  thinking();
  var interventions = $("#intervention-select").val(),
      status = $("#status-select").val(),
      conds = $("#research-input-condition").val(),
      has_res = $("#research-results").prop('checked');
  var cond_array = conds.length > 0 ? conds.split(',') : null;
  cur_limit = 50;
  query_obj = {page: cond_id ? 'cond' : 'inst', 
                id: cond_id ? cond_id : inst_id,
                interventions: JSON.stringify(interventions),
                status: JSON.stringify(status),
                condition_filter: JSON.stringify(cond_array),
                has_res: has_res,
                limit: cur_limit
              };
  get_trials(query_obj);
})




// see more trials
$("body").delegate("#see-more-trials", 'click', function(e) {
  cur_limit = parseInt($(this).attr('new-limit'));
  query_obj.limit = cur_limit;
  get_trials(query_obj);
})




// fixing scroll to wait until div is at top
var waypoint = new Waypoint({
  element: $('#trial-container'),
  handler: function() {
    $("#filter-list, #trial-list").removeClass("overflow-stopped");
    $("#filter-list, #trial-list").addClass("overflow");
  },
  offset: 142
});

var waypoint = new Waypoint({
  element: $('#trial-container'),
  handler: function() {
    $("#filter-list, #trial-list").removeClass("overflow");
    $("#filter-list, #trial-list").addClass("overflow-stopped");
  },
  offset: 143
});
