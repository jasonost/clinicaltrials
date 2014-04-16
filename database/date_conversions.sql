alter table clinical_study
add (
  START_DATE_DT DATE,
  COMPLETION_DATE_DT DATE,
  PRIMARY_COMPLETION_DATE_DT DATE,
  VERIFICATION_DATE_DT DATE,
  LASTCHANGED_DATE_DT DATE,
  FIRSTRECEIVED_DATE_DT DATE
);

update clinical_study
set start_date_dt = case when start_date != '' then str_to_date(concat('1 ',start_date), '%d %M %Y') else null end;
update clinical_study
set completion_date_dt = case when completion_date != '' then str_to_date(concat('1 ',completion_date), '%d %M %Y') else null end;
update clinical_study
set primary_completion_date_dt = case when primary_completion_date != '' then str_to_date(concat('1 ',primary_completion_date), '%d %M %Y') else null end;
update clinical_study
set verification_date_dt = case when verification_date != '' then str_to_date(concat('1 ',verification_date), '%d %M %Y') else null end;
update clinical_study
set lastchanged_date_dt = case when lastchanged_date != '' then str_to_date(lastchanged_date, '%M %d, %Y') else null end;
update clinical_study
set firstreceived_date_dt = case when firstreceived_date != '' then str_to_date(firstreceived_date, '%M %d, %Y') else null end;
