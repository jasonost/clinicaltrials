SELECT 
	cs.nct_id, cs.start_date, cs.completion_date, cs.completion_date_type, cs.firstreceived_date, 
	cs.brief_title, cs.overall_status, cs.phase, cs.study_type, cs.number_of_arms, cs.number_of_groups, cs.enrollment, cs.is_fda_regulated, 
	i.INTERVENTION_TYPE,
	s.agency, s.agency_class, s.any_industry, s.num_sponsors
FROM clinical_study cs
JOIN hiv_studies h ON cs.nct_id = h.nct_id
JOIN interventions_simple_mod i on i.nct_id = h.nct_id
JOIN sponsors_mod s ON s.nct_id = h.nct_id;


