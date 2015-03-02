DROP TABLE IF EXISTS condition_mti;

CREATE TABLE condition_mti (
    NCT_ID VARCHAR(50), 
    TERM VARCHAR(200), 
    CUI VARCHAR(10), 
    SCORE INT, 
    TYPE VARCHAR(10), 
    MISC VARCHAR(200),
    LOCATION VARCHAR(10),
    PATHS VARCHAR(10),
    MESH_IDS VARCHAR(300)
) DEFAULT CHARACTER SET=utf8;

LOAD DATA LOCAL INFILE '/groups/clinicaltrials/clinicaltrials/data/MTIdescriptions_output.txt' INTO TABLE condition_mti COLUMNS TERMINATED BY '|' LINES TERMINATED BY '\n';

CREATE INDEX condition_mti_nct_id ON condition_mti (NCT_ID);