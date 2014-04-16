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


create table hiv_studies_mesh as
select distinct nct_id
from condition_browse 
where 
 ((mesh_term regexp 'HIV' and mesh_term not regexp '[[:alpha:]]HIV|HIV[[:alpha:]]') or
  (mesh_term regexp 'AIDS' and mesh_term not regexp '[[:alpha:]]AIDS|AIDS[[:alpha:]]')) and
 mesh_term not like '%Decision Aids%' and
 mesh_term not like '%Photographic Aids%' and
 mesh_term not like '%Nursing Aids%' and
 mesh_term not like '%Hearing Aids%'
;

insert into hiv_studies
select a.nct_id
from hiv_studies_mesh a left join hiv_studies b 
  on a.nct_id=b.nct_id
where b.nct_id is null;
