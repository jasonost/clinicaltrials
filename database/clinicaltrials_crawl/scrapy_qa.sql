-- total counts of all tables
select 'arm_groups', count(*) total from arm_groups union all 
select 'authorities', count(*) total from authorities union all 
select 'central_contacts', count(*) total from central_contacts union all 
select 'clinical_study', count(*) total from clinical_study union all 
select 'condition_browse', count(*) total from condition_browse union all 
select 'conditions', count(*) total from conditions union all 
select 'designs', count(*) total from designs union all 
select 'facilities', count(*) total from facilities union all 
select 'facility_contacts', count(*) total from facility_contacts union all 
select 'intervention_arm_groups', count(*) total from intervention_arm_groups union all 
select 'intervention_browse', count(*) total from intervention_browse union all 
select 'intervention_other_names', count(*) total from intervention_other_names union all 
select 'interventions', count(*) total from interventions union all 
select 'investigators', count(*) total from investigators union all 
select 'keywords', count(*) total from keywords union all 
select 'links', count(*) total from links union all 
select 'location_countries', count(*) total from location_countries union all 
select 'mesh_thesaurus', count(*) total from mesh_thesaurus union all 
select 'nct_aliases', count(*) total from nct_aliases union all 
select 'overall_officials', count(*) total from overall_officials union all 
select 'reference', count(*) total from reference union all 
select 'removed_countries', count(*) total from removed_countries union all 
select 'reported_event_ctgy', count(*) total from reported_event_ctgy union all 
select 'reported_event_ctgy_grp', count(*) total from reported_event_ctgy_grp union all 
select 'reported_events', count(*) total from reported_events union all 
select 'responsible_parties', count(*) total from responsible_parties union all 
select 'results_baseline', count(*) total from results_baseline union all 
select 'results_baseline_measure_catgy', count(*) total from results_baseline_measure_catgy union all 
select 'results_baseline_measures', count(*) total from results_baseline_measures union all 
select 'results_outcome_analysis', count(*) total from results_outcome_analysis union all 
select 'results_outcome_analysis_grp', count(*) total from results_outcome_analysis_grp union all 
select 'results_outcome_measure', count(*) total from results_outcome_measure union all 
select 'results_outcome_measure_ctgy', count(*) total from results_outcome_measure_ctgy union all 
select 'results_outcomes', count(*) total from results_outcomes union all 
select 'results_partflow_mlstn', count(*) total from results_partflow_mlstn union all 
select 'results_partflow_mlstn_grp', count(*) total from results_partflow_mlstn_grp union all 
select 'results_partic_flows', count(*) total from results_partic_flows union all 
select 'results_point_of_contact', count(*) total from results_point_of_contact union all 
select 'results_restriction_agreements', count(*) total from results_restriction_agreements union all 
select 'secondary_ids', count(*) total from secondary_ids union all 
select 'sponsors', count(*) total from sponsors union all 
select 'study_outcome', count(*) total from study_outcome;

-- distinct nct_id counts from relevant tables
select 'arm_groups', count(*) total, count(distinct nct_id) uniq from arm_groups union all 
select 'authorities', count(*) total, count(distinct nct_id) uniq from authorities union all 
select 'central_contacts', count(*) total, count(distinct nct_id) uniq from central_contacts union all 
select 'clinical_study', count(*) total, count(distinct nct_id) uniq from clinical_study union all 
select 'condition_browse', count(*) total, count(distinct nct_id) uniq from condition_browse union all 
select 'conditions', count(*) total, count(distinct nct_id) uniq from conditions union all 
select 'designs', count(*) total, count(distinct nct_id) uniq from designs union all 
select 'facilities', count(*) total, count(distinct nct_id) uniq from facilities union all 
select 'facility_contacts', count(*) total, count(distinct nct_id) uniq from facility_contacts union all 
select 'intervention_arm_groups', count(*) total, count(distinct nct_id) uniq from intervention_arm_groups union all 
select 'intervention_browse', count(*) total, count(distinct nct_id) uniq from intervention_browse union all 
select 'intervention_other_names', count(*) total, count(distinct nct_id) uniq from intervention_other_names union all 
select 'interventions', count(*) total, count(distinct nct_id) uniq from interventions union all 
select 'investigators', count(*) total, count(distinct nct_id) uniq from investigators union all 
select 'keywords', count(*) total, count(distinct nct_id) uniq from keywords union all 
select 'links', count(*) total, count(distinct nct_id) uniq from links union all 
select 'location_countries', count(*) total, count(distinct nct_id) uniq from location_countries union all 
select 'nct_aliases', count(*) total, count(distinct nct_id) uniq from nct_aliases union all 
select 'overall_officials', count(*) total, count(distinct nct_id) uniq from overall_officials union all 
select 'reference', count(*) total, count(distinct nct_id) uniq from reference union all 
select 'removed_countries', count(*) total, count(distinct nct_id) uniq from removed_countries union all 
select 'reported_events', count(*) total, count(distinct nct_id) uniq from reported_events union all 
select 'responsible_parties', count(*) total, count(distinct nct_id) uniq from responsible_parties union all 
select 'results_baseline', count(*) total, count(distinct nct_id) uniq from results_baseline union all 
select 'results_outcomes', count(*) total, count(distinct nct_id) uniq from results_outcomes union all 
select 'results_partic_flows', count(*) total, count(distinct nct_id) uniq from results_partic_flows union all 
select 'results_point_of_contact', count(*) total, count(distinct nct_id) uniq from results_point_of_contact union all 
select 'results_restriction_agreements', count(*) total, count(distinct nct_id) uniq from results_restriction_agreements union all 
select 'secondary_ids', count(*) total, count(distinct nct_id) uniq from secondary_ids union all 
select 'sponsors', count(*) total, count(distinct nct_id) uniq from sponsors union all 
select 'study_outcome', count(*) total, count(distinct nct_id) uniq from study_outcome;





-- individual column counts of non-null values
select 'arm_groups' tbl, 'ARM_GROUP_ID' col, count(*) total, sum(if(ARM_GROUP_ID is not null, 1, 0)) non_null from arm_groups group by 1, 2 union all 
select 'arm_groups' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from arm_groups group by 1, 2 union all 
select 'arm_groups' tbl, 'ARM_GROUP_LABEL' col, count(*) total, sum(if(ARM_GROUP_LABEL is not null, 1, 0)) non_null from arm_groups group by 1, 2 union all 
select 'arm_groups' tbl, 'ARM_GROUP_TYPE' col, count(*) total, sum(if(ARM_GROUP_TYPE is not null, 1, 0)) non_null from arm_groups group by 1, 2 union all 
select 'arm_groups' tbl, 'DESCRIPTION' col, count(*) total, sum(if(DESCRIPTION is not null, 1, 0)) non_null from arm_groups group by 1, 2 union all 
select 'arm_groups' tbl, 'GROUP_ID' col, count(*) total, sum(if(GROUP_ID is not null, 1, 0)) non_null from arm_groups group by 1, 2 union all 
select 'authorities' tbl, 'AUTHORITY_ID' col, count(*) total, sum(if(AUTHORITY_ID is not null, 1, 0)) non_null from authorities group by 1, 2 union all 
select 'authorities' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from authorities group by 1, 2 union all 
select 'authorities' tbl, 'AUTHORITY' col, count(*) total, sum(if(AUTHORITY is not null, 1, 0)) non_null from authorities group by 1, 2 union all 
select 'central_contacts' tbl, 'CENTRAL_CONTACT_ID' col, count(*) total, sum(if(CENTRAL_CONTACT_ID is not null, 1, 0)) non_null from central_contacts group by 1, 2 union all 
select 'central_contacts' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from central_contacts group by 1, 2 union all 
select 'central_contacts' tbl, 'CONTACT_TYPE' col, count(*) total, sum(if(CONTACT_TYPE is not null, 1, 0)) non_null from central_contacts group by 1, 2 union all 
select 'central_contacts' tbl, 'NAME_DEGREE' col, count(*) total, sum(if(NAME_DEGREE is not null, 1, 0)) non_null from central_contacts group by 1, 2 union all 
select 'central_contacts' tbl, 'PHONE' col, count(*) total, sum(if(PHONE is not null, 1, 0)) non_null from central_contacts group by 1, 2 union all 
select 'central_contacts' tbl, 'PHONE_EXT' col, count(*) total, sum(if(PHONE_EXT is not null, 1, 0)) non_null from central_contacts group by 1, 2 union all 
select 'central_contacts' tbl, 'EMAIL' col, count(*) total, sum(if(EMAIL is not null, 1, 0)) non_null from central_contacts group by 1, 2 union all 
select 'clinical_study' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'DOWNLOAD_DATE' col, count(*) total, sum(if(DOWNLOAD_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'ORG_STUDY_ID' col, count(*) total, sum(if(ORG_STUDY_ID is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'BRIEF_TITLE' col, count(*) total, sum(if(BRIEF_TITLE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'OFFICIAL_TITLE' col, count(*) total, sum(if(OFFICIAL_TITLE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'ACRONYM' col, count(*) total, sum(if(ACRONYM is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'SOURCE' col, count(*) total, sum(if(SOURCE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'HAS_DMC' col, count(*) total, sum(if(HAS_DMC is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'BRIEF_SUMMARY' col, count(*) total, sum(if(BRIEF_SUMMARY is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'DETAILED_DESCRIPTION' col, count(*) total, sum(if(DETAILED_DESCRIPTION is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'OVERALL_STATUS' col, count(*) total, sum(if(OVERALL_STATUS is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'START_DATE' col, count(*) total, sum(if(START_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'COMPLETION_DATE' col, count(*) total, sum(if(COMPLETION_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'COMPLETION_DATE_TYPE' col, count(*) total, sum(if(COMPLETION_DATE_TYPE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'PRIMARY_COMPLETION_DATE' col, count(*) total, sum(if(PRIMARY_COMPLETION_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'PRIMARY_COMPLETION_DATE_TYPE' col, count(*) total, sum(if(PRIMARY_COMPLETION_DATE_TYPE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'PHASE' col, count(*) total, sum(if(PHASE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'STUDY_TYPE' col, count(*) total, sum(if(STUDY_TYPE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'STUDY_DESIGN' col, count(*) total, sum(if(STUDY_DESIGN is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'NUMBER_OF_ARMS' col, count(*) total, sum(if(NUMBER_OF_ARMS is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'NUMBER_OF_GROUPS' col, count(*) total, sum(if(NUMBER_OF_GROUPS is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'ENROLLMENT_TYPE' col, count(*) total, sum(if(ENROLLMENT_TYPE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'ENROLLMENT' col, count(*) total, sum(if(ENROLLMENT is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'BIOSPEC_RETENTION' col, count(*) total, sum(if(BIOSPEC_RETENTION is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'BIOSPEC_DESCR' col, count(*) total, sum(if(BIOSPEC_DESCR is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'CRITERIA' col, count(*) total, sum(if(CRITERIA is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'GENDER' col, count(*) total, sum(if(GENDER is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'MINIMUM_AGE' col, count(*) total, sum(if(MINIMUM_AGE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'MAXIMUM_AGE' col, count(*) total, sum(if(MAXIMUM_AGE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'HEALTHY_VOLUNTEERS' col, count(*) total, sum(if(HEALTHY_VOLUNTEERS is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'SAMPLING_METHOD' col, count(*) total, sum(if(SAMPLING_METHOD is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'STUDY_POP' col, count(*) total, sum(if(STUDY_POP is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'VERIFICATION_DATE' col, count(*) total, sum(if(VERIFICATION_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'LASTCHANGED_DATE' col, count(*) total, sum(if(LASTCHANGED_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'FIRSTRECEIVED_DATE' col, count(*) total, sum(if(FIRSTRECEIVED_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'IS_SECTION_801' col, count(*) total, sum(if(IS_SECTION_801 is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'IS_FDA_REGULATED' col, count(*) total, sum(if(IS_FDA_REGULATED is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'WHY_STOPPED' col, count(*) total, sum(if(WHY_STOPPED is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'HAS_EXPANDED_ACCESS' col, count(*) total, sum(if(HAS_EXPANDED_ACCESS is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'FIRSTRECEIVED_RESULTS_DATE' col, count(*) total, sum(if(FIRSTRECEIVED_RESULTS_DATE is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'URL' col, count(*) total, sum(if(URL is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'TARGET_DURATION' col, count(*) total, sum(if(TARGET_DURATION is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'STUDY_RANK' col, count(*) total, sum(if(STUDY_RANK is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'clinical_study' tbl, 'LIMITATIONS_AND_CAVEATS' col, count(*) total, sum(if(LIMITATIONS_AND_CAVEATS is not null, 1, 0)) non_null from clinical_study group by 1, 2 union all 
select 'condition_browse' tbl, 'MESH_CONDITION_ID' col, count(*) total, sum(if(MESH_CONDITION_ID is not null, 1, 0)) non_null from condition_browse group by 1, 2 union all 
select 'condition_browse' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from condition_browse group by 1, 2 union all 
select 'condition_browse' tbl, 'MESH_TERM' col, count(*) total, sum(if(MESH_TERM is not null, 1, 0)) non_null from condition_browse group by 1, 2 union all 
select 'conditions' tbl, 'CONDITION_ID' col, count(*) total, sum(if(CONDITION_ID is not null, 1, 0)) non_null from conditions group by 1, 2 union all 
select 'conditions' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from conditions group by 1, 2 union all 
select 'conditions' tbl, 'CONDITION_NAME' col, count(*) total, sum(if(CONDITION_NAME is not null, 1, 0)) non_null from conditions group by 1, 2 union all 
select 'designs' tbl, 'DESIGN_ID' col, count(*) total, sum(if(DESIGN_ID is not null, 1, 0)) non_null from designs group by 1, 2 union all 
select 'designs' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from designs group by 1, 2 union all 
select 'designs' tbl, 'DESIGN_NAME' col, count(*) total, sum(if(DESIGN_NAME is not null, 1, 0)) non_null from designs group by 1, 2 union all 
select 'designs' tbl, 'DESIGN_VALUE' col, count(*) total, sum(if(DESIGN_VALUE is not null, 1, 0)) non_null from designs group by 1, 2 union all 
select 'designs' tbl, 'MASKED_ROLE' col, count(*) total, sum(if(MASKED_ROLE is not null, 1, 0)) non_null from designs group by 1, 2 union all 
select 'facilities' tbl, 'FACILITY_ID' col, count(*) total, sum(if(FACILITY_ID is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facilities' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facilities' tbl, 'STATUS' col, count(*) total, sum(if(STATUS is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facilities' tbl, 'FACILITY_NAME' col, count(*) total, sum(if(FACILITY_NAME is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facilities' tbl, 'CITY' col, count(*) total, sum(if(CITY is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facilities' tbl, 'STATE' col, count(*) total, sum(if(STATE is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facilities' tbl, 'ZIP' col, count(*) total, sum(if(ZIP is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facilities' tbl, 'COUNTRY' col, count(*) total, sum(if(COUNTRY is not null, 1, 0)) non_null from facilities group by 1, 2 union all 
select 'facility_contacts' tbl, 'FACILITY_CONTACT_ID' col, count(*) total, sum(if(FACILITY_CONTACT_ID is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'facility_contacts' tbl, 'FACILITY_ID' col, count(*) total, sum(if(FACILITY_ID is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'facility_contacts' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'facility_contacts' tbl, 'CONTACT_TYPE' col, count(*) total, sum(if(CONTACT_TYPE is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'facility_contacts' tbl, 'NAME_DEGREE' col, count(*) total, sum(if(NAME_DEGREE is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'facility_contacts' tbl, 'PHONE' col, count(*) total, sum(if(PHONE is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'facility_contacts' tbl, 'PHONE_EXT' col, count(*) total, sum(if(PHONE_EXT is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'facility_contacts' tbl, 'EMAIL' col, count(*) total, sum(if(EMAIL is not null, 1, 0)) non_null from facility_contacts group by 1, 2 union all 
select 'intervention_arm_groups' tbl, 'INT_ARM_GROUP_ID' col, count(*) total, sum(if(INT_ARM_GROUP_ID is not null, 1, 0)) non_null from intervention_arm_groups group by 1, 2 union all 
select 'intervention_arm_groups' tbl, 'INTERVENTION_ID' col, count(*) total, sum(if(INTERVENTION_ID is not null, 1, 0)) non_null from intervention_arm_groups group by 1, 2 union all 
select 'intervention_arm_groups' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from intervention_arm_groups group by 1, 2 union all 
select 'intervention_arm_groups' tbl, 'ARM_GROUP_LABEL' col, count(*) total, sum(if(ARM_GROUP_LABEL is not null, 1, 0)) non_null from intervention_arm_groups group by 1, 2 union all 
select 'intervention_browse' tbl, 'MESH_INTERVENTION_ID' col, count(*) total, sum(if(MESH_INTERVENTION_ID is not null, 1, 0)) non_null from intervention_browse group by 1, 2 union all 
select 'intervention_browse' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from intervention_browse group by 1, 2 union all 
select 'intervention_browse' tbl, 'MESH_TERM' col, count(*) total, sum(if(MESH_TERM is not null, 1, 0)) non_null from intervention_browse group by 1, 2 union all 
select 'intervention_other_names' tbl, 'INT_OTHER_NAME_ID' col, count(*) total, sum(if(INT_OTHER_NAME_ID is not null, 1, 0)) non_null from intervention_other_names group by 1, 2 union all 
select 'intervention_other_names' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from intervention_other_names group by 1, 2 union all 
select 'intervention_other_names' tbl, 'INTERVENTION_ID' col, count(*) total, sum(if(INTERVENTION_ID is not null, 1, 0)) non_null from intervention_other_names group by 1, 2 union all 
select 'intervention_other_names' tbl, 'OTHER_NAME' col, count(*) total, sum(if(OTHER_NAME is not null, 1, 0)) non_null from intervention_other_names group by 1, 2 union all 
select 'interventions' tbl, 'INTERVENTION_ID' col, count(*) total, sum(if(INTERVENTION_ID is not null, 1, 0)) non_null from interventions group by 1, 2 union all 
select 'interventions' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from interventions group by 1, 2 union all 
select 'interventions' tbl, 'INTERVENTION_TYPE' col, count(*) total, sum(if(INTERVENTION_TYPE is not null, 1, 0)) non_null from interventions group by 1, 2 union all 
select 'interventions' tbl, 'INTERVENTION_NAME' col, count(*) total, sum(if(INTERVENTION_NAME is not null, 1, 0)) non_null from interventions group by 1, 2 union all 
select 'interventions' tbl, 'DESCRIPTION' col, count(*) total, sum(if(DESCRIPTION is not null, 1, 0)) non_null from interventions group by 1, 2 union all 
select 'investigators' tbl, 'INVESTIGATOR_ID' col, count(*) total, sum(if(INVESTIGATOR_ID is not null, 1, 0)) non_null from investigators group by 1, 2 union all 
select 'investigators' tbl, 'FACILITY_ID' col, count(*) total, sum(if(FACILITY_ID is not null, 1, 0)) non_null from investigators group by 1, 2 union all 
select 'investigators' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from investigators group by 1, 2 union all 
select 'investigators' tbl, 'NAME_DEGREE' col, count(*) total, sum(if(NAME_DEGREE is not null, 1, 0)) non_null from investigators group by 1, 2 union all 
select 'investigators' tbl, 'ROLE' col, count(*) total, sum(if(ROLE is not null, 1, 0)) non_null from investigators group by 1, 2 union all 
select 'investigators' tbl, 'AFFILIATION' col, count(*) total, sum(if(AFFILIATION is not null, 1, 0)) non_null from investigators group by 1, 2 union all 
select 'keywords' tbl, 'KEYWORD_ID' col, count(*) total, sum(if(KEYWORD_ID is not null, 1, 0)) non_null from keywords group by 1, 2 union all 
select 'keywords' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from keywords group by 1, 2 union all 
select 'keywords' tbl, 'KEYWORD' col, count(*) total, sum(if(KEYWORD is not null, 1, 0)) non_null from keywords group by 1, 2 union all 
select 'links' tbl, 'LINK_ID' col, count(*) total, sum(if(LINK_ID is not null, 1, 0)) non_null from links group by 1, 2 union all 
select 'links' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from links group by 1, 2 union all 
select 'links' tbl, 'URL' col, count(*) total, sum(if(URL is not null, 1, 0)) non_null from links group by 1, 2 union all 
select 'links' tbl, 'DESCRIPTION' col, count(*) total, sum(if(DESCRIPTION is not null, 1, 0)) non_null from links group by 1, 2 union all 
select 'location_countries' tbl, 'LOCATION_COUNTRIES_ID' col, count(*) total, sum(if(LOCATION_COUNTRIES_ID is not null, 1, 0)) non_null from location_countries group by 1, 2 union all 
select 'location_countries' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from location_countries group by 1, 2 union all 
select 'location_countries' tbl, 'COUNTRY' col, count(*) total, sum(if(COUNTRY is not null, 1, 0)) non_null from location_countries group by 1, 2 union all 
select 'mesh_thesaurus' tbl, 'MESH_SEQID' col, count(*) total, sum(if(MESH_SEQID is not null, 1, 0)) non_null from mesh_thesaurus group by 1, 2 union all 
select 'mesh_thesaurus' tbl, 'MESH_ID' col, count(*) total, sum(if(MESH_ID is not null, 1, 0)) non_null from mesh_thesaurus group by 1, 2 union all 
select 'mesh_thesaurus' tbl, 'MESH_TERM' col, count(*) total, sum(if(MESH_TERM is not null, 1, 0)) non_null from mesh_thesaurus group by 1, 2 union all 
select 'nct_aliases' tbl, 'NCT_ALIAS_ID' col, count(*) total, sum(if(NCT_ALIAS_ID is not null, 1, 0)) non_null from nct_aliases group by 1, 2 union all 
select 'nct_aliases' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from nct_aliases group by 1, 2 union all 
select 'nct_aliases' tbl, 'NCT_ALIAS' col, count(*) total, sum(if(NCT_ALIAS is not null, 1, 0)) non_null from nct_aliases group by 1, 2 union all 
select 'overall_officials' tbl, 'OVERALL_OFFICIAL_ID' col, count(*) total, sum(if(OVERALL_OFFICIAL_ID is not null, 1, 0)) non_null from overall_officials group by 1, 2 union all 
select 'overall_officials' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from overall_officials group by 1, 2 union all 
select 'overall_officials' tbl, 'ROLE' col, count(*) total, sum(if(ROLE is not null, 1, 0)) non_null from overall_officials group by 1, 2 union all 
select 'overall_officials' tbl, 'NAME_DEGREE' col, count(*) total, sum(if(NAME_DEGREE is not null, 1, 0)) non_null from overall_officials group by 1, 2 union all 
select 'overall_officials' tbl, 'AFFILIATION' col, count(*) total, sum(if(AFFILIATION is not null, 1, 0)) non_null from overall_officials group by 1, 2 union all 
select 'reference' tbl, 'REFERENCE_ID' col, count(*) total, sum(if(REFERENCE_ID is not null, 1, 0)) non_null from reference group by 1, 2 union all 
select 'reference' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from reference group by 1, 2 union all 
select 'reference' tbl, 'REFERENCE_TYPE' col, count(*) total, sum(if(REFERENCE_TYPE is not null, 1, 0)) non_null from reference group by 1, 2 union all 
select 'reference' tbl, 'CITATION' col, count(*) total, sum(if(CITATION is not null, 1, 0)) non_null from reference group by 1, 2 union all 
select 'reference' tbl, 'PMID' col, count(*) total, sum(if(PMID is not null, 1, 0)) non_null from reference group by 1, 2 union all 
select 'removed_countries' tbl, 'REMOVED_COUNTRIES_ID' col, count(*) total, sum(if(REMOVED_COUNTRIES_ID is not null, 1, 0)) non_null from removed_countries group by 1, 2 union all 
select 'removed_countries' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from removed_countries group by 1, 2 union all 
select 'removed_countries' tbl, 'COUNTRY' col, count(*) total, sum(if(COUNTRY is not null, 1, 0)) non_null from removed_countries group by 1, 2 union all 
select 'reported_event_ctgy' tbl, 'REPORTED_EVENT_CATEGORY_ID' col, count(*) total, sum(if(REPORTED_EVENT_CATEGORY_ID is not null, 1, 0)) non_null from reported_event_ctgy group by 1, 2 union all 
select 'reported_event_ctgy' tbl, 'REPORTED_EVENT_ID' col, count(*) total, sum(if(REPORTED_EVENT_ID is not null, 1, 0)) non_null from reported_event_ctgy group by 1, 2 union all 
select 'reported_event_ctgy' tbl, 'CATEGORY_TITLE' col, count(*) total, sum(if(CATEGORY_TITLE is not null, 1, 0)) non_null from reported_event_ctgy group by 1, 2 union all 
select 'reported_event_ctgy' tbl, 'CATEGORY_SUB_TITLE' col, count(*) total, sum(if(CATEGORY_SUB_TITLE is not null, 1, 0)) non_null from reported_event_ctgy group by 1, 2 union all 
select 'reported_event_ctgy' tbl, 'CATEGORY_DESCRIPTION' col, count(*) total, sum(if(CATEGORY_DESCRIPTION is not null, 1, 0)) non_null from reported_event_ctgy group by 1, 2 union all 
select 'reported_event_ctgy' tbl, 'CATEGORY_ASSESSMENT' col, count(*) total, sum(if(CATEGORY_ASSESSMENT is not null, 1, 0)) non_null from reported_event_ctgy group by 1, 2 union all 
select 'reported_event_ctgy_grp' tbl, 'REPORTED_EVENT_CATGY_GRP_ID' col, count(*) total, sum(if(REPORTED_EVENT_CATGY_GRP_ID is not null, 1, 0)) non_null from reported_event_ctgy_grp group by 1, 2 union all 
select 'reported_event_ctgy_grp' tbl, 'REPORTED_EVENT_CATEGORY_ID' col, count(*) total, sum(if(REPORTED_EVENT_CATEGORY_ID is not null, 1, 0)) non_null from reported_event_ctgy_grp group by 1, 2 union all 
select 'reported_event_ctgy_grp' tbl, 'ARM_GROUP_ID' col, count(*) total, sum(if(ARM_GROUP_ID is not null, 1, 0)) non_null from reported_event_ctgy_grp group by 1, 2 union all 
select 'reported_event_ctgy_grp' tbl, 'SUBJECTS_AFFECTED' col, count(*) total, sum(if(SUBJECTS_AFFECTED is not null, 1, 0)) non_null from reported_event_ctgy_grp group by 1, 2 union all 
select 'reported_event_ctgy_grp' tbl, 'SUBJECTS_AT_RISK' col, count(*) total, sum(if(SUBJECTS_AT_RISK is not null, 1, 0)) non_null from reported_event_ctgy_grp group by 1, 2 union all 
select 'reported_event_ctgy_grp' tbl, 'EVENTS' col, count(*) total, sum(if(EVENTS is not null, 1, 0)) non_null from reported_event_ctgy_grp group by 1, 2 union all 
select 'reported_events' tbl, 'REPORTED_EVENT_ID' col, count(*) total, sum(if(REPORTED_EVENT_ID is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'reported_events' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'reported_events' tbl, 'EVENT_TYPE' col, count(*) total, sum(if(EVENT_TYPE is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'reported_events' tbl, 'TIME_FRAME' col, count(*) total, sum(if(TIME_FRAME is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'reported_events' tbl, 'DESCRIPTION' col, count(*) total, sum(if(DESCRIPTION is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'reported_events' tbl, 'FREQUENCY_THRESHOLD' col, count(*) total, sum(if(FREQUENCY_THRESHOLD is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'reported_events' tbl, 'DEFAULT_VOCAB' col, count(*) total, sum(if(DEFAULT_VOCAB is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'reported_events' tbl, 'DEFAULT_ASSESSMENT' col, count(*) total, sum(if(DEFAULT_ASSESSMENT is not null, 1, 0)) non_null from reported_events group by 1, 2 union all 
select 'responsible_parties' tbl, 'RESPONSIBLE_PARTY_ID' col, count(*) total, sum(if(RESPONSIBLE_PARTY_ID is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'responsible_parties' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'responsible_parties' tbl, 'NAME_TITLE' col, count(*) total, sum(if(NAME_TITLE is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'responsible_parties' tbl, 'ORGANIZATION' col, count(*) total, sum(if(ORGANIZATION is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'responsible_parties' tbl, 'RESPONSIBLE_PARTY_TYPE' col, count(*) total, sum(if(RESPONSIBLE_PARTY_TYPE is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'responsible_parties' tbl, 'INVESTIGATOR_AFFILIATION' col, count(*) total, sum(if(INVESTIGATOR_AFFILIATION is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'responsible_parties' tbl, 'INVESTIGATOR_FULL_NAME' col, count(*) total, sum(if(INVESTIGATOR_FULL_NAME is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'responsible_parties' tbl, 'INVESTIGATOR_TITLE' col, count(*) total, sum(if(INVESTIGATOR_TITLE is not null, 1, 0)) non_null from responsible_parties group by 1, 2 union all 
select 'results_baseline' tbl, 'RSLTS_BASELINE_ID' col, count(*) total, sum(if(RSLTS_BASELINE_ID is not null, 1, 0)) non_null from results_baseline group by 1, 2 union all 
select 'results_baseline' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from results_baseline group by 1, 2 union all 
select 'results_baseline' tbl, 'POPULATION' col, count(*) total, sum(if(POPULATION is not null, 1, 0)) non_null from results_baseline group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'BASELINE_MEASURE_CATGY_ID' col, count(*) total, sum(if(BASELINE_MEASURE_CATGY_ID is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'BASELINE_ID' col, count(*) total, sum(if(BASELINE_ID is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'CATEGORY_TITLE' col, count(*) total, sum(if(CATEGORY_TITLE is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'ARM_GROUP_ID' col, count(*) total, sum(if(ARM_GROUP_ID is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'BASELINE_VALUE' col, count(*) total, sum(if(BASELINE_VALUE is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'SPREAD' col, count(*) total, sum(if(SPREAD is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'LOWER_LIMIT' col, count(*) total, sum(if(LOWER_LIMIT is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measure_catgy' tbl, 'UPPER_LIMIT' col, count(*) total, sum(if(UPPER_LIMIT is not null, 1, 0)) non_null from results_baseline_measure_catgy group by 1, 2 union all 
select 'results_baseline_measures' tbl, 'BASELINE_ID' col, count(*) total, sum(if(BASELINE_ID is not null, 1, 0)) non_null from results_baseline_measures group by 1, 2 union all 
select 'results_baseline_measures' tbl, 'RSLTS_BASELINE_ID' col, count(*) total, sum(if(RSLTS_BASELINE_ID is not null, 1, 0)) non_null from results_baseline_measures group by 1, 2 union all 
select 'results_baseline_measures' tbl, 'BASELINE_MEASURE_TITLE' col, count(*) total, sum(if(BASELINE_MEASURE_TITLE is not null, 1, 0)) non_null from results_baseline_measures group by 1, 2 union all 
select 'results_baseline_measures' tbl, 'DESCRIPTION' col, count(*) total, sum(if(DESCRIPTION is not null, 1, 0)) non_null from results_baseline_measures group by 1, 2 union all 
select 'results_baseline_measures' tbl, 'UNITS_OF_MEASURE' col, count(*) total, sum(if(UNITS_OF_MEASURE is not null, 1, 0)) non_null from results_baseline_measures group by 1, 2 union all 
select 'results_baseline_measures' tbl, 'MEASURE_TYPE' col, count(*) total, sum(if(MEASURE_TYPE is not null, 1, 0)) non_null from results_baseline_measures group by 1, 2 union all 
select 'results_baseline_measures' tbl, 'DISPERSION' col, count(*) total, sum(if(DISPERSION is not null, 1, 0)) non_null from results_baseline_measures group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'RESULTS_OUTCOME_ANALYSIS_ID' col, count(*) total, sum(if(RESULTS_OUTCOME_ANALYSIS_ID is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'OUTCOME_ID' col, count(*) total, sum(if(OUTCOME_ID is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'PARAM_TYPE' col, count(*) total, sum(if(PARAM_TYPE is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'DISPERSION_TYPE' col, count(*) total, sum(if(DISPERSION_TYPE is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'CI_PERCENT' col, count(*) total, sum(if(CI_PERCENT is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'CI_LOWER_LIMIT' col, count(*) total, sum(if(CI_LOWER_LIMIT is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'CI_UPPER_LIMIT' col, count(*) total, sum(if(CI_UPPER_LIMIT is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'GROUPS_DESC' col, count(*) total, sum(if(GROUPS_DESC is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'NON_INFERIORITY' col, count(*) total, sum(if(NON_INFERIORITY is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'NON_INFERIORITY_DESC' col, count(*) total, sum(if(NON_INFERIORITY_DESC is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'P_VALUE' col, count(*) total, sum(if(P_VALUE is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'P_VALUE_DESC' col, count(*) total, sum(if(P_VALUE_DESC is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'METHOD' col, count(*) total, sum(if(METHOD is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'METHOD_DESC' col, count(*) total, sum(if(METHOD_DESC is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'PARAM_VALUE' col, count(*) total, sum(if(PARAM_VALUE is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'ESTIMATE_DESC' col, count(*) total, sum(if(ESTIMATE_DESC is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'DISPERSION_VALUE' col, count(*) total, sum(if(DISPERSION_VALUE is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'CI_N_SIDES' col, count(*) total, sum(if(CI_N_SIDES is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis' tbl, 'CI_UPPER_LIMIT_NA_COMMENT' col, count(*) total, sum(if(CI_UPPER_LIMIT_NA_COMMENT is not null, 1, 0)) non_null from results_outcome_analysis group by 1, 2 union all 
select 'results_outcome_analysis_grp' tbl, 'RESULTS_OUTCOME_ANAL_GRP_ID' col, count(*) total, sum(if(RESULTS_OUTCOME_ANAL_GRP_ID is not null, 1, 0)) non_null from results_outcome_analysis_grp group by 1, 2 union all 
select 'results_outcome_analysis_grp' tbl, 'RESULTS_OUTCOME_ANALYSIS_ID' col, count(*) total, sum(if(RESULTS_OUTCOME_ANALYSIS_ID is not null, 1, 0)) non_null from results_outcome_analysis_grp group by 1, 2 union all 
select 'results_outcome_analysis_grp' tbl, 'ARM_GROUP_ID' col, count(*) total, sum(if(ARM_GROUP_ID is not null, 1, 0)) non_null from results_outcome_analysis_grp group by 1, 2 union all 
select 'results_outcome_measure' tbl, 'OUTCOME_MEASURE_ID' col, count(*) total, sum(if(OUTCOME_MEASURE_ID is not null, 1, 0)) non_null from results_outcome_measure group by 1, 2 union all 
select 'results_outcome_measure' tbl, 'OUTCOME_ID' col, count(*) total, sum(if(OUTCOME_ID is not null, 1, 0)) non_null from results_outcome_measure group by 1, 2 union all 
select 'results_outcome_measure' tbl, 'OUTCOME_MEASURE_TITLE' col, count(*) total, sum(if(OUTCOME_MEASURE_TITLE is not null, 1, 0)) non_null from results_outcome_measure group by 1, 2 union all 
select 'results_outcome_measure' tbl, 'MEASURE_DESCRIPTION' col, count(*) total, sum(if(MEASURE_DESCRIPTION is not null, 1, 0)) non_null from results_outcome_measure group by 1, 2 union all 
select 'results_outcome_measure' tbl, 'UNIT_OF_MEASURE' col, count(*) total, sum(if(UNIT_OF_MEASURE is not null, 1, 0)) non_null from results_outcome_measure group by 1, 2 union all 
select 'results_outcome_measure' tbl, 'MEASURE_TYPE' col, count(*) total, sum(if(MEASURE_TYPE is not null, 1, 0)) non_null from results_outcome_measure group by 1, 2 union all 
select 'results_outcome_measure' tbl, 'DISPERSION' col, count(*) total, sum(if(DISPERSION is not null, 1, 0)) non_null from results_outcome_measure group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'OUTCOME_MEASURE_CATGY_ID' col, count(*) total, sum(if(OUTCOME_MEASURE_CATGY_ID is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'OUTCOME_MEASURE_ID' col, count(*) total, sum(if(OUTCOME_MEASURE_ID is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'CATEGORY_TITLE' col, count(*) total, sum(if(CATEGORY_TITLE is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'ARM_GROUP_ID' col, count(*) total, sum(if(ARM_GROUP_ID is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'OUTCOME_VALUE' col, count(*) total, sum(if(OUTCOME_VALUE is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'SPREAD' col, count(*) total, sum(if(SPREAD is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'LOWER_LIMIT' col, count(*) total, sum(if(LOWER_LIMIT is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcome_measure_ctgy' tbl, 'UPPER_LIMIT' col, count(*) total, sum(if(UPPER_LIMIT is not null, 1, 0)) non_null from results_outcome_measure_ctgy group by 1, 2 union all 
select 'results_outcomes' tbl, 'OUTCOME_ID' col, count(*) total, sum(if(OUTCOME_ID is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'OUTCOME_TYPE' col, count(*) total, sum(if(OUTCOME_TYPE is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'OUTCOME_TITLE' col, count(*) total, sum(if(OUTCOME_TITLE is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'TIME_FRAME' col, count(*) total, sum(if(TIME_FRAME is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'SAFETY_ISSUE' col, count(*) total, sum(if(SAFETY_ISSUE is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'OUTCOME_DESCRIPTION' col, count(*) total, sum(if(OUTCOME_DESCRIPTION is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'POPULATION' col, count(*) total, sum(if(POPULATION is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_outcomes' tbl, 'POSTING_DATE' col, count(*) total, sum(if(POSTING_DATE is not null, 1, 0)) non_null from results_outcomes group by 1, 2 union all 
select 'results_partflow_mlstn' tbl, 'MILESTONE_ID' col, count(*) total, sum(if(MILESTONE_ID is not null, 1, 0)) non_null from results_partflow_mlstn group by 1, 2 union all 
select 'results_partflow_mlstn' tbl, 'PARTICIPANT_FLOW_ID' col, count(*) total, sum(if(PARTICIPANT_FLOW_ID is not null, 1, 0)) non_null from results_partflow_mlstn group by 1, 2 union all 
select 'results_partflow_mlstn' tbl, 'MILESTONE_TYPE' col, count(*) total, sum(if(MILESTONE_TYPE is not null, 1, 0)) non_null from results_partflow_mlstn group by 1, 2 union all 
select 'results_partflow_mlstn' tbl, 'MILESTONE_TITLE' col, count(*) total, sum(if(MILESTONE_TITLE is not null, 1, 0)) non_null from results_partflow_mlstn group by 1, 2 union all 
select 'results_partflow_mlstn_grp' tbl, 'MILESTONE_GROUP_ID' col, count(*) total, sum(if(MILESTONE_GROUP_ID is not null, 1, 0)) non_null from results_partflow_mlstn_grp group by 1, 2 union all 
select 'results_partflow_mlstn_grp' tbl, 'MILESTONE_ID' col, count(*) total, sum(if(MILESTONE_ID is not null, 1, 0)) non_null from results_partflow_mlstn_grp group by 1, 2 union all 
select 'results_partflow_mlstn_grp' tbl, 'ARM_GROUP_ID' col, count(*) total, sum(if(ARM_GROUP_ID is not null, 1, 0)) non_null from results_partflow_mlstn_grp group by 1, 2 union all 
select 'results_partflow_mlstn_grp' tbl, 'PARTFLOW_COUNT' col, count(*) total, sum(if(PARTFLOW_COUNT is not null, 1, 0)) non_null from results_partflow_mlstn_grp group by 1, 2 union all 
select 'results_partflow_mlstn_grp' tbl, 'PARTICIPANT_DESCRIPTION' col, count(*) total, sum(if(PARTICIPANT_DESCRIPTION is not null, 1, 0)) non_null from results_partflow_mlstn_grp group by 1, 2 union all 
select 'results_partic_flows' tbl, 'PARTICIPANT_FLOW_ID' col, count(*) total, sum(if(PARTICIPANT_FLOW_ID is not null, 1, 0)) non_null from results_partic_flows group by 1, 2 union all 
select 'results_partic_flows' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from results_partic_flows group by 1, 2 union all 
select 'results_partic_flows' tbl, 'PERIOD_TITLE' col, count(*) total, sum(if(PERIOD_TITLE is not null, 1, 0)) non_null from results_partic_flows group by 1, 2 union all 
select 'results_partic_flows' tbl, 'RECRUITMENT_DETAILS' col, count(*) total, sum(if(RECRUITMENT_DETAILS is not null, 1, 0)) non_null from results_partic_flows group by 1, 2 union all 
select 'results_partic_flows' tbl, 'PRE_ASSIGNMENT_DETAILS' col, count(*) total, sum(if(PRE_ASSIGNMENT_DETAILS is not null, 1, 0)) non_null from results_partic_flows group by 1, 2 union all 
select 'results_point_of_contact' tbl, 'POINT_OF_CONTACT_ID' col, count(*) total, sum(if(POINT_OF_CONTACT_ID is not null, 1, 0)) non_null from results_point_of_contact group by 1, 2 union all 
select 'results_point_of_contact' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from results_point_of_contact group by 1, 2 union all 
select 'results_point_of_contact' tbl, 'NAME_OR_TITLE' col, count(*) total, sum(if(NAME_OR_TITLE is not null, 1, 0)) non_null from results_point_of_contact group by 1, 2 union all 
select 'results_point_of_contact' tbl, 'ORGANIZATION' col, count(*) total, sum(if(ORGANIZATION is not null, 1, 0)) non_null from results_point_of_contact group by 1, 2 union all 
select 'results_point_of_contact' tbl, 'PHONE' col, count(*) total, sum(if(PHONE is not null, 1, 0)) non_null from results_point_of_contact group by 1, 2 union all 
select 'results_point_of_contact' tbl, 'EMAIL' col, count(*) total, sum(if(EMAIL is not null, 1, 0)) non_null from results_point_of_contact group by 1, 2 union all 
select 'results_restriction_agreements' tbl, 'AGREEMENT_ID' col, count(*) total, sum(if(AGREEMENT_ID is not null, 1, 0)) non_null from results_restriction_agreements group by 1, 2 union all 
select 'results_restriction_agreements' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from results_restriction_agreements group by 1, 2 union all 
select 'results_restriction_agreements' tbl, 'PI_EMPLOYEE' col, count(*) total, sum(if(PI_EMPLOYEE is not null, 1, 0)) non_null from results_restriction_agreements group by 1, 2 union all 
select 'results_restriction_agreements' tbl, 'RESTRICTIVE_AGREEMENT' col, count(*) total, sum(if(RESTRICTIVE_AGREEMENT is not null, 1, 0)) non_null from results_restriction_agreements group by 1, 2 union all 
select 'secondary_ids' tbl, 'SEC_ID' col, count(*) total, sum(if(SEC_ID is not null, 1, 0)) non_null from secondary_ids group by 1, 2 union all 
select 'secondary_ids' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from secondary_ids group by 1, 2 union all 
select 'secondary_ids' tbl, 'SECONDARY_ID' col, count(*) total, sum(if(SECONDARY_ID is not null, 1, 0)) non_null from secondary_ids group by 1, 2 union all 
select 'sponsors' tbl, 'SPONSOR_ID' col, count(*) total, sum(if(SPONSOR_ID is not null, 1, 0)) non_null from sponsors group by 1, 2 union all 
select 'sponsors' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from sponsors group by 1, 2 union all 
select 'sponsors' tbl, 'SPONSOR_TYPE' col, count(*) total, sum(if(SPONSOR_TYPE is not null, 1, 0)) non_null from sponsors group by 1, 2 union all 
select 'sponsors' tbl, 'AGENCY' col, count(*) total, sum(if(AGENCY is not null, 1, 0)) non_null from sponsors group by 1, 2 union all 
select 'sponsors' tbl, 'AGENCY_CLASS' col, count(*) total, sum(if(AGENCY_CLASS is not null, 1, 0)) non_null from sponsors group by 1, 2 union all 
select 'study_outcome' tbl, 'OUTCOME_ID' col, count(*) total, sum(if(OUTCOME_ID is not null, 1, 0)) non_null from study_outcome group by 1, 2 union all 
select 'study_outcome' tbl, 'NCT_ID' col, count(*) total, sum(if(NCT_ID is not null, 1, 0)) non_null from study_outcome group by 1, 2 union all 
select 'study_outcome' tbl, 'STUDY_OUTCOMES_TYPE' col, count(*) total, sum(if(STUDY_OUTCOMES_TYPE is not null, 1, 0)) non_null from study_outcome group by 1, 2 union all 
select 'study_outcome' tbl, 'MEASURE' col, count(*) total, sum(if(MEASURE is not null, 1, 0)) non_null from study_outcome group by 1, 2 union all 
select 'study_outcome' tbl, 'SAFETY_ISSUE' col, count(*) total, sum(if(SAFETY_ISSUE is not null, 1, 0)) non_null from study_outcome group by 1, 2 union all 
select 'study_outcome' tbl, 'TIME_FRAME' col, count(*) total, sum(if(TIME_FRAME is not null, 1, 0)) non_null from study_outcome group by 1, 2 union all 
select 'study_outcome' tbl, 'DESCRIPTION' col, count(*) total, sum(if(DESCRIPTION is not null, 1, 0)) non_null from study_outcome group by 1, 2;