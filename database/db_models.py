from sqlalchemy import Column, BigInteger, Date, Float, Integer, Text, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ArmGroups(Base):
    __tablename__ = 'arm_groups'
    
    arm_group_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    arm_group_label = Column(String(100))
    arm_group_type = Column(String(50))
    description = Column(String(2000))
    group_id = Column(String(20))
    
    def __init__(self, arm_group_id, nct_id, arm_group_label, arm_group_type, description, group_id):
        self.arm_group_id = arm_group_id
        self.nct_id = nct_id
        self.arm_group_label = arm_group_label
        self.arm_group_type = arm_group_type
        self.description = description
        self.group_id = group_id

class Authorities(Base):
    __tablename__ = 'authorities'
    
    authority_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    authority = Column(String(300))
    
    def __init__(self, authority_id, nct_id, authority):
        self.authority_id = authority_id
        self.nct_id = nct_id
        self.authority = authority

class CentralContacts(Base):
    __tablename__ = 'central_contacts'
    
    central_contact_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    contact_type = Column(String(100))
    name_degree = Column(String(150))
    phone = Column(String(50))
    phone_ext = Column(String(50))
    email = Column(String(200))
    
    def __init__(self, central_contact_id, nct_id, contact_type, name_degree, phone, phone_ext, email):
        self.central_contact_id = central_contact_id
        self.nct_id = nct_id
        self.contact_type = contact_type
        self.name_degree = name_degree
        self.phone = phone
        self.phone_ext = phone_ext
        self.email = email

class ClinicalStudy(Base):
    __tablename__ = 'clinical_study'
    
    nct_id = Column(String(50), primary_key = True)
    download_date = Column(String(200))
    download_date_dt = Column(Date)
    org_study_id = Column(String(100))
    brief_title = Column(String(1000))
    official_title = Column(String(1000))
    acronym = Column(String(50))
    source = Column(String(200))
    has_dmc = Column(String(10))
    brief_summary = Column(Text)
    detailed_description = Column(Text)
    overall_status = Column(String(200))
    start_date = Column(String(50))
    completion_date = Column(String(50))
    completion_date_type = Column(String(50))
    primary_completion_date = Column(String(50))
    primary_completion_date_type = Column(String(50))
    phase = Column(String(50))
    study_type = Column(String(100))
    study_design = Column(String(2000))
    number_of_arms = Column(Integer)
    number_of_groups = Column(Integer)
    enrollment_type = Column(String(50))
    enrollment = Column(Integer)
    biospec_retention = Column(String(50))
    biospec_descr = Column(String(2000))
    criteria = Column(Text)
    gender = Column(String(50))
    minimum_age = Column(String(50))
    maximum_age = Column(String(50))
    healthy_volunteers = Column(String(50))
    sampling_method = Column(String(100))
    study_pop = Column(String(2000))
    verification_date = Column(String(50))
    lastchanged_date = Column(String(50))
    firstreceived_date = Column(String(50))
    is_section_801 = Column(String(50))
    is_fda_regulated = Column(String(50))
    why_stopped = Column(String(1000))
    has_expanded_access = Column(String(50))
    firstreceived_results_date = Column(String(50))
    url = Column(String(250))
    target_duration = Column(String(250))
    study_rank = Column(String(50))
    limitations_and_caveats = Column(String(2000))
    
    def __init__(self, nct_id, download_date, download_date_dt, org_study_id, brief_title, official_title, acronym, source, has_dmc, brief_summary, detailed_description, overall_status, start_date, completion_date, completion_date_type, primary_completion_date, primary_completion_date_type, phase, study_type, study_design, number_of_arms, number_of_groups, enrollment_type, enrollment, biospec_retention, biospec_descr, criteria, gender, minimum_age, maximum_age, healthy_volunteers, sampling_method, study_pop, verification_date, lastchanged_date, firstreceived_date, is_section_801, is_fda_regulated, why_stopped, has_expanded_access, firstreceived_results_date, url, target_duration, study_rank, limitations_and_caveats):
        self.nct_id = nct_id
        self.download_date = download_date
        self.download_date_dt = download_date_dt
        self.org_study_id = org_study_id
        self.brief_title = brief_title
        self.official_title = official_title
        self.acronym = acronym
        self.source = source
        self.has_dmc = has_dmc
        self.brief_summary = brief_summary
        self.detailed_description = detailed_description
        self.overall_status = overall_status
        self.start_date = start_date
        self.completion_date = completion_date
        self.completion_date_type = completion_date_type
        self.primary_completion_date = primary_completion_date
        self.primary_completion_date_type = primary_completion_date_type
        self.phase = phase
        self.study_type = study_type
        self.study_design = study_design
        self.number_of_arms = number_of_arms
        self.number_of_groups = number_of_groups
        self.enrollment_type = enrollment_type
        self.enrollment = enrollment
        self.biospec_retention = biospec_retention
        self.biospec_descr = biospec_descr
        self.criteria = criteria
        self.gender = gender
        self.minimum_age = minimum_age
        self.maximum_age = maximum_age
        self.healthy_volunteers = healthy_volunteers
        self.sampling_method = sampling_method
        self.study_pop = study_pop
        self.verification_date = verification_date
        self.lastchanged_date = lastchanged_date
        self.firstreceived_date = firstreceived_date
        self.is_section_801 = is_section_801
        self.is_fda_regulated = is_fda_regulated
        self.why_stopped = why_stopped
        self.has_expanded_access = has_expanded_access
        self.firstreceived_results_date = firstreceived_results_date
        self.url = url
        self.target_duration = target_duration
        self.study_rank = study_rank
        self.limitations_and_caveats = limitations_and_caveats

class Conditions(Base):
    __tablename__ = 'conditions'
    
    condition_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    condition_name = Column(String(200))
    
    def __init__(self, condition_id, nct_id, condition_name):
        self.condition_id = condition_id
        self.nct_id = nct_id
        self.condition_name = condition_name

class ConditionBrowse(Base):
    __tablename__ = 'condition_browse'
    
    mesh_condition_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    mesh_term = Column(String(200))
    
    def __init__(self, mesh_condition_id, nct_id, mesh_term):
        self.mesh_condition_id = mesh_condition_id
        self.nct_id = nct_id
        self.mesh_term = mesh_term

class CriteriaTagged(Base):
    __tablename__ = 'criteria_tagged'
    
    criteria_text_id = Column(Integer, primary_key = True)
    tagged_text = Column(String(2000))
    
    def __init__(self, criteria_text_id, tagged_text):
        self.criteria_text_id = criteria_text_id
        self.tagged_text = tagged_text

class CriteriaText(Base):
    __tablename__ = 'criteria_text'
    
    criteria_text_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    criteria_text = Column(String(2000))
    display_type = Column(String(50))
    display_order = Column(Integer)
    
    def __init__(self, criteria_text_id, nct_id, criteria_text, display_type, display_order):
        self.criteria_text_id = criteria_text_id
        self.nct_id = nct_id
        self.criteria_text = criteria_text
        self.display_type = display_type
        self.display_order = display_order

class Designs(Base):
    __tablename__ = 'designs'
    
    design_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    design_name = Column(String(500))
    design_value = Column(String(500))
    masked_role = Column(String(100))
    
    def __init__(self, design_id, nct_id, design_name, design_value, masked_role):
        self.design_id = design_id
        self.nct_id = nct_id
        self.design_name = design_name
        self.design_value = design_value
        self.masked_role = masked_role

class Facilities(Base):
    __tablename__ = 'facilities'
    
    facility_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    status = Column(String(50))
    facility_name = Column(String(500))
    city = Column(String(100))
    state = Column(String(100))
    zip = Column(String(50))
    country = Column(String(50))
    
    def __init__(self, facility_id, nct_id, status, facility_name, city, state, zip, country):
        self.facility_id = facility_id
        self.nct_id = nct_id
        self.status = status
        self.facility_name = facility_name
        self.city = city
        self.state = state
        self.zip = zip
        self.country = country

class FacilityContacts(Base):
    __tablename__ = 'facility_contacts'
    
    facility_contact_id = Column(Integer, primary_key = True)
    facility_id = Column(Integer, ForeignKey('facilities.facility_id'))
    nct_id = Column(String(50))
    contact_type = Column(String(100))
    name_degree = Column(String(150))
    phone = Column(String(50))
    phone_ext = Column(String(50))
    email = Column(String(200))
    
    def __init__(self, facility_contact_id, facility_id, nct_id, contact_type, name_degree, phone, phone_ext, email):
        self.facility_contact_id = facility_contact_id
        self.facility_id = facility_id
        self.nct_id = nct_id
        self.contact_type = contact_type
        self.name_degree = name_degree
        self.phone = phone
        self.phone_ext = phone_ext
        self.email = email

class Interventions(Base):
    __tablename__ = 'interventions'
    
    intervention_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    intervention_type = Column(String(100))
    intervention_name = Column(String(500))
    description = Column(String(2000))
    
    def __init__(self, intervention_id, nct_id, intervention_type, intervention_name, description):
        self.intervention_id = intervention_id
        self.nct_id = nct_id
        self.intervention_type = intervention_type
        self.intervention_name = intervention_name
        self.description = description

class InterventionArmGroups(Base):
    __tablename__ = 'intervention_arm_groups'
    
    int_arm_group_id = Column(Integer, primary_key = True)
    intervention_id = Column(Integer, ForeignKey('interventions.intervention_id'))
    nct_id = Column(String(50))
    arm_group_label = Column(String(100))
    
    def __init__(self, int_arm_group_id, intervention_id, nct_id, arm_group_label):
        self.int_arm_group_id = int_arm_group_id
        self.intervention_id = intervention_id
        self.nct_id = nct_id
        self.arm_group_label = arm_group_label

class InterventionBrowse(Base):
    __tablename__ = 'intervention_browse'
    
    mesh_intervention_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    mesh_term = Column(String(200))
    
    def __init__(self, mesh_intervention_id, nct_id, mesh_term):
        self.mesh_intervention_id = mesh_intervention_id
        self.nct_id = nct_id
        self.mesh_term = mesh_term

class InterventionOtherNames(Base):
    __tablename__ = 'intervention_other_names'
    
    int_other_name_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50))
    intervention_id = Column(Integer, ForeignKey('interventions.intervention_id'))
    other_name = Column(String(500))
    
    def __init__(self, int_other_name_id, nct_id, intervention_id, other_name):
        self.int_other_name_id = int_other_name_id
        self.nct_id = nct_id
        self.intervention_id = intervention_id
        self.other_name = other_name

class Investigators(Base):
    __tablename__ = 'investigators'
    
    investigator_id = Column(Integer, primary_key = True)
    facility_id = Column(Integer, ForeignKey('facilities.facility_id'))
    nct_id = Column(String(50))
    name_degree = Column(String(150))
    role = Column(String(100))
    affiliation = Column(String(500))
    
    def __init__(self, investigator_id, facility_id, nct_id, name_degree, role, affiliation):
        self.investigator_id = investigator_id
        self.facility_id = facility_id
        self.nct_id = nct_id
        self.name_degree = name_degree
        self.role = role
        self.affiliation = affiliation

class Keywords(Base):
    __tablename__ = 'keywords'
    
    keyword_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    keyword = Column(String(200))
    
    def __init__(self, keyword_id, nct_id, keyword):
        self.keyword_id = keyword_id
        self.nct_id = nct_id
        self.keyword = keyword

class Links(Base):
    __tablename__ = 'links'
    
    link_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    url = Column(String(500))
    description = Column(String(300))
    
    def __init__(self, link_id, nct_id, url, description):
        self.link_id = link_id
        self.nct_id = nct_id
        self.url = url
        self.description = description

class LocationCountries(Base):
    __tablename__ = 'location_countries'
    
    location_countries_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    country = Column(String(50))
    
    def __init__(self, location_countries_id, nct_id, country):
        self.location_countries_id = location_countries_id
        self.nct_id = nct_id
        self.country = country

class MeshThesaurus(Base):
    __tablename__ = 'mesh_thesaurus'
    
    mesh_seqid = Column(Integer, primary_key = True)
    mesh_id = Column(String(50))
    mesh_term = Column(String(200))
    
    def __init__(self, mesh_seqid, mesh_id, mesh_term):
        self.mesh_seqid = mesh_seqid
        self.mesh_id = mesh_id
        self.mesh_term = mesh_term

class NctAliases(Base):
    __tablename__ = 'nct_aliases'
    
    nct_alias_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    nct_alias = Column(String(200))
    
    def __init__(self, nct_alias_id, nct_id, nct_alias):
        self.nct_alias_id = nct_alias_id
        self.nct_id = nct_id
        self.nct_alias = nct_alias

class OverallOfficials(Base):
    __tablename__ = 'overall_officials'
    
    overall_official_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    role = Column(String(100))
    name_degree = Column(String(150))
    affiliation = Column(String(300))
    
    def __init__(self, overall_official_id, nct_id, role, name_degree, affiliation):
        self.overall_official_id = overall_official_id
        self.nct_id = nct_id
        self.role = role
        self.name_degree = name_degree
        self.affiliation = affiliation

class RatingsDatesStars(Base):
    __tablename__ = 'ratings_dates_stars'
    
    nct_id = Column(String(50), primary_key = True)
    score = Column(Float)
    
    def __init__(self, nct_id, score):
        self.nct_id = nct_id
        self.score = score

class RatingsDescription(Base):
    __tablename__ = 'ratings_description'
    
    nct_id = Column(String(50), primary_key = True)
    tfidf_sum = Column(Float)
    
    def __init__(self, nct_id, tfidf_sum):
        self.nct_id = nct_id
        self.tfidf_sum = tfidf_sum

class RatingsMeshStars(Base):
    __tablename__ = 'ratings_mesh_stars'
    
    nct_id = Column(String(50), primary_key = True)
    score = Column(Float)
    
    def __init__(self, nct_id, score):
        self.nct_id = nct_id
        self.score = score

class RatingsSitesStars(Base):
    __tablename__ = 'ratings_sites_stars'
    
    nct_id = Column(String(50), primary_key = True)
    score = Column(Float)
    
    def __init__(self, nct_id, score):
        self.nct_id = nct_id
        self.score = score

class Reference(Base):
    __tablename__ = 'reference'
    
    reference_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    reference_type = Column(String(50))
    citation = Column(Text)
    pmid = Column(String(20))
    
    def __init__(self, reference_id, nct_id, reference_type, citation, pmid):
        self.reference_id = reference_id
        self.nct_id = nct_id
        self.reference_type = reference_type
        self.citation = citation
        self.pmid = pmid

class RemovedCountries(Base):
    __tablename__ = 'removed_countries'
    
    removed_countries_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    country = Column(String(50))
    
    def __init__(self, removed_countries_id, nct_id, country):
        self.removed_countries_id = removed_countries_id
        self.nct_id = nct_id
        self.country = country

class ReportedEvents(Base):
    __tablename__ = 'reported_events'
    
    reported_event_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    event_type = Column(String(50))
    time_frame = Column(String(300))
    description = Column(String(1000))
    frequency_threshold = Column(String(50))
    default_vocab = Column(String(100))
    default_assessment = Column(String(300))
    
    def __init__(self, reported_event_id, nct_id, event_type, time_frame, description, frequency_threshold, default_vocab, default_assessment):
        self.reported_event_id = reported_event_id
        self.nct_id = nct_id
        self.event_type = event_type
        self.time_frame = time_frame
        self.description = description
        self.frequency_threshold = frequency_threshold
        self.default_vocab = default_vocab
        self.default_assessment = default_assessment

class ReportedEventCtgy(Base):
    __tablename__ = 'reported_event_ctgy'
    
    reported_event_category_id = Column(Integer, primary_key = True)
    reported_event_id = Column(Integer, ForeignKey('reported_events.reported_event_id'))
    category_title = Column(String(300))
    category_sub_title = Column(String(1000))
    category_description = Column(String(1000))
    category_assessment = Column(String(300))
    
    def __init__(self, reported_event_category_id, reported_event_id, category_title, category_sub_title, category_description, category_assessment):
        self.reported_event_category_id = reported_event_category_id
        self.reported_event_id = reported_event_id
        self.category_title = category_title
        self.category_sub_title = category_sub_title
        self.category_description = category_description
        self.category_assessment = category_assessment

class ReportedEventCtgyGrp(Base):
    __tablename__ = 'reported_event_ctgy_grp'
    
    reported_event_catgy_grp_id = Column(Integer, primary_key = True)
    reported_event_category_id = Column(Integer, ForeignKey('reported_event_ctgy.reported_event_category_id'))
    arm_group_id = Column(Integer, ForeignKey('arm_groups.arm_group_id'))
    subjects_affected = Column(String(50))
    subjects_at_risk = Column(String(50))
    events = Column(String(2000))
    
    def __init__(self, reported_event_catgy_grp_id, reported_event_category_id, arm_group_id, subjects_affected, subjects_at_risk, events):
        self.reported_event_catgy_grp_id = reported_event_catgy_grp_id
        self.reported_event_category_id = reported_event_category_id
        self.arm_group_id = arm_group_id
        self.subjects_affected = subjects_affected
        self.subjects_at_risk = subjects_at_risk
        self.events = events

class ResponsibleParties(Base):
    __tablename__ = 'responsible_parties'
    
    responsible_party_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    name_title = Column(String(300))
    organization = Column(String(250))
    responsible_party_type = Column(String(50))
    investigator_affiliation = Column(String(300))
    investigator_full_name = Column(String(300))
    investigator_title = Column(String(300))
    
    def __init__(self, responsible_party_id, nct_id, name_title, organization, responsible_party_type, investigator_affiliation, investigator_full_name, investigator_title):
        self.responsible_party_id = responsible_party_id
        self.nct_id = nct_id
        self.name_title = name_title
        self.organization = organization
        self.responsible_party_type = responsible_party_type
        self.investigator_affiliation = investigator_affiliation
        self.investigator_full_name = investigator_full_name
        self.investigator_title = investigator_title

class ResultsBaseline(Base):
    __tablename__ = 'results_baseline'
    
    rslts_baseline_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    population = Column(String(500))
    
    def __init__(self, rslts_baseline_id, nct_id, population):
        self.rslts_baseline_id = rslts_baseline_id
        self.nct_id = nct_id
        self.population = population

class ResultsBaselineMeasures(Base):
    __tablename__ = 'results_baseline_measures'
    
    baseline_id = Column(Integer, primary_key = True)
    rslts_baseline_id = Column(Integer, ForeignKey('results_baseline.rslts_baseline_id'))
    baseline_measure_title = Column(String(300))
    description = Column(String(2000))
    units_of_measure = Column(String(50))
    measure_type = Column(String(50))
    dispersion = Column(String(50))
    
    def __init__(self, baseline_id, rslts_baseline_id, baseline_measure_title, description, units_of_measure, measure_type, dispersion):
        self.baseline_id = baseline_id
        self.rslts_baseline_id = rslts_baseline_id
        self.baseline_measure_title = baseline_measure_title
        self.description = description
        self.units_of_measure = units_of_measure
        self.measure_type = measure_type
        self.dispersion = dispersion

class ResultsBaselineMeasureCatgy(Base):
    __tablename__ = 'results_baseline_measure_catgy'
    
    baseline_measure_catgy_id = Column(Integer, primary_key = True)
    baseline_id = Column(Integer, ForeignKey('results_baseline_measures.baseline_id'))
    category_title = Column(String(300))
    arm_group_id = Column(Integer, ForeignKey('arm_groups.arm_group_id'))
    baseline_value = Column(String(50))
    spread = Column(String(50))
    lower_limit = Column(String(50))
    upper_limit = Column(String(50))
    
    def __init__(self, baseline_measure_catgy_id, baseline_id, category_title, arm_group_id, baseline_value, spread, lower_limit, upper_limit):
        self.baseline_measure_catgy_id = baseline_measure_catgy_id
        self.baseline_id = baseline_id
        self.category_title = category_title
        self.arm_group_id = arm_group_id
        self.baseline_value = baseline_value
        self.spread = spread
        self.lower_limit = lower_limit
        self.upper_limit = upper_limit

class ResultsOutcomes(Base):
    __tablename__ = 'results_outcomes'
    
    outcome_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    outcome_type = Column(String(50))
    outcome_title = Column(String(300))
    time_frame = Column(String(300))
    safety_issue = Column(String(50))
    outcome_description = Column(String(2000))
    population = Column(String(500))
    posting_date = Column(String(50))
    
    def __init__(self, outcome_id, nct_id, outcome_type, outcome_title, time_frame, safety_issue, outcome_description, population, posting_date):
        self.outcome_id = outcome_id
        self.nct_id = nct_id
        self.outcome_type = outcome_type
        self.outcome_title = outcome_title
        self.time_frame = time_frame
        self.safety_issue = safety_issue
        self.outcome_description = outcome_description
        self.population = population
        self.posting_date = posting_date

class ResultsOutcomeAnalysis(Base):
    __tablename__ = 'results_outcome_analysis'
    
    results_outcome_analysis_id = Column(Integer, primary_key = True)
    outcome_id = Column(Integer, ForeignKey('results_outcomes.outcome_id'))
    param_type = Column(String(50))
    dispersion_type = Column(String(50))
    ci_percent = Column(Integer)
    ci_lower_limit = Column(String(50))
    ci_upper_limit = Column(String(50))
    groups_desc = Column(String(1000))
    non_inferiority = Column(String(50))
    non_inferiority_desc = Column(String(1000))
    p_value = Column(String(50))
    p_value_desc = Column(String(1000))
    method = Column(String(100))
    method_desc = Column(String(500))
    param_value = Column(String(50))
    estimate_desc = Column(String(2000))
    dispersion_value = Column(String(50))
    ci_n_sides = Column(String(50))
    ci_upper_limit_na_comment = Column(String(500))
    
    def __init__(self, results_outcome_analysis_id, outcome_id, param_type, dispersion_type, ci_percent, ci_lower_limit, ci_upper_limit, groups_desc, non_inferiority, non_inferiority_desc, p_value, p_value_desc, method, method_desc, param_value, estimate_desc, dispersion_value, ci_n_sides, ci_upper_limit_na_comment):
        self.results_outcome_analysis_id = results_outcome_analysis_id
        self.outcome_id = outcome_id
        self.param_type = param_type
        self.dispersion_type = dispersion_type
        self.ci_percent = ci_percent
        self.ci_lower_limit = ci_lower_limit
        self.ci_upper_limit = ci_upper_limit
        self.groups_desc = groups_desc
        self.non_inferiority = non_inferiority
        self.non_inferiority_desc = non_inferiority_desc
        self.p_value = p_value
        self.p_value_desc = p_value_desc
        self.method = method
        self.method_desc = method_desc
        self.param_value = param_value
        self.estimate_desc = estimate_desc
        self.dispersion_value = dispersion_value
        self.ci_n_sides = ci_n_sides
        self.ci_upper_limit_na_comment = ci_upper_limit_na_comment

class ResultsOutcomeAnalysisGrp(Base):
    __tablename__ = 'results_outcome_analysis_grp'
    
    results_outcome_anal_grp_id = Column(Integer, primary_key = True)
    results_outcome_analysis_id = Column(Integer, ForeignKey('results_outcome_analysis.results_outcome_analysis_id'))
    arm_group_id = Column(Integer, ForeignKey('arm_groups.arm_group_id'))
    
    def __init__(self, results_outcome_anal_grp_id, results_outcome_analysis_id, arm_group_id):
        self.results_outcome_anal_grp_id = results_outcome_anal_grp_id
        self.results_outcome_analysis_id = results_outcome_analysis_id
        self.arm_group_id = arm_group_id

class ResultsOutcomeMeasure(Base):
    __tablename__ = 'results_outcome_measure'
    
    outcome_measure_id = Column(Integer, primary_key = True)
    outcome_id = Column(Integer, ForeignKey('results_outcomes.outcome_id'))
    outcome_measure_title = Column(String(300))
    measure_description = Column(String(2000))
    unit_of_measure = Column(String(50))
    measure_type = Column(String(50))
    dispersion = Column(String(50))
    
    def __init__(self, outcome_measure_id, outcome_id, outcome_measure_title, measure_description, unit_of_measure, measure_type, dispersion):
        self.outcome_measure_id = outcome_measure_id
        self.outcome_id = outcome_id
        self.outcome_measure_title = outcome_measure_title
        self.measure_description = measure_description
        self.unit_of_measure = unit_of_measure
        self.measure_type = measure_type
        self.dispersion = dispersion

class ResultsOutcomeMeasureCtgy(Base):
    __tablename__ = 'results_outcome_measure_ctgy'
    
    outcome_measure_catgy_id = Column(Integer, primary_key = True)
    outcome_measure_id = Column(Integer, ForeignKey('results_outcome_measure.outcome_measure_id'))
    category_title = Column(String(300))
    arm_group_id = Column(Integer, ForeignKey('arm_groups.arm_group_id'))
    outcome_value = Column(String(50))
    spread = Column(String(50))
    lower_limit = Column(String(50))
    upper_limit = Column(String(50))
    
    def __init__(self, outcome_measure_catgy_id, outcome_measure_id, category_title, arm_group_id, outcome_value, spread, lower_limit, upper_limit):
        self.outcome_measure_catgy_id = outcome_measure_catgy_id
        self.outcome_measure_id = outcome_measure_id
        self.category_title = category_title
        self.arm_group_id = arm_group_id
        self.outcome_value = outcome_value
        self.spread = spread
        self.lower_limit = lower_limit
        self.upper_limit = upper_limit

class ResultsPartflowMlstn(Base):
    __tablename__ = 'results_partflow_mlstn'
    
    milestone_id = Column(Integer, primary_key = True)
    participant_flow_id = Column(Integer, ForeignKey('results_partic_flows.participant_flow_id'))
    milestone_type = Column(String(50))
    milestone_title = Column(String(300))
    
    def __init__(self, milestone_id, participant_flow_id, milestone_type, milestone_title):
        self.milestone_id = milestone_id
        self.participant_flow_id = participant_flow_id
        self.milestone_type = milestone_type
        self.milestone_title = milestone_title

class ResultsPartflowMlstnGrp(Base):
    __tablename__ = 'results_partflow_mlstn_grp'
    
    milestone_group_id = Column(Integer, primary_key = True)
    milestone_id = Column(Integer, ForeignKey('results_partflow_mlstn.milestone_id'))
    arm_group_id = Column(Integer, ForeignKey('arm_groups.arm_group_id'))
    partflow_count = Column(String(20))
    participant_description = Column(String(1000))
    
    def __init__(self, milestone_group_id, milestone_id, arm_group_id, partflow_count, participant_description):
        self.milestone_group_id = milestone_group_id
        self.milestone_id = milestone_id
        self.arm_group_id = arm_group_id
        self.partflow_count = partflow_count
        self.participant_description = participant_description

class ResultsParticFlows(Base):
    __tablename__ = 'results_partic_flows'
    
    participant_flow_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    period_title = Column(String(300))
    recruitment_details = Column(String(1000))
    pre_assignment_details = Column(String(1000))
    
    def __init__(self, participant_flow_id, nct_id, period_title, recruitment_details, pre_assignment_details):
        self.participant_flow_id = participant_flow_id
        self.nct_id = nct_id
        self.period_title = period_title
        self.recruitment_details = recruitment_details
        self.pre_assignment_details = pre_assignment_details

class ResultsPointOfContact(Base):
    __tablename__ = 'results_point_of_contact'
    
    point_of_contact_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    name_or_title = Column(String(300))
    organization = Column(String(300))
    phone = Column(String(50))
    email = Column(String(300))
    
    def __init__(self, point_of_contact_id, nct_id, name_or_title, organization, phone, email):
        self.point_of_contact_id = point_of_contact_id
        self.nct_id = nct_id
        self.name_or_title = name_or_title
        self.organization = organization
        self.phone = phone
        self.email = email

class ResultsRestrictionAgreements(Base):
    __tablename__ = 'results_restriction_agreements'
    
    agreement_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    pi_employee = Column(String(500))
    restrictive_agreement = Column(String(1000))
    
    def __init__(self, agreement_id, nct_id, pi_employee, restrictive_agreement):
        self.agreement_id = agreement_id
        self.nct_id = nct_id
        self.pi_employee = pi_employee
        self.restrictive_agreement = restrictive_agreement

class SecondaryIds(Base):
    __tablename__ = 'secondary_ids'
    
    sec_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    secondary_id = Column(String(100))
    
    def __init__(self, sec_id, nct_id, secondary_id):
        self.sec_id = sec_id
        self.nct_id = nct_id
        self.secondary_id = secondary_id

class Sponsors(Base):
    __tablename__ = 'sponsors'
    
    sponsor_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    sponsor_type = Column(String(50))
    agency = Column(String(200))
    agency_class = Column(String(50))
    
    def __init__(self, sponsor_id, nct_id, sponsor_type, agency, agency_class):
        self.sponsor_id = sponsor_id
        self.nct_id = nct_id
        self.sponsor_type = sponsor_type
        self.agency = agency
        self.agency_class = agency_class

class StudyOutcome(Base):
    __tablename__ = 'study_outcome'
    
    outcome_id = Column(Integer, primary_key = True)
    nct_id = Column(String(50), ForeignKey('clinical_study.nct_id'))
    study_outcomes_type = Column(String(50))
    measure = Column(String(300))
    safety_issue = Column(String(50))
    time_frame = Column(String(300))
    description = Column(String(2000))
    
    def __init__(self, outcome_id, nct_id, study_outcomes_type, measure, safety_issue, time_frame, description):
        self.outcome_id = outcome_id
        self.nct_id = nct_id
        self.study_outcomes_type = study_outcomes_type
        self.measure = measure
        self.safety_issue = safety_issue
        self.time_frame = time_frame
        self.description = description

