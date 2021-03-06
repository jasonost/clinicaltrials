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

DROP TABLE IF EXISTS ratings_dates_stars;
CREATE TABLE ratings_dates_stars AS
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
CREATE UNIQUE INDEX ratings_dates_stars_nct_id_idx on ratings_dates_stars(nct_id);

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

DROP TABLE IF EXISTS ratings_mesh_stars;
CREATE TABLE ratings_mesh_stars AS
SELECT
  nct_id,
  1 +
  (least(4,cond_terms) * 0.5) +
  (least(2,intervention_terms)) score
FROM ratings_mesh;
CREATE UNIQUE INDEX ratings_mesh_stars_nct_id_idx on ratings_mesh_stars(nct_id);

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
  sum(if(f.facility_id is not null,1,0)) total_sites,
  max(if(overall_status = 'Recruiting',1,0)) recruiting_trial,
  max(if(status = 'Recruiting',1,0)) recruiting_site,
  sum(if(length(country) > 0,1,0)) has_country,
  sum(if(length(city) > 0,1,0)) has_city,
  sum(if(country = 'United States',1,0)) is_us,
  sum(if(country = 'United States' and length(zip) > 0,1,0)) has_us_zip,
  sum(if((lower(facility_name) rlike '(investigat[a-z]+|re[search]+|clinical|study|trial|various|multiple|recruit[ing]*|undisclosed|community) site'
           or lower(facility_name) rlike '^site'
           or lower(facility_name) rlike 'sites? (# *)?[0-9]+'
           or lower(facility_name) rlike '[0-9]+ site'
           or (facility_name like '%information%' and facility_name like '%for %')
           or length(facility_name) <= 1 
           or facility_name rlike '^[[:digit:][:punct:][:blank:]]+$'
           or (length(facility_name) - 
               length(regex_replace(cast(facility_name as CHAR character set ascii),'[[:digit:][:punct:]]',''))) / 
              length(facility_name) > 0.5)
          and facility_name not like '%universit%',1,0)) generic_site_name,
  sum(if(investigator_id is not null,1,0)) total_investigators,
  sum(if(length(name_degree) - replace(name_degree,' ','') > 0,1,0)) ok_investigator_name
FROM 
  clinical_study s
 LEFT JOIN
  facilities f using (nct_id)
 LEFT JOIN
  investigators i using (facility_id)
GROUP BY 1;

DROP TABLE IF EXISTS ratings_sites_stars;
CREATE TABLE ratings_sites_stars AS
SELECT
  nct_id,
  1 + 
  (round((case when total_sites > 0 then
    (has_country / total_sites * 1.5) +
    (has_city / total_sites * 1.5) -
    (generic_site_name / total_sites * 1.5) -
    ((is_us - has_us_zip) / total_sites) -
    if(recruiting_trial != recruiting_site,0.5,0) +
    case when total_investigators > 0 then
      (ok_investigator_name / total_investigators) - 
      ((1 - least(total_investigators / total_sites,1)) * 0.5)
      else 0 end
    else 0 end) * 2) / 2) score
FROM ratings_sites;
CREATE UNIQUE INDEX ratings_sites_stars_nct_id_idx on ratings_sites_stars(nct_id);

/*
--testing
SELECT
  round(score*2,0)/2 score,
  count(*) total
FROM ratings_sites_stars
GROUP BY 1;

SELECT
  avg(score)
FROM ratings_sites_stars;
*/

/*
SELECT
  a.score dates,
  b.score mesh,
  round(c.score*2,0)/2 sites,
  count(*) total
FROM ratings_dates_stars a  
join ratings_mesh_stars b using (nct_id)
join ratings_sites_stars c using (nct_id)
GROUP BY 1,2,3;
*/

-- CRITERIA

CREATE OR REPLACE VIEW ratings_criteria AS
SELECT 
  nct_id,
  max(case when display_type = 'I' then 1 else 0 end) any_inclusion,
  max(case when display_type = 'E' then 1 else 0 end) any_exclusion,
  case when max(case when display_type = 'I' and criteria_text like '% not %' then 1 else 0 end) = 0 then 1 else 0 end inclusion_not,
  case when sum(case when display_type != 'H' then 1 else 0 end) >= 30 then 0 else 1 end more_than_30
FROM criteria_text
GROUP BY 1;

/*
--testing
SELECT
  count(*) total,
  sum(any_inclusion) any_inclusion,
  sum(any_exclusion) any_exclusion,
  sum(inclusion_not) inclusion_not,
  sum(more_than_30) more_than_30
FROM ratings_criteria;
*/

DROP TABLE IF EXISTS ratings_criteria_stars;
CREATE TABLE ratings_criteria_stars AS
SELECT 
  nct_id,
  1 + 
  any_inclusion +
  any_exclusion +
  inclusion_not +
  more_than_30 score
FROM ratings_criteria;
CREATE UNIQUE INDEX ratings_criteria_stars_nct_id_idx on ratings_criteria_stars(nct_id);

-- COMBINE ALL IN A TRIAL TABLE
DROP TABLE IF EXISTS trial_ratings;
CREATE TABLE trial_ratings AS
SELECT 
  d.nct_id,
  d.score rating_dates,
  m.score rating_mesh,
  s.score rating_sites,
  e.score rating_desc,
  c.score rating_criteria
FROM 
  ratings_dates_stars d
 JOIN
  ratings_mesh_stars m ON d.nct_id=m.nct_id
 JOIN
  ratings_sites_stars s ON d.nct_id=s.nct_id
 JOIN
  ratings_description_stars e ON d.nct_id=e.nct_id
 JOIN
  ratings_criteria_stars c ON d.nct_id=c.nct_id;
CREATE UNIQUE INDEX trial_ratings_nct_id_idx on trial_ratings(nct_id);


-- COMBINE ALL IN AN INSTITUTION TABLE
DROP TABLE IF EXISTS institution_ratings;
CREATE TABLE institution_ratings AS
SELECT 
  i.institution_id,
  round(avg(d.score) * 2) / 2 rating_dates,
  round(avg(m.score) * 2) / 2 rating_mesh,
  round(avg(s.score) * 2) / 2 rating_sites,
  round(avg(e.score) * 2) / 2 rating_desc,
  round(avg(c.score) * 2) / 2 rating_criteria
FROM 
  institution_lookup i
 JOIN
  ratings_dates_stars d ON i.nct_id=d.nct_id
 JOIN
  ratings_mesh_stars m ON i.nct_id=m.nct_id
 JOIN
  ratings_sites_stars s ON i.nct_id=s.nct_id
 JOIN
  ratings_description_stars e ON i.nct_id=e.nct_id
 JOIN
  ratings_criteria_stars c ON i.nct_id=c.nct_id
GROUP BY 1;
CREATE UNIQUE INDEX institution_ratings_institution_id_idx on institution_ratings(institution_id);




