SELECT * 
FROM clinical_study 
INNER JOIN hiv_studies
ON clinical_study.nct_id = hiv_studies.nct_id;

SELECT clinical_study.*
FROM clinical_study JOIN hiv_studies USING (nct_id);

select concat('select ',table_name,'.* from ',table_name,' join hiv_studies using (nct_id);') cmd from information_schema.tables where table_schema = 'clinicaltrials' and table_name != 'hiv_studies';

# get all column names
select column_name from information_schema.columns where table_name = 'clinical_study';

# for some reason this isnt working, but the result is used below
select concat(column_name,',') cmd from information_schema.columns where table_name = 'clinical_study' and column_type != 'text' and column_name not like '%DATE'

# SELECT query for clinical_study table (excluding the "text" fields that tableau cannot handle
select clinical_study.NCT_ID,
DOWNLOAD_DATE_DT,
ORG_STUDY_ID,
BRIEF_TITLE,
OFFICIAL_TITLE,
ACRONYM,
SOURCE,
HAS_DMC,
OVERALL_STATUS,
COMPLETION_DATE_TYPE,
PRIMARY_COMPLETION_DATE_TYPE,
PHASE,
STUDY_TYPE,
STUDY_DESIGN,
NUMBER_OF_ARMS,
NUMBER_OF_GROUPS,
ENROLLMENT_TYPE,
ENROLLMENT,
BIOSPEC_RETENTION,
BIOSPEC_DESCR,
GENDER,
MINIMUM_AGE,
MAXIMUM_AGE,
HEALTHY_VOLUNTEERS,
SAMPLING_METHOD,
STUDY_POP,
IS_SECTION_801,
IS_FDA_REGULATED,
WHY_STOPPED,
HAS_EXPANDED_ACCESS,
URL,
TARGET_DURATION,
STUDY_RANK,
LIMITATIONS_AND_CAVEATS,
START_DATE_DT,
COMPLETION_DATE_DT,
PRIMARY_COMPLETION_DATE_DT,
VERIFICATION_DATE_DT,
LASTCHANGED_DATE_DT,
FIRSTRECEIVED_DATE_DT
from clinical_study join hiv_studies using (nct_id);

# all tables
select arm_groups.* from arm_groups join hiv_studies using (nct_id);
select authorities.* from authorities join hiv_studies using (nct_id);
select central_contacts.* from central_contacts join hiv_studies using (nct_id);
select clinical_study.* from clinical_study join hiv_studies using (nct_id);
select condition_browse.* from condition_browse join hiv_studies using (nct_id);
select conditions.* from conditions join hiv_studies using (nct_id);
select designs.* from designs join hiv_studies using (nct_id);
select facilities.* from facilities join hiv_studies using (nct_id);
select facility_contacts.* from facility_contacts join hiv_studies using (nct_id);
select hiv_studies_mesh.* from hiv_studies_mesh join hiv_studies using (nct_id);
#select intervention_arm_groups.* from intervention_arm_groups join hiv_studies using (nct_id);
select intervention_browse.* from intervention_browse join hiv_studies using (nct_id);
select intervention_other_names.* from intervention_other_names join hiv_studies using (nct_id);
select interventions.* from interventions join hiv_studies using (nct_id);
select investigators.* from investigators join hiv_studies using (nct_id);
#select keywords.* from keywords join hiv_studies using (nct_id);
#select links.* from links join hiv_studies using (nct_id);
#select location_countries.* from location_countries join hiv_studies using (nct_id);
#select mesh_thesaurus.* from mesh_thesaurus join hiv_studies using (nct_id);
#select nct_aliases.* from nct_aliases join hiv_studies using (nct_id);
#select overall_officials.* from overall_officials join hiv_studies using (nct_id);
#select reference.* from reference join hiv_studies using (nct_id);
#select removed_countries.* from removed_countries join hiv_studies using (nct_id);
#select reported_event_ctgy.* from reported_event_ctgy join hiv_studies using (nct_id);
#select reported_event_ctgy_grp.* from reported_event_ctgy_grp join hiv_studies using (nct_id);
#select reported_events.* from reported_events join hiv_studies using (nct_id);
select responsible_parties.* from responsible_parties join hiv_studies using (nct_id);
#select results_baseline.* from results_baseline join hiv_studies using (nct_id);
#select results_baseline_measure_catgy.* from results_baseline_measure_catgy join hiv_studies using (nct_id);
#select results_baseline_measures.* from results_baseline_measures join hiv_studies using (nct_id);
#select results_outcome_analysis.* from results_outcome_analysis join hiv_studies using (nct_id);
#select results_outcome_analysis_grp.* from results_outcome_analysis_grp join hiv_studies using (nct_id);
#select results_outcome_measure.* from results_outcome_measure join hiv_studies using (nct_id);
#select results_outcome_measure_ctgy.* from results_outcome_measure_ctgy join hiv_studies using (nct_id);
#select results_outcomes.* from results_outcomes join hiv_studies using (nct_id);
#select results_partflow_mlstn.* from results_partflow_mlstn join hiv_studies using (nct_id);
#select results_partflow_mlstn_grp.* from results_partflow_mlstn_grp join hiv_studies using (nct_id);
#select results_partic_flows.* from results_partic_flows join hiv_studies using (nct_id);
#select results_point_of_contact.* from results_point_of_contact join hiv_studies using (nct_id);
#select results_restriction_agreements.* from results_restriction_agreements join hiv_studies using (nct_id);
#select secondary_ids.* from secondary_ids join hiv_studies using (nct_id);
select sponsors.* from sponsors join hiv_studies using (nct_id);
select study_outcome.* from study_outcome join hiv_studies using (nct_id);
