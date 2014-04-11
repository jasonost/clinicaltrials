# How many entries in the conditions table?
# 250787
SELECT count(*) condition_name
FROM conditions;

# How many distinct conditions listed in condition_name?
# 39537
SELECT count(DISTINCT condition_name) condition_name
FROM conditions;

# how many total trials in this table?
# 152108 
SELECT count(DISTINCT nct_id)
FROM conditions;

# Summary of MeSH terms per study= 1.65, SD 2.84 Min = 1, Max = 172
SELECT 
    avg(meshcounts) mesh_mean,
    stddev(meshcounts) mesh_SD,
    min(meshcounts) mesh_min,
    max(meshcounts) mesh_max
FROM
    (SELECT count(*) meshcounts
    FROM conditions
    GROUP BY NCT_ID) AS meshsummary;


# Why does one study have 172 mesh terms listed!?
# looks like some studies aggressively list lots of mesh terms. there are 28 w > 100 mesh terms
SELECT nct_id, meshcounts
FROM
    (
	SELECT nct_id, count(*) meshcounts
    FROM conditions
    GROUP BY NCT_ID
	) AS counts
	WHERE meshcounts > 10
	ORDER BY meshcounts DESC;

# Now lets look at condition_browse table (generated algorithmically by NLM)
# 309589 MeSH terms assigned
SELECT count(*) mesh_term
FROM condition_browse;

# but only 131332 unique trials in this table (compared to 152108 in conditions table)
SELECT count(DISTINCT nct_id) mesh_term
FROM condition_browse;

# In conditions_browse, each study has 2.35 mean MeSH terms, with SD 2.058, min 1, max 72
SELECT 
    avg(meshcounts) mesh_mean,
    stddev(meshcounts) mesh_SD,
    min(meshcounts) mesh_min,
    max(meshcounts) mesh_max
FROM
    (
	SELECT count(*) meshcounts
    FROM condition_browse
    GROUP BY NCT_ID
	) AS meshsummary;

SELECT nct_id, meshcounts
FROM
    (
	SELECT nct_id, count(*) meshcounts
    FROM condition_browse
    GROUP BY NCT_ID
	) AS counts
	WHERE meshcounts > 5
	ORDER BY meshcounts DESC;

# intervention_browse table
# 168030 total listed interventions
SELECT count(*)
FROM intervention_browse;

# 2581 unique interventions
SELECT count(DISTINCT mesh_term)
FROM intervention_browse;

# 72646 trials listed (where did the other 80K go? are those the observational trials?)
SELECT count(DISTINCT nct_id)
FROM intervention_browse;


# intervention MeSH: mean 2.313, SD 2.0, min 1, max 33
SELECT 
    avg(meshcounts) mesh_mean,
    stddev(meshcounts) mesh_SD,
    min(meshcounts) mesh_min,
    max(meshcounts) mesh_max
FROM
    (
	SELECT count(*) meshcounts
    FROM intervention_browse
    GROUP BY NCT_ID
	) AS meshsummary;

SELECT nct_id, meshcounts
FROM
    (
	SELECT nct_id, count(*) meshcounts
    FROM intervention_browse
    GROUP BY NCT_ID
	) AS counts
	WHERE meshcounts > 10
	ORDER BY meshcounts DESC;

SELECT *
FROM clinical_study
WHERE detailed_description REGEXP 'HIV'
AND NOT detailed_description REGEXP '[[:alpha:]]{1}HIV|HIV[[:alpha:]]{1}';

SELECT DISTINCT agency_class
FROM sponsors;

SELECT agency_class as AgencyClass, COUNT(sponsor_id) Total
FROM sponsors
GROUP BY agency_class;

SELECT DISTINCT agency
FROM sponsors
where agency_class = 'other';

SELECT DISTINCT design_value
FROM designs
WHERE design_name = 'allocation';

