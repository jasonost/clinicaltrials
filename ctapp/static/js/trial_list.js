function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var cond_id = getParameterByName('cond'),
    inst_id = getParameterByName('inst'),
    viewtype = getParameterByName('filter_by');

// patient filters
var patient_filters_html = `
    <small>Fill in as much information as possible about the potential trial participant, then click</small>
    <div style="text-align:center; margin-top: .8em">
        <button class="btn btn-success btn-xs" type="submit">Update results</button>
    </div>
    <div id='patient-filters-demog' class='filter-div'>
        <table>
            <tr class='filter-row'>
                <td><h5>Gender:&nbsp;</h5></td>
                <td>
                    <div class="btn-group btn-group-sm" data-toggle="buttons">
                      <label class="btn btn-default" name="gender-radio" id="gender-female">
                        <input type="radio" value="female">
                        Female
                      </label>
                      <label class="btn btn-default" name="gender-radio" id="gender-male">
                        <input type="radio" value="male">
                        Male
                      </label>
                    </div>
                </td>
            </tr>
            <tr class='filter-row'>
                <td><h5>Age:&nbsp;</h5></td>
                <td>
                    <input type="number" class="form-control" id="participant-age" placeholder="" style="width: 60px">
                </td>
            </tr>
        </table>
    </div>
    <div id='patient-filters-crit'>
    </div>
    <div id='patient-filters-healthy' class='filter-div'>
        <label class="checkbox-inline">
          <input type="checkbox" id="filter-only-healthy" value="only-healthy"> Only show trials accepting healthy volunteers
        </label>
    </div>`,
    table_head = "<table style='text-align:center' class='filter-div'>" +
                 "<tr>" +
                    "<td class='filter-col-header'>Inclusion</td>" +
                    "<td class='filter-col-header'></td>" +
                    "<td class='filter-col-header'>Exclusion</td>" +
                 "</tr>",
    table_foot = "</table>";

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
var research_filters_html = '<small>Make selections, then click</small>' +
                             '<div style="text-align:center; margin-top: .8em">' +
                                '<button class="btn btn-success btn-xs" type="submit">Update results</button>' +
                              '</div>' +
                              '<div id="research-intr-type">' +
                              '<h5>Intervention Type</h5>'+
                                '<select multiple class="form-control">' +
                                  '<option>' + intr.join('</option><option>') + '</option>' +
                                '</select>' +
                              '</div>' +
                              '<div id="research-trial-status">' +
                              '<h5>Trial Status</h5>' +
                              '<select multiple class="form-control">' +
                                '<option>' + stat.join('</option><option>') + '</option>' +
                              '</select>' +
                              '</div>' +
                              '<div id="research-cond-filter"></div>' +
                                '<h5>Condition</h5>' +
                                  '<input id="research-input-condition" type="text" class="form-control" data-role="tagsinput"' +
                                    'placeholder="Enter a condition" aria-describedby="research-input-condition">' +
                              '<div>' +
                              '<div id="research-only-results" class="filter-div">' +
                                '<label class="checkbox-inline">' +
                                  '<input type="checkbox" id="research-results" value="research-results"> Only show trials that have submitted results' +
                                '</label>' +
                              '</div>';

function get_trials(trial_criteria) {

    $.getJSON( $SCRIPT_ROOT + "_trial_list", trial_criteria, function( data ) {

        $("#trial-list").empty();
        $.each( data.result, function( key, val ) {

          var trial_div = "<div class='trial block-list-item'><h4><a href='" + $SCRIPT_ROOT + "trial?nct_id=" + 
                          val.nct_id + 
                          "'>" +
                          val.trial_title + 
                          "</a></h4>" +
                          "<p>" + val.lay_str + "</p>" +
                          "<small>" +
                          "<span style='font-weight: bold'>Condition(s): </span>" + val.conditions + "<br>" +
                          "<span style='font-weight: bold'>Intervention(s): </span>" + val.interventions +
                          "</small>" +
                          "</div>"
          $("#trial-list").append(trial_div);
        });
        $("#trial-list").effect("highlight", {}, 1000);

    });

}


// make filter selection a switch
$("#filter-type-switch").bootstrapSwitch();

function get_patient_filters() {
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
                          "<td><input type='checkbox' id='filter-y-" + con_id + "' value=''></td>" +
                          "<td>" + con_name + "</td>" +
                          "<td><input type='checkbox' id='filter-n-" + con_id + "' value=''></td>" +
                         "</tr>";
          }
          new_table += table_foot;
          $("#patient-filters-crit").html(new_table);
        }
    })
}

function get_research_filters(filter_cond) {
    $("#filter-type-switch").bootstrapSwitch('labelText',"<div style='font-size: 10px; line-height: 1em; color: #888'>Go to<br>patient<br>view</div>");
    $("#filter-type-switch").bootstrapSwitch('state', false);
    $("#filter-list").html(research_filters_html);
    if (filter_cond) {
      $("#research-input-condition").val(filter_cond);
    }
}



$('#filter-type-switch').on('switchChange.bootstrapSwitch', function(event, state) {
  if (state) {
    // Patients
    $('#filter-list').empty();
    get_patient_filters();
  } else {
    // Researchers
    $('#filter-list').empty();
    get_research_filters();
  }
});

// load patient filters if there's no filter_by condition
if (!viewtype) {
  get_patient_filters();
} else {
  get_research_filters(viewtype);
}

// load trials data into pane
get_trials({page: cond_id ? 'cond' : 'inst', id: cond_id ? cond_id : inst_id});




