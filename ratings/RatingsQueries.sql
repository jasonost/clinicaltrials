-- get list of columns that have preponderance of values with four digits
select concat('select ''', 
              table_name, 
              ''' tbl, ''', 
              column_name, 
              ''' col, count(*) total, sum(case when ',
              column_name,
              ' rlike ''[0-9]{4}'' then 1 else 0 end) four_digits from ',
              table_name,
              ' group by 1, 2 union all')
from information_schema.columns
where table_schema = 'clinicaltrials';

-- clinical_study dates
select START_DATE,
  count(*) total
from clinical_study
group by 1

select COMPLETION_DATE, COMPLETION_DATE_TYPE,
  count(*) total
from clinical_study
group by 1, 2;

select PRIMARY_COMPLETION_DATE, PRIMARY_COMPLETION_DATE_TYPE,
  count(*) total
from clinical_study
group by 1, 2;


-- MeSH condition and intervention terms
select conds, count(*) trials from
(select s.nct_id, count(distinct mesh_condition_id) conds
 from clinical_study s
 left join condition_browse m using (nct_id)
 group by 1) a
group by 1;

select interventions, count(*) trials from
(select s.nct_id, count(distinct mesh_intervention_id) interventions
 from clinical_study s
 left join intervention_browse m using (nct_id)
 group by 1) a
group by 1;


-- site information
select facility_name, count(*)
from facilities
where facility_name like '%site%' and not
  (lower(facility_name) rlike '(investigat[a-z]+|re[search]+|clinical|study|trial|various|multiple|recruit[ing]*|undisclosed|community) site'
   or lower(facility_name) rlike '^site'
   or lower(facility_name) rlike 'sites? (# *)?[0-9]+'
   or lower(facility_name) rlike '[0-9]+ site'
   or (facility_name like '%information%' and facility_name like '%for %'))
  and facility_name not like '%universit%'
group by 1 
order by 2 desc;

select 
  count(*) total,
  sum(case when length(facility_name) > 0 then 1 else 0 end) facility_name,
  sum(case when length(city) > 0 then 1 else 0 end) city,
  sum(case when length(state) > 0 then 1 else 0 end) state,
  sum(case when length(zip) > 0 then 1 else 0 end) zip,
  sum(case when length(country) > 0 then 1 else 0 end) country,
  sum(case when country = 'United States' then 1 else 0 end) us,
  sum(case when country = 'United States' and length(city) > 0 then 1 else 0 end) us_city,
  sum(case when country = 'United States' and length(state) > 0 then 1 else 0 end) us_state,
  sum(case when country = 'United States' and length(zip) > 0 then 1 else 0 end) us_zip
from facilities;

select overall_status, status, count(*) 
from clinical_study join facilities using (nct_id) 
group by 1, 2;

select facility_name, count(*) 
from facilities 
where length(facility_name) between 1 and 5 
  and not facility_name rlike '^[[:digit:][:punct:][:blank:]]+$' 
group by 1 
order by 2 desc;



