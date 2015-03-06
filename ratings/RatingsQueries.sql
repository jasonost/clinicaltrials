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


