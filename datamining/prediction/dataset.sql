create or replace view datamining_table as
select cs.nct_id,
    case when cs.overall_status in ('Approved for marketing','Completed') then 1
         when cs.overall_status in ('Terminated','Withdrawn','Suspended') then 0 end target,
    case when cs.completion_date != '' and cs.start_date != '' then year(cs.completion_date_dt) - year(cs.start_date_dt) end study_length_yrs,
    case when cs.phase like '%0%' then 1 else 0 end phase_0,
    case when cs.phase like '%1%' then 1 else 0 end phase_1,
    case when cs.phase like '%2%' then 1 else 0 end phase_2,
    case when cs.phase like '%3%' then 1 else 0 end phase_3,
    case when cs.phase like '%4%' then 1 else 0 end phase_4,
    case when cs.study_type like '%Observational%' then 1 else 0 end type_observational,
    ifnull(cs.number_of_arms,0) number_of_arms,
    ifnull(cs.number_of_groups,0) number_of_groups,
    case when cs.gender = 'Female' then 1 else 0 end gender_female,
    case when cs.gender = 'Male' then 1 else 0 end gender_male,
    case when cs.minimum_age = 'N/A' then null
         when substr(cs.minimum_age,instr(cs.minimum_age,' ')+1) = 'Days' then substr(cs.minimum_age,1,instr(cs.minimum_age,' ')-1) * 1
         when substr(cs.minimum_age,instr(cs.minimum_age,' ')+1) = 'Weeks' then substr(cs.minimum_age,1,instr(cs.minimum_age,' ')-1) * (365.25 / 52)
         when substr(cs.minimum_age,instr(cs.minimum_age,' ')+1) in ('Month','Months') then substr(cs.minimum_age,1,instr(cs.minimum_age,' ')-1) * (365.25 / 12)
         when substr(cs.minimum_age,instr(cs.minimum_age,' ')+1) in ('Year','Years') then substr(cs.minimum_age,1,instr(cs.minimum_age,' ')-1) * 365.25
        end minimum_age_days,
    case when cs.maximum_age = 'N/A' then null
         when substr(cs.maximum_age,instr(cs.maximum_age,' ')+1) = 'Days' then substr(cs.maximum_age,1,instr(cs.maximum_age,' ')-1) * 1
         when substr(cs.maximum_age,instr(cs.maximum_age,' ')+1) = 'Weeks' then substr(cs.maximum_age,1,instr(cs.maximum_age,' ')-1) * (365.25 / 52)
         when substr(cs.maximum_age,instr(cs.maximum_age,' ')+1) in ('Month','Months') then substr(cs.maximum_age,1,instr(cs.maximum_age,' ')-1) * (365.25 / 12)
         when substr(cs.maximum_age,instr(cs.maximum_age,' ')+1) in ('Year','Years') then substr(cs.maximum_age,1,instr(cs.maximum_age,' ')-1) * 365.25
         else 1
        end maximum_age_days,
    case when cs.healthy_volunteers = 'Accepts Healthy Volunteers' then 1 else 0 end healthy_volunteers,
    case when cs.is_fda_regulated = 'Yes' then 1 else 0 end is_fda_regulated,
    oo.total_officials,
    case when s.agency_class = 'Industry' then 1 else 0 end sponsor_lead_industry,
    case when s.agency_class = 'US Federal' then 1 else 0 end sponsor_lead_govt,
    case when s.any_industry = 'Y' then 1 else 0 end sponsor_any_industry,
    s.num_sponsors total_sponsors,
    f.total_facilities,
    f.facilities_countries,
    f.facilities_states,
    case when d.intervention_model = 'Crossover Assignment' then 1 else 0 end design_intervention_crossover,
    case when d.intervention_model = 'Parallel Assignment' then 1 else 0 end design_intervention_parallel,
    case when d.intervention_model = 'Single Group Assignment' then 1 else 0 end design_intervention_single,
    case when d.masking in ('Double Blind','Double-Blind') then 1 else 0 end design_masking_doubleblind,
    case when d.masking = 'Open Label' then 1 else 0 end design_masking_openlabel,
    case when d.masking = 'Single Blind' then 1 else 0 end design_masking_singleblind,
    case when d.primary_purpose = 'Basic Science' then 1 else 0 end design_purpose_science,
    case when d.primary_purpose in ('Diagnostic','Screening') then 1 else 0 end design_purpose_diagnostic,
    case when d.primary_purpose = 'Prevention' then 1 else 0 end design_purpose_prevention,
    case when d.primary_purpose = 'Treatment' then 1 else 0 end design_purpose_treatment,
    case when d.observational_model = 'Cohort' then 1 else 0 end design_observation_cohort,
    case when d.allocation = 'Non-Randomized' then 1 else 0 end design_allocation_nonrandom,
    ifnull(so.safety_issue,0) safety_issue,
    ifnull(i.intervention_drug,0) intervention_drug,
    ifnull(i.intervention_procedure,0) intervention_procedure,
    ifnull(i.intervention_behavior,0) intervention_behavior,
    ifnull(i.intervention_device,0) intervention_device,
    ifnull(i.intervention_biological,0) intervention_biological,
    ifnull(i.intervention_supplement,0) intervention_supplement,
    c.total_conditions,
    c.total_conditions_main,
    c.total_conditions_top,
    ifnull(lc.location_africa,0) location_africa,
    ifnull(lc.location_europe,0) location_europe,
    ifnull(lc.location_asia,0) location_asia,
    ifnull(lc.location_latinamerica,0) location_latinamerica,
    ifnull(lc.location_oceania,0) location_oceania,
    ifnull(lc.location_northamerica,0) location_northamerica,
    ifnull(cc.clus_0,0) clus_0,
    ifnull(cc.clus_1,0) clus_1,
    ifnull(cc.clus_2,0) clus_2,
    ifnull(cc.clus_3,0) clus_3,
    ifnull(cc.clus_4,0) clus_4,
    ifnull(cc.clus_5,0) clus_5,
    ifnull(cc.clus_6,0) clus_6,
    ifnull(cc.clus_7,0) clus_7,
    ifnull(cc.clus_8,0) clus_8,
    ifnull(cc.clus_9,0) clus_9,
    ifnull(cc.clus_10,0) clus_10,
    ifnull(cc.clus_11,0) clus_11,
    ifnull(cc.clus_12,0) clus_12,
    ifnull(cc.clus_13,0) clus_13,
    ifnull(cc.clus_14,0) clus_14,
    ifnull(cc.clus_15,0) clus_15,
    ifnull(cc.clus_16,0) clus_16,
    ifnull(cc.clus_17,0) clus_17,
    ifnull(cc.clus_18,0) clus_18,
    ifnull(cc.clus_19,0) clus_19,
    ifnull(cc.clus_20,0) clus_20,
    ifnull(cc.clus_21,0) clus_21,
    ifnull(cc.clus_22,0) clus_22,
    ifnull(cc.clus_23,0) clus_23,
    ifnull(cc.clus_24,0) clus_24,
    ifnull(cc.clus_25,0) clus_25,
    ifnull(cc.clus_26,0) clus_26,
    ifnull(cc.clus_27,0) clus_27,
    ifnull(cc.clus_28,0) clus_28,
    ifnull(cc.clus_29,0) clus_29,
    ifnull(cc.clus_30,0) clus_30,
    ifnull(cc.clus_31,0) clus_31,
    ifnull(cc.clus_32,0) clus_32,
    ifnull(cc.clus_33,0) clus_33,
    ifnull(cc.clus_34,0) clus_34,
    ifnull(cc.clus_35,0) clus_35,
    ifnull(cc.clus_36,0) clus_36,
    ifnull(cc.clus_37,0) clus_37,
    ifnull(cc.clus_38,0) clus_38
from clinical_study cs
    left join overall_officials_mod oo on cs.nct_id=oo.nct_id
    left join sponsors_mod s on cs.nct_id=s.nct_id
    left join facilities_mod f on cs.nct_id=f.nct_id
    left join design_mod d on cs.nct_id=d.nct_id
    left join study_outcome_mod so on cs.nct_id=so.nct_id
    left join interventions_full_mod i on cs.nct_id=i.nct_id
    left join conditions_mod c on cs.nct_id=c.nct_id
    left join location_continents_mod lc on cs.nct_id=lc.nct_id
    left join conditions_clusters cc on cs.nct_id=cc.nct_id
where cs.overall_status in ('Approved for marketing','Completed','Terminated','Withdrawn','Suspended');

