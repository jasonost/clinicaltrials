select num_terms, study_year, count(*) from
(select case when length(completion_date) > 0 then right(completion_date, 4)
           when overall_status in ('Not yet recruiting','Active, not recruiting','Recruiting','Enrolling by invitation') then 'Ongoing'
           else 'Done' end study_year, nct_id,
  count(distinct mesh_condition_id) num_terms
 from clinical_study left join condition_browse using (nct_id)
 group by 1, 2
) a
group by 1,2;


