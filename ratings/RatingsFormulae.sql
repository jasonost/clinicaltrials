-- DATES

CREATE OR REPLACE VIEW ratings_dates AS
SELECT 
  nct_id,
  if(length(start_date) > 0,1,0) has_start_date,
  if(length(completion_date) > 0,1,0) has_completion_date,
  if(length(primary_completion_date) > 0,1,0) has_primary_completion_date,
  if(length(completion_date_type) > 0,1,0) has_completion_date_type,
  if(length(primary_completion_date_type) > 0,1,0) has_primary_completion_date_type,
  if(length(start_date) > 0 and substr(start_date,instr(start_date,' ')+1) > '2090',1,0) bad_start_date,
  if(length(completion_date) > 0 and substr(completion_date,instr(completion_date,' ')+1) > '2090',1,0) bad_completion_date,
  if(length(primary_completion_date) > 0 and substr(primary_completion_date,instr(primary_completion_date,' ')+1) > '2090',1,0) bad_primary_completion_date,
  if(length(completion_date) > 0 and substr(completion_date,instr(completion_date,' ')+1) < '2014' and completion_date_type = 'Anticipated',1,0) old_completion_date,
  if(length(primary_completion_date) > 0 and substr(primary_completion_date,instr(primary_completion_date,' ')+1) < '2014' and primary_completion_date_type = 'Anticipated',1,0) old_primary_completion_date
FROM clinical_study;

/*
--testing
SELECT
  count(*) total,
  sum(has_start_date) has_start_date,
  sum(has_completion_date) has_completion_date,
  sum(has_primary_completion_date) has_primary_completion_date,
  sum(bad_start_date) bad_start_date,
  sum(bad_completion_date) bad_completion_date,
  sum(bad_primary_completion_date) bad_primary_completion_date,
  sum(old_completion_date) old_completion_date,
  sum(old_primary_completion_date) old_primary_completion_date,
  sum(has_completion_date_type) has_completion_date_type,
  sum(has_primary_completion_date_type) has_primary_completion_date_type
FROM ratings_dates;
*/

CREATE OR REPLACE VIEW ratings_dates_stars AS
SELECT
  nct_id,
  1 +
  (has_start_date * 1.5) +
  (greatest(has_completion_date,has_primary_completion_date) * 1.5) +
  (greatest(if(has_completion_date,has_completion_date_type,0),if(has_primary_completion_date,has_primary_completion_date_type,0))) -
  (bad_start_date) -
  (bad_completion_date) - 
  (bad_primary_completion_date) -
  (old_completion_date * 0.5) - 
  (old_primary_completion_date * 0.5) score
FROM ratings_dates;

/*
--testing
SELECT
  score,
  count(*) total
FROM ratings_dates_stars
GROUP BY 1;

SELECT
  avg(score)
FROM ratings_dates_stars;
*/



-- MESH TERMS

CREATE OR REPLACE VIEW ratings_mesh AS
SELECT
  s.nct_id,
  count(distinct mesh_condition_id) cond_terms,
  count(distinct mesh_intervention_id) intervention_terms
FROM
  clinical_study s
 LEFT JOIN
  condition_browse c using (nct_id)
 LEFT JOIN
  intervention_browse i using (nct_id)
GROUP BY 1;

CREATE OR REPLACE VIEW ratings_mesh_stars AS
SELECT
  nct_id,
  1 +
  (least(4,cond_terms) * 0.5) +
  (least(2,intervention_terms)) score
FROM ratings_mesh;

/*
--testing
SELECT
  score,
  count(*) total
FROM ratings_mesh_stars
GROUP BY 1;

SELECT
  avg(score)
FROM ratings_mesh_stars;
*/



-- RESEARCH SITES

CREATE OR REPLACE VIEW ratings_sites AS
SELECT
  s.nct_id,
  facility_id site,
  if(overall_status = 'Recruiting',1,0) recruiting_trial,
  if(status = 'Recruiting',1,0) recruiting_site,
  if(length(country) > 0,1,0) has_country,
  if(length(city) > 0,1,0) has_city,
  if(country = 'United States',1,0) is_us,
  if(country = 'United States' and length(zip) > 0,1,0) has_us_zip,
  if((lower(facility_name) rlike '(investigat[a-z]+|re[search]+|clinical|study|trial|various|multiple|recruit[ing]*|undisclosed|community) site'
       or lower(facility_name) rlike '^site'
       or lower(facility_name) rlike 'sites? (# *)?[0-9]+'
       or lower(facility_name) rlike '[0-9]+ site'
       or (facility_name like '%information%' and facility_name like '%for %'))
      and facility_name not like '%universit%',1,0) generic_site,
  if(length(facility_name) <= 1 or facility_name rlike '^[[:digit:][:punct:][:blank:]]+$',1,0) facility_name_bad,
  if((length(facility_name) - length(regex_replace(cast(facility_name as CHAR character set ascii),'[[:digit:][:punct:]]',''))) / length(facility_name) > 0.5,1,0) facility_name_numbers
FROM 
  clinical_study s
 LEFT JOIN
  facilities f using (nct_id);

CREATE OR REPLACE VIEW ratings_sites_stars_raw AS
SELECT
  nct_id,
  count(distinct site) total_sites,
  max(recruiting_trial) recruiting_trial,
  max(recruiting_site) recruiting_site
FROM ratings_sites;

CREATE OR REPLACE VIEW ratings_sites_stars AS
SELECT
  nct_id
FROM ratings_sites_stars_raw

/*
--testing
SELECT
  score,
  count(*) total
FROM ratings_sites_stars
GROUP BY 1;

SELECT
  avg(score)
FROM ratings_sites_stars;
*/



