from sqlalchemy import MetaData, Table, Column, BigInteger, Date, Float, Integer, Text, String, ForeignKey

metadata = MetaData()

ArmGroups = Table('arm_groups', metadata,
    Column('arm_group_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('arm_group_label', String),
    Column('arm_group_type', String),
    Column('description', String),
    Column('group_id', String),
)

Authorities = Table('authorities', metadata,
    Column('authority_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('authority', String),
)

CentralContacts = Table('central_contacts', metadata,
    Column('central_contact_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('contact_type', String),
    Column('name_degree', String),
    Column('phone', String),
    Column('phone_ext', String),
    Column('email', String),
)

ClinicalStudy = Table('clinical_study', metadata,
    Column('nct_id', String, primary_key = True),
    Column('download_date', String),
    Column('download_date_dt', Date),
    Column('org_study_id', String),
    Column('brief_title', String),
    Column('official_title', String),
    Column('acronym', String),
    Column('source', String),
    Column('has_dmc', String),
    Column('brief_summary', Text),
    Column('detailed_description', Text),
    Column('overall_status', String),
    Column('start_date', String),
    Column('completion_date', String),
    Column('completion_date_type', String),
    Column('primary_completion_date', String),
    Column('primary_completion_date_type', String),
    Column('phase', String),
    Column('study_type', String),
    Column('study_design', String),
    Column('number_of_arms', Integer),
    Column('number_of_groups', Integer),
    Column('enrollment_type', String),
    Column('enrollment', Integer),
    Column('biospec_retention', String),
    Column('biospec_descr', String),
    Column('criteria', Text),
    Column('gender', String),
    Column('minimum_age', String),
    Column('maximum_age', String),
    Column('healthy_volunteers', String),
    Column('sampling_method', String),
    Column('study_pop', String),
    Column('verification_date', String),
    Column('lastchanged_date', String),
    Column('firstreceived_date', String),
    Column('is_section_801', String),
    Column('is_fda_regulated', String),
    Column('why_stopped', String),
    Column('has_expanded_access', String),
    Column('firstreceived_results_date', String),
    Column('url', String),
    Column('target_duration', String),
    Column('study_rank', String),
    Column('limitations_and_caveats', String),
)

Conditions = Table('conditions', metadata,
    Column('condition_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('condition_name', String),
)

ConditionBrowse = Table('condition_browse', metadata,
    Column('mesh_condition_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('mesh_term', String),
)

ConditionDescription = Table('condition_description', metadata,
    Column('condition_id', Integer, primary_key = True),
    Column('mesh_term', String),
    Column('description', Text),
)

ConditionLookup = Table('condition_lookup', metadata,
    Column('condition_id', Integer, ForeignKey('condition_description.condition_id')),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('source', String),
    Column('disp_order', Integer),
    Column('syn_flag', Integer),
)

ConditionSynonym = Table('condition_synonym', metadata,
    Column('condition_id', Integer, ForeignKey('condition_description.condition_id')),
    Column('synonym_id', Integer, ForeignKey('condition_description.condition_id')),
)

CriteriaTagged = Table('criteria_tagged', metadata,
    Column('criteria_text_id', Integer, primary_key = True),
    Column('tagged_text', String),
)

CriteriaText = Table('criteria_text', metadata,
    Column('criteria_text_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('criteria_text', String),
    Column('display_type', String),
    Column('display_order', Integer),
)

Designs = Table('designs', metadata,
    Column('design_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('design_name', String),
    Column('design_value', String),
    Column('masked_role', String),
)

Facilities = Table('facilities', metadata,
    Column('facility_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('status', String),
    Column('facility_name', String),
    Column('city', String),
    Column('state', String),
    Column('zip', String),
    Column('country', String),
)

FacilityContacts = Table('facility_contacts', metadata,
    Column('facility_contact_id', Integer, primary_key = True),
    Column('facility_id', Integer, ForeignKey('facilities.facility_id')),
    Column('nct_id', String),
    Column('contact_type', String),
    Column('name_degree', String),
    Column('phone', String),
    Column('phone_ext', String),
    Column('email', String),
)

InstitutionDescription = Table('institution_description', metadata,
    Column('institution_id', Integer, primary_key = True),
    Column('name', String),
    Column('source', String),
    Column('location', String),
    Column('image_url', String),
    Column('description', Text),
    Column('latitude', Float),
    Column('longitude', Float),
    Column('trial_count', Integer),
)

InstitutionFacilities = Table('institution_facilities', metadata,
    Column('institution_id', Integer, ForeignKey('institution_description.institution_id')),
    Column('facility_name', String),
    Column('city', String),
    Column('state', String),
    Column('zip', String),
    Column('country', String),
    Column('trial_count', Integer),
)

InstitutionLookup = Table('institution_lookup', metadata,
    Column('institution_id', Integer, ForeignKey('institution_description.institution_id')),
    Column('nct_id', String),
)

InstitutionRatings = Table('institution_ratings', metadata,
    Column('institution_id', Integer),
    Column('rating_dates', Float),
    Column('rating_mesh', Float),
    Column('rating_sites', Float),
    Column('rating_desc', Float),
    Column('rating_criteria', Float),
)

InstitutionSponsors = Table('institution_sponsors', metadata,
    Column('institution_id', Integer, ForeignKey('institution_description.institution_id')),
    Column('sponsor_name', String),
    Column('trial_count', Integer),
)

Interventions = Table('interventions', metadata,
    Column('intervention_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('intervention_type', String),
    Column('intervention_name', String),
    Column('description', String),
)

InterventionArmGroups = Table('intervention_arm_groups', metadata,
    Column('int_arm_group_id', Integer, primary_key = True),
    Column('intervention_id', Integer, ForeignKey('interventions.intervention_id')),
    Column('nct_id', String),
    Column('arm_group_label', String),
)

InterventionBrowse = Table('intervention_browse', metadata,
    Column('mesh_intervention_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('mesh_term', String),
)

InterventionOtherNames = Table('intervention_other_names', metadata,
    Column('int_other_name_id', Integer, primary_key = True),
    Column('nct_id', String),
    Column('intervention_id', Integer, ForeignKey('interventions.intervention_id')),
    Column('other_name', String),
)

Investigators = Table('investigators', metadata,
    Column('investigator_id', Integer, primary_key = True),
    Column('facility_id', Integer, ForeignKey('facilities.facility_id')),
    Column('nct_id', String),
    Column('name_degree', String),
    Column('role', String),
    Column('affiliation', String),
)

Keywords = Table('keywords', metadata,
    Column('keyword_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('keyword', String),
)

Links = Table('links', metadata,
    Column('link_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('url', String),
    Column('description', String),
)

LocationCountries = Table('location_countries', metadata,
    Column('location_countries_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('country', String),
)

MeshThesaurus = Table('mesh_thesaurus', metadata,
    Column('mesh_seqid', Integer, primary_key = True),
    Column('mesh_id', String),
    Column('mesh_term', String),
)

NctAliases = Table('nct_aliases', metadata,
    Column('nct_alias_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('nct_alias', String),
)

OverallOfficials = Table('overall_officials', metadata,
    Column('overall_official_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('role', String),
    Column('name_degree', String),
    Column('affiliation', String),
)

RatingsCriteriaStars = Table('ratings_criteria_stars', metadata,
    Column('nct_id', String),
    Column('score', BigInteger),
)

RatingsDatesStars = Table('ratings_dates_stars', metadata,
    Column('nct_id', String, primary_key = True),
    Column('score', Float),
)

RatingsDescriptionStars = Table('ratings_description_stars', metadata,
    Column('nct_id', String, primary_key = True),
    Column('tfidf_sum', Float),
    Column('score', Float),
)

RatingsMeshStars = Table('ratings_mesh_stars', metadata,
    Column('nct_id', String, primary_key = True),
    Column('score', Float),
)

RatingsSitesStars = Table('ratings_sites_stars', metadata,
    Column('nct_id', String, primary_key = True),
    Column('score', Float),
)

Reference = Table('reference', metadata,
    Column('reference_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('reference_type', String),
    Column('citation', Text),
    Column('pmid', String),
)

RemovedCountries = Table('removed_countries', metadata,
    Column('removed_countries_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('country', String),
)

ReportedEvents = Table('reported_events', metadata,
    Column('reported_event_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('event_type', String),
    Column('time_frame', String),
    Column('description', String),
    Column('frequency_threshold', String),
    Column('default_vocab', String),
    Column('default_assessment', String),
)

ReportedEventCtgy = Table('reported_event_ctgy', metadata,
    Column('reported_event_category_id', Integer, primary_key = True),
    Column('reported_event_id', Integer, ForeignKey('reported_events.reported_event_id')),
    Column('category_title', String),
    Column('category_sub_title', String),
    Column('category_description', String),
    Column('category_assessment', String),
)

ReportedEventCtgyGrp = Table('reported_event_ctgy_grp', metadata,
    Column('reported_event_catgy_grp_id', Integer, primary_key = True),
    Column('reported_event_category_id', Integer, ForeignKey('reported_event_ctgy.reported_event_category_id')),
    Column('arm_group_id', Integer, ForeignKey('arm_groups.arm_group_id')),
    Column('subjects_affected', String),
    Column('subjects_at_risk', String),
    Column('events', String),
)

ResponsibleParties = Table('responsible_parties', metadata,
    Column('responsible_party_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('name_title', String),
    Column('organization', String),
    Column('responsible_party_type', String),
    Column('investigator_affiliation', String),
    Column('investigator_full_name', String),
    Column('investigator_title', String),
)

ResultsBaseline = Table('results_baseline', metadata,
    Column('rslts_baseline_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('population', String),
)

ResultsBaselineMeasures = Table('results_baseline_measures', metadata,
    Column('baseline_id', Integer, primary_key = True),
    Column('rslts_baseline_id', Integer, ForeignKey('results_baseline.rslts_baseline_id')),
    Column('baseline_measure_title', String),
    Column('description', String),
    Column('units_of_measure', String),
    Column('measure_type', String),
    Column('dispersion', String),
)

ResultsBaselineMeasureCatgy = Table('results_baseline_measure_catgy', metadata,
    Column('baseline_measure_catgy_id', Integer, primary_key = True),
    Column('baseline_id', Integer, ForeignKey('results_baseline_measures.baseline_id')),
    Column('category_title', String),
    Column('arm_group_id', Integer, ForeignKey('arm_groups.arm_group_id')),
    Column('baseline_value', String),
    Column('spread', String),
    Column('lower_limit', String),
    Column('upper_limit', String),
)

ResultsOutcomes = Table('results_outcomes', metadata,
    Column('outcome_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('outcome_type', String),
    Column('outcome_title', String),
    Column('time_frame', String),
    Column('safety_issue', String),
    Column('outcome_description', String),
    Column('population', String),
    Column('posting_date', String),
)

ResultsOutcomeAnalysis = Table('results_outcome_analysis', metadata,
    Column('results_outcome_analysis_id', Integer, primary_key = True),
    Column('outcome_id', Integer, ForeignKey('results_outcomes.outcome_id')),
    Column('param_type', String),
    Column('dispersion_type', String),
    Column('ci_percent', Integer),
    Column('ci_lower_limit', String),
    Column('ci_upper_limit', String),
    Column('groups_desc', String),
    Column('non_inferiority', String),
    Column('non_inferiority_desc', String),
    Column('p_value', String),
    Column('p_value_desc', String),
    Column('method', String),
    Column('method_desc', String),
    Column('param_value', String),
    Column('estimate_desc', String),
    Column('dispersion_value', String),
    Column('ci_n_sides', String),
    Column('ci_upper_limit_na_comment', String),
)

ResultsOutcomeAnalysisGrp = Table('results_outcome_analysis_grp', metadata,
    Column('results_outcome_anal_grp_id', Integer, primary_key = True),
    Column('results_outcome_analysis_id', Integer, ForeignKey('results_outcome_analysis.results_outcome_analysis_id')),
    Column('arm_group_id', Integer, ForeignKey('arm_groups.arm_group_id')),
)

ResultsOutcomeMeasure = Table('results_outcome_measure', metadata,
    Column('outcome_measure_id', Integer, primary_key = True),
    Column('outcome_id', Integer, ForeignKey('results_outcomes.outcome_id')),
    Column('outcome_measure_title', String),
    Column('measure_description', String),
    Column('unit_of_measure', String),
    Column('measure_type', String),
    Column('dispersion', String),
)

ResultsOutcomeMeasureCtgy = Table('results_outcome_measure_ctgy', metadata,
    Column('outcome_measure_catgy_id', Integer, primary_key = True),
    Column('outcome_measure_id', Integer, ForeignKey('results_outcome_measure.outcome_measure_id')),
    Column('category_title', String),
    Column('arm_group_id', Integer, ForeignKey('arm_groups.arm_group_id')),
    Column('outcome_value', String),
    Column('spread', String),
    Column('lower_limit', String),
    Column('upper_limit', String),
)

ResultsPartflowMlstn = Table('results_partflow_mlstn', metadata,
    Column('milestone_id', Integer, primary_key = True),
    Column('participant_flow_id', Integer, ForeignKey('results_partic_flows.participant_flow_id')),
    Column('milestone_type', String),
    Column('milestone_title', String),
)

ResultsPartflowMlstnGrp = Table('results_partflow_mlstn_grp', metadata,
    Column('milestone_group_id', Integer, primary_key = True),
    Column('milestone_id', Integer, ForeignKey('results_partflow_mlstn.milestone_id')),
    Column('arm_group_id', Integer, ForeignKey('arm_groups.arm_group_id')),
    Column('partflow_count', String),
    Column('participant_description', String),
)

ResultsParticFlows = Table('results_partic_flows', metadata,
    Column('participant_flow_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('period_title', String),
    Column('recruitment_details', String),
    Column('pre_assignment_details', String),
)

ResultsPointOfContact = Table('results_point_of_contact', metadata,
    Column('point_of_contact_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('name_or_title', String),
    Column('organization', String),
    Column('phone', String),
    Column('email', String),
)

ResultsRestrictionAgreements = Table('results_restriction_agreements', metadata,
    Column('agreement_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('pi_employee', String),
    Column('restrictive_agreement', String),
)

SecondaryIds = Table('secondary_ids', metadata,
    Column('sec_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('secondary_id', String),
)

Sponsors = Table('sponsors', metadata,
    Column('sponsor_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('sponsor_type', String),
    Column('agency', String),
    Column('agency_class', String),
)

StudyOutcome = Table('study_outcome', metadata,
    Column('outcome_id', Integer, primary_key = True),
    Column('nct_id', String, ForeignKey('clinical_study.nct_id')),
    Column('study_outcomes_type', String),
    Column('measure', String),
    Column('safety_issue', String),
    Column('time_frame', String),
    Column('description', String),
)

TrialSummary = Table('trial_summary', metadata,
    Column('nct_id', String, primary_key = True),
    Column('brief_title', String),
    Column('overall_status', String),
    Column('phase', String),
    Column('study_type', String),
)

