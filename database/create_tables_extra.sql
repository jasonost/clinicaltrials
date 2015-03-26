-- criteria text tables for active learning
CREATE TABLE criteria_text (
    CRITERIA_TEXT_ID INT, 
    PRIMARY KEY (CRITERIA_TEXT_ID), 
    NCT_ID VARCHAR(50), 
    FOREIGN KEY (NCT_ID) REFERENCES clinical_study(NCT_ID), 
    CRITERIA_TEXT VARCHAR(2000), 
    DISPLAY_TYPE VARCHAR(50), 
    DISPLAY_ORDER INT
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE criteria_tagged (
    CRITERIA_TEXT_ID INT,
    PRIMARY KEY (CRITERIA_TEXT_ID),
    TAGGED_TEXT VARCHAR(2000)
) DEFAULT CHARACTER SET=utf8;

-- condition tables for soft matches and search lookup
DROP TABLE IF EXISTS condition_all;
CREATE TABLE condition_all (
    CONDITION_ALL_ID INT AUTO_INCREMENT,
    PRIMARY KEY(CONDITION_ALL_ID),
    MESH_TERM VARCHAR(200),
    NCT_ID VARCHAR(50),
    SOURCE VARCHAR(20),
    DISP_ORDER INT,
    SYN_FLAG TINYINT
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX condition_all_mesh_term_idx ON condition_all(MESH_TERM);
CREATE INDEX condition_all_nct_id_idx ON condition_all(NCT_ID);
INSERT INTO condition_all (mesh_term, nct_id, source, syn_flag)
SELECT distinct mesh_term, nct_id, 'CTGOV', 0
FROM condition_browse;

-- condition synonym and description tables
DROP TABLE IF EXISTS condition_synonym;
DROP TABLE IF EXISTS condition_description;

CREATE TABLE condition_description (
    CONDITION_DESC_ID INT,
    PRIMARY KEY(CONDITION_DESC_ID),
    MESH_TERM VARCHAR(200),
    DESCRIPTION TEXT
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX condition_description_mesh_term_idx on condition_description(MESH_TERM);

CREATE TABLE condition_synonym (
    CONDITION_DESC_ID INT,
    FOREIGN KEY (CONDITION_DESC_ID) REFERENCES condition_description(CONDITION_DESC_ID),
    SYNONYM VARCHAR(200)
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
    DECRIPTION TEXT,
    LATITUDE DOUBLE,
    LONGITUDE DOUBLE
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
    SPONSOR_NAME VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;
CREATE TABLE institution_facilities (
    INSTITUTION_ID INT,
    FOREIGN KEY (INSTITUTION_ID) REFERENCES institution_description(INSTITUTION_ID),
    FACILITY_NAME VARCHAR(500), 
    CITY VARCHAR(100), 
    STATE VARCHAR(100), 
    ZIP VARCHAR(50), 
    COUNTRY VARCHAR(50)
) DEFAULT CHARACTER SET=utf8;