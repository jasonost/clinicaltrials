-- criteria text tables for active learning
DROP TABLE IF EXISTS criteria_concept_lookup;
DROP TABLE IF EXISTS concept_terms;
DROP TABLE IF EXISTS concept_terms_reject;
DROP TABLE IF EXISTS concept_predictors;
DROP TABLE IF EXISTS concept_predictors_reject;
DROP TABLE IF EXISTS criteria_concept;
--DROP TABLE IF EXISTS criteria_text;
--DROP TABLE IF EXISTS criteria_tagged;

CREATE TABLE criteria_text (
    CRITERIA_TEXT_ID INT, 
    PRIMARY KEY (CRITERIA_TEXT_ID), 
    NCT_ID VARCHAR(50), 
    FOREIGN KEY (NCT_ID) REFERENCES clinical_study(NCT_ID), 
    CRITERIA_TEXT TEXT, 
    DISPLAY_TYPE VARCHAR(50), 
    DISPLAY_ORDER INT
) DEFAULT CHARACTER SET=utf8;

/* after load:
alter table criteria_text add column random_select int;
UPDATE criteria_text SET random_select = FLOOR(RAND( ) *25 );
create index criteria_text_random_select_idx on criteria_text(random_select);
*/

CREATE TABLE criteria_tagged (
    CRITERIA_TEXT_ID INT,
    PRIMARY KEY (CRITERIA_TEXT_ID),
    TAGGED_TEXT TEXT,
    RANDOM_SELECT INT
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX criteria_tagged_random_select_idx ON criteria_tagged(RANDOM_SELECT);

CREATE TABLE criteria_concept (
    CONCEPT_ID CHAR(36),
    PRIMARY KEY (CONCEPT_ID),
    CONCEPT_NAME VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE concept_terms (
    TERM_ID INT AUTO_INCREMENT,
    PRIMARY KEY (TERM_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID) ON DELETE CASCADE,
    TERM VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE concept_terms_reject (
    TERM_REJECT_ID INT AUTO_INCREMENT,
    PRIMARY KEY (TERM_REJECT_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID) ON DELETE CASCADE,
    TERM VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE concept_predictors (
    PREDICTOR_ID INT AUTO_INCREMENT,
    PRIMARY KEY (PREDICTOR_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID) ON DELETE CASCADE,
    PREDICTOR VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE concept_predictors_reject (
    PREDICTOR_REJECT_ID INT AUTO_INCREMENT,
    PRIMARY KEY (PREDICTOR_REJECT_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID) ON DELETE CASCADE,
    PREDICTOR VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE criteria_concept_lookup (
    NCT_ID VARCHAR(50),
    FOREIGN KEY (NCT_ID) REFERENCES clinical_study(NCT_ID), 
    CRITERIA_TEXT_ID INT,
    FOREIGN KEY (CRITERIA_TEXT_ID) REFERENCES criteria_text(CRITERIA_TEXT_ID),
    TERM_ID INT,
    FOREIGN KEY (TERM_ID) REFERENCES concept_terms(TERM_ID) ON DELETE CASCADE,
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID) ON DELETE CASCADE,
    INVERSE INT
) DEFAULT CHARACTER SET=utf8;




-- user interface interaction tables
DROP TABLE IF EXISTS user_history_criteria;
DROP TABLE IF EXISTS user_history_mesh;
DROP TABLE IF EXISTS criteria_concept_staging;
DROP TABLE IF EXISTS mesh_assign_staging;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    USER_ID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (USER_ID),
    USER_NAME VARCHAR(30),
    FULL_NAME VARCHAR(100),
    INSTITUTION VARCHAR(200),
    EMAIL_ADDRESS VARCHAR(100),
    PASSWORD VARCHAR(50),
    ACCESS_LEVEL VARCHAR(20)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE mesh_assign_staging (
    UPDATE_ID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (UPDATE_ID),
    USER_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES users(USER_ID) ON DELETE CASCADE,
    UPDATE_TIME DATETIME,
    NCT_ID VARCHAR(50),
    CONDITION_ID INT
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE user_history_mesh (
    HISTORY_ID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (HISTORY_ID),
    USER_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES users(USER_ID) ON DELETE CASCADE,
    UPDATE_TIME DATETIME,
    NCT_ID VARCHAR(50),
    CONDITION_ID INT,
    ACCEPTED INT
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE criteria_concept_staging (
    UPDATE_ID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (UPDATE_ID),
    USER_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES users(USER_ID) ON DELETE CASCADE,
    UPDATE_TIME DATETIME,
    CONCEPT_ID CHAR(36),
    NEW_CONCEPT INT,
    UPDATE_TYPE VARCHAR(20),
    VALUE VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX criteria_concept_staging_concept_id_idx ON criteria_concept_staging(concept_id);

CREATE TABLE user_history_criteria (
    HISTORY_ID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (HISTORY_ID),
    USER_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES users(USER_ID) ON DELETE CASCADE,
    UPDATE_TIME DATETIME,
    CONCEPT_ID CHAR(36),
    NEW_CONCEPT INT,
    UPDATE_TYPE VARCHAR(20),
    VALUE VARCHAR(200),
    ACCEPTED INT
) DEFAULT CHARACTER SET=utf8;




-- condition tables for soft matches and search lookup
DROP TABLE IF EXISTS condition_lookup;
DROP TABLE IF EXISTS condition_synonym;
DROP TABLE IF EXISTS condition_description;

CREATE TABLE condition_description (
    CONDITION_ID INT,
    PRIMARY KEY(CONDITION_ID),
    MESH_TERM VARCHAR(200),
    DESCRIPTION TEXT
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX condition_description_mesh_term_idx on condition_description(MESH_TERM);

CREATE TABLE condition_lookup (
    CONDITION_ID INT,
    FOREIGN KEY (CONDITION_ID) REFERENCES condition_description(CONDITION_ID),
    NCT_ID VARCHAR(50),
    FOREIGN KEY (NCT_ID) REFERENCES clinical_study(NCT_ID),
    SOURCE VARCHAR(20),
    DISP_ORDER INT,
    SYN_FLAG TINYINT
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE condition_synonym (
    CONDITION_ID INT,
    FOREIGN KEY (CONDITION_ID) REFERENCES condition_description(CONDITION_ID),
    SYNONYM_ID INT,
    FOREIGN KEY (SYNONYM_ID) REFERENCES condition_description(CONDITION_ID)
) DEFAULT CHARACTER SET=utf8;




-- institution description and lookup tables
DROP TABLE IF EXISTS institution_lookup;
DROP TABLE IF EXISTS institution_sponsors;
DROP TABLE IF EXISTS institution_facilities;
DROP TABLE IF EXISTS institution_description;

CREATE TABLE institution_description (
    INSTITUTION_ID INT,
    PRIMARY KEY(INSTITUTION_ID),
    NAME VARCHAR(300),
    SOURCE VARCHAR(20),
    LOCATION VARCHAR(50),
    IMAGE_URL VARCHAR(200),
    DESCRIPTION TEXT,
    LATITUDE DOUBLE,
    LONGITUDE DOUBLE,
    TRIAL_COUNT INT
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE institution_lookup (
    INSTITUTION_ID INT,
    FOREIGN KEY (INSTITUTION_ID) REFERENCES institution_description(INSTITUTION_ID),
    NCT_ID VARCHAR(50)
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX institution_lookup_nct_id_idx ON institution_lookup(NCT_ID);

CREATE TABLE institution_sponsors (
    INSTITUTION_ID INT,
    FOREIGN KEY (INSTITUTION_ID) REFERENCES institution_description(INSTITUTION_ID),
    SPONSOR_NAME VARCHAR(200),
    TRIAL_COUNT INT
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE institution_facilities (
    INSTITUTION_ID INT,
    FOREIGN KEY (INSTITUTION_ID) REFERENCES institution_description(INSTITUTION_ID),
    FACILITY_NAME VARCHAR(500), 
    CITY VARCHAR(100), 
    STATE VARCHAR(100), 
    ZIP VARCHAR(50), 
    COUNTRY VARCHAR(50),
    TRIAL_COUNT INT
) DEFAULT CHARACTER SET=utf8;




-- publications
DROP TABLE IF EXISTS trial_publications;

CREATE TABLE trial_publications (
    NCT_ID VARCHAR(50),
    FOREIGN KEY (NCT_ID) REFERENCES clinical_study(NCT_ID),
    PUBMED_ID VARCHAR(20),
    AUTHORS VARCHAR(1000),
    TITLE VARCHAR(1000),
    CITATION VARCHAR(1000),
    CONFIDENCE DOUBLE
) DEFAULT CHARACTER SET=utf8;




-- trial summary table
DROP TABLE IF EXISTS trial_summary;
CREATE TABLE trial_summary AS
SELECT
    a.nct_id,
    brief_title,
    case when overall_status = 'Active, not recruiting' then 'active, but not recruiting' else lower(overall_status) end overall_status,
    phase,
    case when study_type like 'Observational%' then 'observational' else lower(study_type) end study_type,
    gender,
    CASE 
        WHEN minimum_age in ('','N/A') 
          OR substr(substr(minimum_age,instr(minimum_age,' ')+1),1,4) in ('Hour','Minu') THEN 0
        ELSE cast(substr(minimum_age,1,instr(minimum_age,' ')-1) as DECIMAL) /
            CASE
                WHEN substr(substr(minimum_age,instr(minimum_age,' ')+1),1,4) = 'Year' then 1.0
                WHEN substr(substr(minimum_age,instr(minimum_age,' ')+1),1,4) = 'Mont' then 12.0
                WHEN substr(substr(minimum_age,instr(minimum_age,' ')+1),1,4) = 'Week' then 52.0
                WHEN substr(substr(minimum_age,instr(minimum_age,' ')+1),1,4) = 'Day' then 365.0
            END
    END minimum_age,
    CASE 
        WHEN maximum_age in ('','N/A') THEN 999
        WHEN substr(substr(maximum_age,instr(maximum_age,' ')+1),1,4) in ('Hour','Minu') THEN 0
        ELSE cast(substr(maximum_age,1,instr(maximum_age,' ')-1) as DECIMAL) /
            CASE
                WHEN substr(substr(maximum_age,instr(maximum_age,' ')+1),1,4) = 'Year' then 1.0
                WHEN substr(substr(maximum_age,instr(maximum_age,' ')+1),1,4) = 'Mont' then 12.0
                WHEN substr(substr(maximum_age,instr(maximum_age,' ')+1),1,4) = 'Week' then 52.0
                WHEN substr(substr(maximum_age,instr(maximum_age,' ')+1),1,4) = 'Day' then 365.0
            END
    END maximum_age,
    healthy_volunteers,
    CASE WHEN c.nct_id is not null THEN 'Y' ELSE 'N' END has_results,
    CASE 
        WHEN length(primary_completion_date) > 0 THEN substr(primary_completion_date,instr(primary_completion_date,' ')+1)
        WHEN length(completion_date) > 0 THEN substr(completion_date,instr(completion_date,' ')+1)
        WHEN length(start_date) > 0 THEN substr(start_date,instr(start_date,' ')+1)
        ELSE '0000' END sort_date,
    GROUP_CONCAT(DISTINCT intervention_type ORDER BY case when intervention_type = 'Other' then 'ZZZ' else intervention_type end) interventions
FROM clinical_study a
 LEFT JOIN interventions b on a.nct_id=b.nct_id
 LEFT JOIN results_baseline c on a.nct_id=c.nct_id
GROUP BY
 1, 2, 3, 4, 5, 6, 7, 8, 9;
CREATE UNIQUE INDEX trial_summary_nct_id_idx ON trial_summary(nct_id);






-- ZIP code data
DROP TABLE IF EXISTS zip_latlong;
CREATE TABLE zip_latlong (
    ZIP CHAR(5),
    LATITUDE DOUBLE,
    LONGITUDE DOUBLE
);
CREATE UNIQUE INDEX zip_latlong_zip ON zip_latlong (zip);

LOAD DATA LOCAL INFILE 'data/zip_table.txt' INTO TABLE zip_latlong CHARACTER SET UTF8 COLUMNS TERMINATED BY '\t' LINES TERMINATED BY '\n';


DROP TABLE IF EXISTS zip_facilities;
CREATE TABLE zip_facilities AS
SELECT nct_id, facility_id, latitude, longitude
FROM facilities a
 JOIN zip_latlong b 
 ON a.country='United States' AND length(a.zip) >= 5 and substr(a.zip,1,5) = b.zip;
CREATE INDEX zip_facilities_nct_id ON zip_facilities (nct_id);
CREATE UNIQUE INDEX zip_facilities_facility_id ON zip_facilities (facility_id);



