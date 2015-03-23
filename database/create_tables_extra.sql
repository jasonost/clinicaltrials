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
CREATE TABLE condition_all (
    CONDITION_ALL_ID INT,
    PRIMARY KEY(CONDITION_ALL_ID),
    MESH_TERM VARCHAR(200),
    NCT_ID VARCHAR(50),
    SOURCE VARCHAR(20)
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX condition_all_mesh_term_idx ON condition_all(MESH_TERM);
CREATE INDEX condition_all_nct_id_idx ON condition_all(NCT_ID);
INSERT INTO condition_all
SELECT mesh_condition_id, mesh_term, nct_id, 'CTGOV'
FROM condition_browse;

CREATE TABLE condition_lookup (
    MESH_TERM VARCHAR(200),
    MESH_TERM_LOWER VARCHAR(200)
) DEFAULT CHARACTER SET=utf8;
CREATE INDEX condition_lookup_mesh_term_idx ON condition_lookup(MESH_TERM);
CREATE INDEX condition_lookup_mesh_term_lower_idx ON condition_lookup(MESH_TERM_LOWER);