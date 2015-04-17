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
    TERM_ID INT,
    PRIMARY KEY (TERM_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID),
    TERM VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE concept_terms_reject (
    TERM_REJECT_ID INT,
    PRIMARY KEY (TERM_REJECT_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID),
    TERM VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE concept_predictors (
    PREDICTOR_ID INT,
    PRIMARY KEY (PREDICTOR_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID),
    PREDICTOR VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE concept_predictors_reject (
    PREDICTOR_REJECT_ID INT,
    PRIMARY KEY (PREDICTOR_REJECT_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID),
    PREDICTOR VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE criteria_concept_lookup (
    CRITERIA_TEXT_ID INT,
    FOREIGN KEY (CRITERIA_TEXT_ID) REFERENCES criteria_text(CRITERIA_TEXT_ID),
    TERM_ID INT,
    FOREIGN KEY (TERM_ID) REFERENCES concept_terms(TERM_ID),
    CONCEPT_ID CHAR(36),
    FOREIGN KEY (CONCEPT_ID) REFERENCES criteria_concept(CONCEPT_ID),
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
    UPDATE_ID INT,
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

CREATE TABLE user_history_criteria (
    HISTORY_ID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (HISTORY_ID),
    UPDATE_ID INT,
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
    nct_id,
    brief_title,
    case when overall_status = 'Active, not recruiting' then 'active, but not recruiting' else lower(overall_status) end overall_status,
    phase,
    case when study_type like 'Observational%' then 'observational' else lower(study_type) end study_type
from clinical_study;
CREATE UNIQUE INDEX trial_summary_nct_id_idx ON trial_summary(nct_id);


