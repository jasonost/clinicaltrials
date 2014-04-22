update clinical_study
set enrollment = null
where enrollment in (999,9999,99999,999999,9999999,99999999) and enrollment_type != 'Actual';

update condition_browse
set mesh_term = 'Sarcoma, Ewing'
where mesh_term = 'Sarcoma, Ewing''s';
update condition_browse
set mesh_term = 'beta-Thalassemia'
where mesh_term = 'Beta-Thalassemia';
update condition_browse
set mesh_term = 'von Willebrand Disease, Type 3'
where mesh_term = 'Von Willebrand Disease, Type 3';
update condition_browse
set mesh_term = 'von Willebrand Disease, Type 2'
where mesh_term = 'Von Willebrand Disease, Type 2';
update condition_browse
set mesh_term = 'von Willebrand Disease, Type 1'
where mesh_term = 'Von Willebrand Disease, Type 1';
update condition_browse
set mesh_term = 'Felty Syndrome'
where mesh_term = 'Felty''s Syndrome';
update condition_browse
set mesh_term = 'von Hippel-Lindau Disease'
where mesh_term = 'Von Hippel-Lindau Disease';
update condition_browse
set mesh_term = 'Retrognathia'
where mesh_term = 'Retrognathism';
update condition_browse
set mesh_term = 'Laryngopharyngeal Reflux'
where mesh_term = 'Regurgitation, Gastric';
update condition_browse
set mesh_term = 'Congenital Hyperinsulinism'
where mesh_term = 'Persistent Hyperinsulinemia Hypoglycemia of Infancy';
update condition_browse
set mesh_term = 'von Willebrand Diseases'
where mesh_term = 'Von Willebrand Diseases';
update condition_browse
set mesh_term = 'Brain Stem Neoplasms'
where mesh_term = 'Pontine Glioma';
update condition_browse
set mesh_term = 'Intellectual Disability'
where mesh_term = 'Mental Retardation';
update condition_browse
set mesh_term = 'Drug Overdose'
where mesh_term = 'Overdose';
update condition_browse
set mesh_term = 'beta-Mannosidosis'
where mesh_term = 'Beta-Mannosidosis';
update condition_browse
set mesh_term = 'alpha 1-Antitrypsin Deficiency'
where mesh_term = 'Alpha 1-Antitrypsin Deficiency';
update condition_browse
set mesh_term = 'Intervertebral Disc Displacement'
where mesh_term = 'Intervertebral Disk Displacement';
update condition_browse
set mesh_term = 'alpha-Thalassemia'
where mesh_term = 'Alpha-Thalassemia';
update condition_browse
set mesh_term = 'Mycobacterium Infections, Nontuberculous'
where mesh_term = 'Mycobacterium Infections, Atypical';
update condition_browse
set mesh_term = 'Legg-Calve-Perthes Disease'
where mesh_term = 'Legg-Perthes Disease';
update condition_browse
set mesh_term = 'Intervertebral Disc Degeneration'
where mesh_term = 'Intervertebral Disk Degeneration';
update condition_browse
set mesh_term = 'alpha-Mannosidosis'
where mesh_term = 'Alpha-Mannosidosis';
update condition_browse
set mesh_term = 'Gestational Trophoblastic Disease'
where mesh_term = 'Gestational Trophoblastic Neoplasms';