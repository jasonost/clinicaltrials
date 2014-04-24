# HIV ONLY STUDIES
SELECT 
	cs.nct_id, cs.start_date, cs.completion_date, cs.completion_date_type, cs.firstreceived_date, 
	cs.brief_title, cs.overall_status, cs.phase, cs.study_type, cs.number_of_arms, cs.number_of_groups, cs.enrollment, cs.is_fda_regulated, 
	i.INTERVENTION_TYPE,
	s.agency, s.agency_class, s.any_industry, s.num_sponsors,
	l.country, l.country_class, l.num_countries,
	d.intervention_model, d.masking, d.primary_purpose, d.observational_model, d.time_perspective, d.allocation, d.endpoint
FROM clinical_study cs
JOIN hiv_studies h ON cs.nct_id = h.nct_id
JOIN interventions_simple_mod i on i.nct_id = h.nct_id
JOIN sponsors_mod s ON s.nct_id = h.nct_id
JOIN location_mod l ON l.nct_id = h.nct_id
JOIN design_mod d on d.nct_id = h.nct_id;

# ALL INTERVENTIONAL STUDIES
SELECT 
	cs.nct_id, cs.start_date, cs.completion_date, cs.completion_date_type, cs.firstreceived_date, 
	cs.brief_title, cs.overall_status, cs.phase, cs.number_of_arms, cs.number_of_groups, cs.enrollment, cs.is_fda_regulated, 
	i.INTERVENTION_TYPE,
	s.agency, s.agency_class, s.any_industry, s.num_sponsors,
	l.country, l.country_class, l.num_countries,
	d.intervention_model, d.masking, d.primary_purpose, d.observational_model, d.time_perspective, d.allocation, d.endpoint
FROM clinical_study cs
JOIN interventions_simple_mod i on i.nct_id = cs.nct_id
JOIN sponsors_mod s ON s.nct_id = cs.nct_id
JOIN location_mod l ON l.nct_id = cs.nct_id
JOIN design_mod d on d.nct_id = cs.nct_id
WHERE cs.study_type = 'Interventional';



