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
    case when cs.study_type = 'Interventional' then 1 else 0 end type_interventional,
    case when cs.study_type like '%Observational%' then 1 else 0 end type_observational,
    cs.number_of_arms,
    cs.number_of_groups,
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
    so.safety_issue,
    case when i.intervention_type = 'Behavioral' then 1 else 0 end intervention_behavioral,
    case when i.intervention_type = 'Procedure' then 1 else 0 end intervention_procedure,
    case when i.intervention_type = 'Device' then 1 else 0 end intervention_device,
    case when i.intervention_type = 'Multiple' then 1 else 0 end intervention_multiple,
    case when i.intervention_type = 'Drug' then 1 else 0 end intervention_drug,
    c.total_conditions,
    c.total_conditions_main,
    c.total_conditions_top,
    lc.location_africa,
    lc.location_europe,
    lc.location_asia,
    lc.location_latinamerica,
    lc.location_oceania,
    lc.location_northamerica
from clinical_study cs
    left join overall_officials_mod oo on cs.nct_id=oo.nct_id
    left join sponsors_mod s on cs.nct_id=s.nct_id
    left join facilities_mod f on cs.nct_id=f.nct_id
    left join design_mod d on cs.nct_id=d.nct_id
    left join study_outcome_mod so on cs.nct_id=so.nct_id
    left join interventions_complex_mod i on cs.nct_id=i.nct_id
    left join conditions_mod c on cs.nct_id=c.nct_id
    left join location_continents_mod lc on cs.nct_id=lc.nct_id
where cs.overall_status in ('Approved for marketing','Completed','Terminated','Withdrawn','Suspended');

