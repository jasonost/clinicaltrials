create table hiv_studies as
select distinct nct_id
from conditions 
where 
 ((condition_name regexp 'HIV' and condition_name not regexp '[[:alpha:]]HIV|HIV[[:alpha:]]') or
  (condition_name regexp 'AIDS' and condition_name not regexp '[[:alpha:]]AIDS|AIDS[[:alpha:]]')) and
 condition_name not like '%Decision Aids%' and
 condition_name not like '%Photographic Aids%' and
 condition_name not like '%Nursing Aids%' and
 condition_name not like '%Hearing Aids%'
;
