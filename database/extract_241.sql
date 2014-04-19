SELECT 
	cs.*, 
	s.agency, s.agency_class, 
	i.INTERVENTION_TYPE
FROM clinical_study cs
JOIN hiv_studies h ON cs.nct_id = h.nct_id
JOIN sponsors s ON s.nct_id = h.nct_id
RIGHT JOIN interventions i on i.nct_id = h.nct_id
WHERE s.sponsor_type = 'Lead Sponsor';


select nct_id, intervention_type, count(*) from interventions
group by nct_id;

select count(*) from interventions;

select distinct i.nct_id, i.intervention_type 
from interventions i
JOIN clinical_study cs on i.nct_id = cs.nct_id
WHERE cs.study_type = "Interventional";


select * from intervention_arm_groups limit 1000;

select distinct study_type from clinical_study;

select