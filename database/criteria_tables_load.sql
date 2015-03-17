LOAD DATA LOCAL INFILE '/groups/clinicaltrials/clinicaltrials/data/criteria_text.txt' INTO TABLE criteria_text CHARACTER SET UTF8 COLUMNS TERMINATED BY '\t' LINES TERMINATED BY '\n';
LOAD DATA LOCAL INFILE '/groups/clinicaltrials/clinicaltrials/data/criteria_tagged.txt' INTO TABLE criteria_tagged CHARACTER SET UTF8 COLUMNS TERMINATED BY '\t' LINES TERMINATED BY '\n';
