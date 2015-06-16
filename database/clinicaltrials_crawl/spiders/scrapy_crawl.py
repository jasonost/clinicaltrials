import scrapy, re

from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor

# global procedures to remove line breaks and extract element
def remove_breaks(broken):
    '''
      broken is a string that includes unwanted line breaks
    '''
    if broken:
        return re.sub(' +',' ',broken.replace('\n\n','<br>').replace('\n','')).strip()
    else:
        return broken

def get_elem(field):
    '''
      field is a list of returned elements from an xpath query
      (this procedure ensures that nothing is returned if the list is empty)
    '''
    return field[0] if len(field) > 0 else None




# Item class definitions
# main clinical_study table
class ClinicalStudy(scrapy.Item):
    nct_id = scrapy.Field()
    download_date = scrapy.Field()
    org_study_id = scrapy.Field()
    brief_title = scrapy.Field()
    official_title = scrapy.Field()
    acronym = scrapy.Field()
    source = scrapy.Field()
    has_dmc = scrapy.Field()
    brief_summary = scrapy.Field()
    detailed_description = scrapy.Field()
    overall_status = scrapy.Field()
    start_date = scrapy.Field()
    completion_date = scrapy.Field()
    completion_date_type = scrapy.Field()
    primary_completion_date = scrapy.Field()
    primary_completion_date_type = scrapy.Field()
    phase = scrapy.Field()
    study_type = scrapy.Field()
    study_design = scrapy.Field()
    number_of_arms = scrapy.Field()
    number_of_groups = scrapy.Field()
    enrollment_type = scrapy.Field()
    enrollment = scrapy.Field()
    biospec_retention = scrapy.Field()
    biospec_descr = scrapy.Field()
    criteria = scrapy.Field()
    gender = scrapy.Field()
    minimum_age = scrapy.Field()
    maximum_age = scrapy.Field()
    healthy_volunteers = scrapy.Field()
    sampling_method = scrapy.Field()
    study_pop = scrapy.Field()
    verification_date = scrapy.Field()
    lastchanged_date = scrapy.Field()
    firstreceived_date = scrapy.Field()
    is_section_801 = scrapy.Field()
    is_fda_regulated = scrapy.Field()
    why_stopped = scrapy.Field()
    has_expanded_access = scrapy.Field()
    firstreceived_results_date = scrapy.Field()
    url = scrapy.Field()
    target_duration = scrapy.Field()
    study_rank = scrapy.Field()
    limitations_and_caveats = scrapy.Field()

    authorities = scrapy.Field()
    central_contacts = scrapy.Field()
    condition_browse = scrapy.Field()
    conditions = scrapy.Field()
    designs = scrapy.Field()
    intervention_browse = scrapy.Field()
    keywords = scrapy.Field()
    links = scrapy.Field()
    location_countries = scrapy.Field()
    nct_aliases = scrapy.Field()
    overall_officials = scrapy.Field()
    reference = scrapy.Field()
    removed_countries = scrapy.Field()
    responsible_parties = scrapy.Field()
    results_point_of_contact = scrapy.Field()
    results_restriction_agreements = scrapy.Field()
    secondary_ids = scrapy.Field()
    sponsors = scrapy.Field()
    study_outcome = scrapy.Field()

    facilities = scrapy.Field()
    interventions = scrapy.Field()
    results_baseline = scrapy.Field()
    results_events = scrapy.Field()
    results_flows = scrapy.Field()
    results_outcomes = scrapy.Field()
    arm_groups = scrapy.Field()


# single tables
class Authorities(scrapy.Item):
    authority = scrapy.Field()

class CentralContacts(scrapy.Item):
    contact_type = scrapy.Field()
    name_degree = scrapy.Field()
    phone = scrapy.Field()
    phone_ext = scrapy.Field()
    email = scrapy.Field()

class ConditionBrowse(scrapy.Item):
    mesh_term = scrapy.Field()

class Conditions(scrapy.Item):
    condition_name = scrapy.Field()

class Designs(scrapy.Item):
    design_name = scrapy.Field()
    design_value = scrapy.Field()
    masked_role = scrapy.Field()

class InterventionBrowse(scrapy.Item):
    mesh_term = scrapy.Field()

class Keywords(scrapy.Item):
    keyword = scrapy.Field()

class Links(scrapy.Item):
    url = scrapy.Field()
    description = scrapy.Field()

class LocationCountries(scrapy.Item):
    country = scrapy.Field()

class NctAliases(scrapy.Item):
    nct_alias = scrapy.Field()

class OverallOfficials(scrapy.Item):
    role = scrapy.Field()
    name_degree = scrapy.Field()
    affiliation = scrapy.Field()

class Reference(scrapy.Item):
    reference_type = scrapy.Field()
    citation = scrapy.Field()
    pmid = scrapy.Field()

class RemovedCountries(scrapy.Item):
    country = scrapy.Field()

class ResponsibleParties(scrapy.Item):
    name_title = scrapy.Field()
    organization = scrapy.Field()
    responsible_party_type = scrapy.Field()
    investigator_affiliation = scrapy.Field()
    investigator_full_name = scrapy.Field()
    investigator_title = scrapy.Field()

class ResultsPointOfContact(scrapy.Item):
    name_or_title = scrapy.Field()
    organization = scrapy.Field()
    phone = scrapy.Field()
    email = scrapy.Field()

class ResultsRestrictionAgreements(scrapy.Item):
    pi_employee = scrapy.Field()
    restrictive_agreement = scrapy.Field()

class SecondaryIds(scrapy.Item):
    secondary_id = scrapy.Field()

class Sponsors(scrapy.Item):
    sponsor_type = scrapy.Field()
    agency = scrapy.Field()
    agency_class = scrapy.Field()

class StudyOutcome(scrapy.Item):
    study_outcomes_type = scrapy.Field()
    measure = scrapy.Field()
    safety_issue = scrapy.Field()
    time_frame = scrapy.Field()
    description = scrapy.Field()


# location tables
class Facilities(scrapy.Item):
    status = scrapy.Field()
    facility_name = scrapy.Field()
    city = scrapy.Field()
    state = scrapy.Field()
    zip_ = scrapy.Field()
    country = scrapy.Field()

    contacts = scrapy.Field()
    investigators = scrapy.Field()

class FacilityContacts(scrapy.Item):
    contact_type = scrapy.Field()
    name_degree = scrapy.Field()
    phone = scrapy.Field()
    phone_ext = scrapy.Field()
    email = scrapy.Field()

class Investigators(scrapy.Item):
    name_degree = scrapy.Field()
    role = scrapy.Field()
    affiliation = scrapy.Field()


# intervention tables
class Interventions(scrapy.Item):
    intervention_type = scrapy.Field()
    intervention_name = scrapy.Field()
    description = scrapy.Field()

    arm_groups = scrapy.Field()
    other_names = scrapy.Field()

class InterventionArmGroups(scrapy.Item):
    arm_group_label = scrapy.Field()

class InterventionOtherNames(scrapy.Item):
    other_name = scrapy.Field()


# results tables
class ArmGroups(scrapy.Item):
    arm_group_label = scrapy.Field()
    arm_group_type = scrapy.Field()
    description = scrapy.Field()
    group_id = scrapy.Field()


class ReportedEvents(scrapy.Item):
    event_type = scrapy.Field()
    time_frame = scrapy.Field()
    description = scrapy.Field()
    frequency_threshold = scrapy.Field()
    default_vocab = scrapy.Field()
    default_assessment = scrapy.Field()

    groups = scrapy.Field()
    categories = scrapy.Field()

class ReportedEventCtgy(scrapy.Item):
    category_title = scrapy.Field()
    category_sub_title = scrapy.Field()
    category_description = scrapy.Field()
    category_assessment = scrapy.Field()

    groups = scrapy.Field()

class ReportedEventCtgyGrp(scrapy.Item):
    group_id = scrapy.Field()
    subjects_affected = scrapy.Field()
    subjects_at_risk = scrapy.Field()
    events = scrapy.Field()


class ResultsBaseline(scrapy.Item):
    population = scrapy.Field()

    groups = scrapy.Field()
    measures = scrapy.Field()

class ResultsBaselineMeasures(scrapy.Item):
    baseline_measure_title = scrapy.Field()
    description = scrapy.Field()
    units_of_measure = scrapy.Field()
    measure_type = scrapy.Field()
    dispersion = scrapy.Field()

    categories = scrapy.Field()

class ResultsBaselineMeasureCatgy(scrapy.Item):
    group_id = scrapy.Field()
    category_title = scrapy.Field()
    baseline_value = scrapy.Field()
    spread = scrapy.Field()
    lower_limit = scrapy.Field()
    upper_limit = scrapy.Field()


class ResultsOutcomes(scrapy.Item):
    outcome_type = scrapy.Field()
    outcome_title = scrapy.Field()
    time_frame = scrapy.Field()
    safety_issue = scrapy.Field()
    outcome_description = scrapy.Field()
    population = scrapy.Field()
    posting_date = scrapy.Field()

    groups = scrapy.Field()
    analysis = scrapy.Field()
    measure = scrapy.Field()

class ResultsOutcomeAnalysis(scrapy.Item):
    param_type = scrapy.Field()
    dispersion_type = scrapy.Field()
    ci_percent = scrapy.Field()
    ci_lower_limit = scrapy.Field()
    ci_upper_limit = scrapy.Field()
    groups_desc = scrapy.Field()
    non_inferiority = scrapy.Field()
    non_inferiority_desc = scrapy.Field()
    p_value = scrapy.Field()
    p_value_desc = scrapy.Field()
    method = scrapy.Field()
    method_desc = scrapy.Field()
    param_value = scrapy.Field()
    estimate_desc = scrapy.Field()
    dispersion_value = scrapy.Field()
    ci_n_sides = scrapy.Field()
    ci_upper_limit_na_comment = scrapy.Field()

    groups = scrapy.Field()

class ResultsOutcomeAnalysisGrp(scrapy.Item):
    group_id = scrapy.Field()

class ResultsOutcomeMeasure(scrapy.Item):
    outcome_measure_title = scrapy.Field()
    measure_description = scrapy.Field()
    unit_of_measure = scrapy.Field()
    measure_type = scrapy.Field()
    dispersion = scrapy.Field()

    categories = scrapy.Field()

class ResultsOutcomeMeasureCtgy(scrapy.Item):
    group_id = scrapy.Field()
    category_title = scrapy.Field()
    outcome_value = scrapy.Field()
    spread = scrapy.Field()
    lower_limit = scrapy.Field()
    upper_limit = scrapy.Field()


class ResultsParticFlows(scrapy.Item):
    period_title = scrapy.Field()
    recruitment_details = scrapy.Field()
    pre_assignment_details = scrapy.Field()

    groups = scrapy.Field()
    milestones = scrapy.Field()

class ResultsPartflowMlstn(scrapy.Item):
    milestone_type = scrapy.Field()
    milestone_title = scrapy.Field()

    groups = scrapy.Field()

class ResultsPartflowMlstnGrp(scrapy.Item):
    group_id = scrapy.Field()
    partflow_count = scrapy.Field()
    participant_description = scrapy.Field()







class TrialSpider(CrawlSpider):
    name = "clinicaltrials"
    allowed_domains = ["clinicaltrials.gov"]
    start_urls = ["https://clinicaltrials.gov/ct2/about-site/crawling"]

    rules = (
        Rule(LinkExtractor(allow=('ct2/crawl', ))),
        Rule(LinkExtractor(allow=('ct2/show/NCT', )), callback='parse_trial', follow=True, process_links='fix_link')
    )

    def fix_link(self, links):
        for link in links:
            link.url += '?resultsxml=true'
        return links

    def parse_trial(self, response):
        clinical_study = ClinicalStudy(nct_id=get_elem(response.xpath("/clinical_study/id_info/nct_id/text()").extract()),
                                       download_date=get_elem(response.xpath("/clinical_study/required_header/download_date/text()").extract()),
                                       org_study_id=get_elem(response.xpath("/clinical_study/id_info/org_study_id/text()").extract()),
                                       brief_title=get_elem(response.xpath("/clinical_study/brief_title/text()").extract()),
                                       official_title=get_elem(response.xpath("/clinical_study/official_title/text()").extract()),
                                       acronym=get_elem(response.xpath("/clinical_study/acronym/text()").extract()),
                                       source=get_elem(response.xpath("/clinical_study/source/text()").extract()),
                                       has_dmc=get_elem(response.xpath("/clinical_study/oversight_info/has_dmc/text()").extract()),
                                       brief_summary=remove_breaks(get_elem(response.xpath("/clinical_study/brief_summary/textblock/text()").extract())),
                                       detailed_description=remove_breaks(get_elem(response.xpath("/clinical_study/detailed_description/textblock/text()").extract())),
                                       overall_status=get_elem(response.xpath("/clinical_study/overall_status/text()").extract()),
                                       start_date=get_elem(response.xpath("/clinical_study/start_date/text()").extract()),
                                       completion_date=get_elem(response.xpath("/clinical_study/completion_date/text()").extract()),
                                       completion_date_type=get_elem(response.xpath("/clinical_study/completion_date/@type").extract()),
                                       primary_completion_date=get_elem(response.xpath("/clinical_study/primary_completion_date/text()").extract()),
                                       primary_completion_date_type=get_elem(response.xpath("/clinical_study/primary_completion_date/@type").extract()),
                                       phase=get_elem(response.xpath("/clinical_study/phase/text()").extract()),
                                       study_type=get_elem(response.xpath("/clinical_study/study_type/text()").extract()),
                                       study_design=get_elem(response.xpath("/clinical_study/study_design/text()").extract()),
                                       number_of_arms=get_elem(response.xpath("/clinical_study/number_of_arms/text()").extract()),
                                       number_of_groups=get_elem(response.xpath("/clinical_study/number_of_groups/text()").extract()),
                                       enrollment_type=get_elem(response.xpath("/clinical_study/enrollment/@type").extract()),
                                       enrollment=get_elem(response.xpath("/clinical_study/enrollment/text()").extract()),
                                       biospec_retention=get_elem(response.xpath("/clinical_study/biospec_retention/text()").extract()),
                                       biospec_descr=get_elem(response.xpath("/clinical_study/biospec_descr/text()").extract()),
                                       criteria=remove_breaks(get_elem(response.xpath("/clinical_study/eligibility/criteria/textblock/text()").extract())),
                                       gender=get_elem(response.xpath("/clinical_study/eligibility/gender/text()").extract()),
                                       minimum_age=get_elem(response.xpath("/clinical_study/eligibility/minimum_age/text()").extract()),
                                       maximum_age=get_elem(response.xpath("/clinical_study/eligibility/maximum_age/text()").extract()),
                                       healthy_volunteers=get_elem(response.xpath("/clinical_study/eligibility/healthy_volunteers/text()").extract()),
                                       sampling_method=get_elem(response.xpath("/clinical_study/eligibility/sampling_method/text()").extract()),
                                       study_pop=remove_breaks(get_elem(response.xpath("/clinical_study/eligibility/study_pop/textblock/text()").extract())),
                                       verification_date=get_elem(response.xpath("/clinical_study/verification_date/text()").extract()),
                                       lastchanged_date=get_elem(response.xpath("/clinical_study/lastchanged_date/text()").extract()),
                                       firstreceived_date=get_elem(response.xpath("/clinical_study/firstreceived_date/text()").extract()),
                                       is_section_801=get_elem(response.xpath("/clinical_study/is_section_801/text()").extract()),
                                       is_fda_regulated=get_elem(response.xpath("/clinical_study/is_fda_regulated/text()").extract()),
                                       why_stopped=get_elem(response.xpath("/clinical_study/why_stopped/text()").extract()),
                                       has_expanded_access=get_elem(response.xpath("/clinical_study/has_expanded_access/text()").extract()),
                                       firstreceived_results_date=get_elem(response.xpath("/clinical_study/firstreceived_results_date/text()").extract()),
                                       url=get_elem(response.xpath("/clinical_study/required_header/url/text()").extract()),
                                       target_duration=get_elem(response.xpath("/clinical_study/target_duration/text()").extract()),
                                       study_rank=None,
                                       limitations_and_caveats=get_elem(response.xpath("/clinical_study/clinical_results/limitations_and_caveats/text()").extract())
                                       )

        # procedure to fill list of objects based on element name
        def dim_list(path_loc, item_obj, repl_lookup={}, add_fields={}):
            '''
              path_loc is the xml path where each element can be found
              item_obj is the scrapy Item object representing this element
              repl_lookup is a dictionary of replacement terms (keys are scrapy Field names, values are xml element names)
              add_fields is a dictionary containing static values that should be inserted into each scrapy Item object
            '''
            elem_list = []
            for a in response.xpath(path_loc):
                # initialize scrapy Item object
                this_elem = item_obj()

                # loop through fields
                for f in item_obj.fields.keys():

                    #overwrite f if it's in the replacement lookup dictionary
                    if f in repl_lookup:
                        elem_f = repl_lookup[f]
                    else:
                        elem_f = f

                    if elem_f not in add_fields:
                        # write path to look for text
                        if elem_f == path_loc.split("/")[-1]:
                            sub_path = "text()"
                        else:
                            sub_path = "%s/text()" % elem_f

                        this_elem[f] = get_elem(a.xpath(sub_path).extract())

                this_elem.update(add_fields)
                elem_list.append(this_elem)

            return elem_list

        # single tables
        # starting with those that have only a single (non-ID) column
        clinical_study['authorities'] = dim_list("/clinical_study/oversight_info/authority", Authorities)
        clinical_study['central_contacts'] = dim_list("/clinical_study/overall_contact", 
                                                      CentralContacts, 
                                                      repl_lookup={'name_degree': 'last_name'}, 
                                                      add_fields={'contact_type': 'Overall Contact'}) + \
                                             dim_list("/clinical_study/overall_contact_backup", 
                                                      CentralContacts, 
                                                      repl_lookup={'name_degree': 'last_name'}, 
                                                      add_fields={'contact_type': 'Overall Contact Backup'})
        clinical_study['condition_browse'] = dim_list("/clinical_study/condition_browse/mesh_term", ConditionBrowse)
        clinical_study['conditions'] = dim_list("/clinical_study/condition", Conditions, {'condition_name': 'condition'})
        clinical_study['intervention_browse'] = dim_list("/clinical_study/intervention_browse/mesh_term", InterventionBrowse)
        clinical_study['keywords'] = dim_list("/clinical_study/keyword", Keywords)
        clinical_study['links'] = dim_list("/clinical_study/link", Links)
        clinical_study['location_countries'] = dim_list("/clinical_study/location_countries/country", LocationCountries)
        clinical_study['nct_aliases'] = dim_list("/clinical_study/id_info/nct_alias", NctAliases)
        clinical_study['overall_officials'] = dim_list("/clinical_study/overall_official", OverallOfficials, repl_lookup={'name_degree': 'last_name'})
        clinical_study['reference'] = dim_list("/clinical_study/reference",
                                               Reference,
                                               repl_lookup={'pmid': 'PMID'},
                                               add_fields={'reference_type': 'Reference'}) + \
                                      dim_list("/clinical_study/results_reference",
                                               Reference,
                                               repl_lookup={'pmid': 'PMID'},
                                               add_fields={'reference_type': 'Results Reference'})
        clinical_study['removed_countries'] = dim_list("/clinical_study/removed_countries/country", RemovedCountries)
        clinical_study['responsible_parties'] = dim_list("/clinical_study/responsible_party", ResponsibleParties)
        clinical_study['results_point_of_contact'] = dim_list("/clinical_study/clinical_results/point_of_contact", ResultsPointOfContact)
        clinical_study['results_restriction_agreements'] = dim_list("/clinical_study/clinical_results/certain_agreements", ResultsRestrictionAgreements)
        clinical_study['secondary_ids'] = dim_list("/clinical_study/id_info/secondary_id", SecondaryIds)
        clinical_study['sponsors'] = dim_list("/clinical_study/sponsors/lead_sponsor",
                                              Sponsors,
                                              add_fields={'sponsor_type': 'Lead Sponsor'}) + \
                                     dim_list("/clinical_study/sponsors/collaborator",
                                              Sponsors,
                                              add_fields={'sponsor_type': 'Collaborator'})
        clinical_study['study_outcome'] = dim_list("/clinical_study/primary_outcome",
                                                   StudyOutcome,
                                                   add_fields={"study_outcomes_type": "primary outcome"}) + \
                                          dim_list("/clinical_study/secondary_outcome",
                                                   StudyOutcome,
                                                   add_fields={"study_outcomes_type": "secondary outcome"}) + \
                                          dim_list("/clinical_study/other_outcome",
                                                   StudyOutcome,
                                                   add_fields={"study_outcomes_type": "other outcome"})

        designs = []
        if response.xpath("/clinical_study/study_design"):
            design_list = re.sub(r'\((.+?)\)', 
                                 lambda x: x.group(0).replace(", ","|"), 
                                 get_elem(response.xpath("/clinical_study/study_design/text()").extract())
                                ).split(", ")
            for d in design_list:
                if ": " in d:
                    design_name, design_value = d.split(": ")
                    masked_role = None
                    if design_name == 'Masking' and '(' in design_value:
                        masked_role = re.findall(r' \((.+?)\)', design_value)[0].replace("|",",")
                        design_value = re.sub(r' \(.+\)','',design_value)

                    this_design = Designs(design_name=design_name,
                                          design_value=design_value,
                                          masked_role=masked_role)

                    designs.append(this_design)

        clinical_study['designs'] = designs


        # locations
        facilities = []
        for fac in response.xpath("/clinical_study/location"):
            this_fac = Facilities(status=get_elem(fac.xpath("status/text()").extract()),
                                  facility_name=get_elem(fac.xpath("facility/name/text()").extract()),
                                  city=get_elem(fac.xpath("facility/address/city/text()").extract()),
                                  state=get_elem(fac.xpath("facility/address/state/text()").extract()),
                                  zip_=get_elem(fac.xpath("facility/address/zip/text()").extract()),
                                  country=get_elem(fac.xpath("facility/address/country/text()").extract())
                                  )

            contacts = []
            if fac.xpath("contact"):
              this_contact = FacilityContacts(contact_type='Contact',
                                              name_degree=get_elem(fac.xpath("contact/last_name/text()").extract()),
                                              phone=get_elem(fac.xpath("contact/phone/text()").extract()),
                                              phone_ext=get_elem(fac.xpath("contact/phone_ext/text()").extract()),
                                              email=get_elem(fac.xpath("contact/email/text()").extract())
                                              )
              contacts.append(this_contact)

            if fac.xpath("contact_backup"):
              this_contact = FacilityContacts(contact_type='Contact',
                                              name_degree=get_elem(fac.xpath("contact_backup/last_name/text()").extract()),
                                              phone=get_elem(fac.xpath("contact_backup/phone/text()").extract()),
                                              phone_ext=get_elem(fac.xpath("contact_backup/phone_ext/text()").extract()),
                                              email=get_elem(fac.xpath("contact_backup/email/text()").extract())
                                              )
              contacts.append(this_contact)

            this_fac['contacts'] = contacts

            investigators = []
            for invgtr in fac.xpath("investigator"):
              this_investigator = Investigators(name_degree=get_elem(invgtr.xpath("last_name/text()").extract()),
                                                role=get_elem(invgtr.xpath("role/text()").extract()),
                                                affiliation=get_elem(invgtr.xpath("affiliation/text()").extract())
                                                )
              investigators.append(this_investigator)
            
            this_fac['investigators'] = investigators

            facilities.append(this_fac)

        clinical_study['facilities'] = facilities


        # interventions
        interventions = []
        for inv in response.xpath("/clinical_study/intervention"):
            this_inv = Interventions(intervention_type=get_elem(inv.xpath("intervention_type/text()").extract()),
                                     intervention_name=get_elem(inv.xpath("intervention_name/text()").extract()),
                                     description=get_elem(inv.xpath("description/text()").extract())
                                     )

            arm_groups = []
            for ag in inv.xpath("arm_group_label"):
              this_ag = InterventionArmGroups(arm_group_label=get_elem(ag.xpath("text()").extract()))
              arm_groups.append(this_ag)

            this_inv['arm_groups'] = arm_groups

            other_names = []
            for n in inv.xpath("other_name"):
              this_n = InterventionOtherNames(other_name=get_elem(n.xpath("text()").extract()))
              other_names.append(this_n)

            this_inv['other_names'] = other_names

            interventions.append(this_inv)

        clinical_study['interventions'] = interventions


        # results
        # baseline
        baseline = []
        if response.xpath("/clinical_study/clinical_results/baseline"):
            base_xml = response.xpath("/clinical_study/clinical_results/baseline")
            this_baseline = ResultsBaseline(population=get_elem(base_xml.xpath("population/text()").extract()))

            #add groups to group list
            groups = []
            for g in base_xml.xpath("group_list/group"):
                this_group = ArmGroups(arm_group_label=get_elem(g.xpath("title/text()").extract()),
                                       arm_group_type="Baseline",
                                       description=get_elem(g.xpath("description/text()").extract()),
                                       group_id=get_elem(g.xpath("@group_id").extract())
                                       )
                groups.append(this_group)

            this_baseline['groups'] = groups

            # add measures
            measures = []
            for m in base_xml.xpath("measure_list/measure"):
                this_meas = ResultsBaselineMeasures(baseline_measure_title=get_elem(m.xpath("title/text()").extract()),
                                                    description=get_elem(m.xpath("description/text()").extract()),
                                                    units_of_measure=get_elem(m.xpath("units/text()").extract()),
                                                    measure_type=get_elem(m.xpath("param/text()").extract()),
                                                    dispersion=get_elem(m.xpath("dispersion/text()").extract())
                                                    )

                categories = []
                for c in m.xpath("category_list/category"):
                    for ms in c.xpath("measurement_list/measurement"):
                        this_cat = ResultsBaselineMeasureCatgy(group_id=get_elem(ms.xpath("@group_id").extract()),
                                                               category_title=get_elem(c.xpath("sub_title/text()").extract()),
                                                               baseline_value=get_elem(ms.xpath("@value").extract()),
                                                               spread=get_elem(ms.xpath("@spread").extract()),
                                                               lower_limit=get_elem(ms.xpath("@lower_limit").extract()),
                                                               upper_limit=get_elem(ms.xpath("@upper_limit").extract())
                                                               )
                        categories.append(this_cat)

                this_meas['categories'] = categories
                measures.append(this_meas)

            this_baseline['measures'] = measures

            baseline.append(this_baseline)

        clinical_study['results_baseline'] = baseline

        #reported events
        events = []
        event_types = {"Serious": "serious_events", "Other": "other_events"}
        if response.xpath("/clinical_study/clinical_results/reported_events"):
            base_xml = response.xpath("/clinical_study/clinical_results/reported_events")
            #look for serious and other events
            for e in event_types.keys():
                if base_xml.xpath(event_types[e]):
                    this_event = ReportedEvents(event_type=e,
                                                time_frame=get_elem(base_xml.xpath("time_frame/text()").extract()),
                                                description=get_elem(base_xml.xpath("desc/text()").extract()),
                                                frequency_threshold=get_elem(base_xml.xpath("%s/frequency_threshold/text()" % event_types[e]).extract()),
                                                default_vocab=get_elem(base_xml.xpath("%s/default_vocab/text()" % event_types[e]).extract()),
                                                default_assessment=get_elem(base_xml.xpath("%s/default_assessment/text()" % event_types[e]).extract())
                                                )

                    #add groups to group list
                    groups = []
                    for g in base_xml.xpath("group_list/group"):
                        this_group = ArmGroups(arm_group_label=get_elem(g.xpath("title/text()").extract()),
                                               arm_group_type="Reported Event",
                                               description=get_elem(g.xpath("description/text()").extract()),
                                               group_id=get_elem(g.xpath("@group_id").extract())
                                               )
                        groups.append(this_group)

                    this_event['groups'] = groups

                    #add categories
                    categories = []
                    for c in base_xml.xpath("%s/category_list/category" % event_types[e]):
                        for ev in c.xpath("event_list/event"):
                            this_cat = ReportedEventCtgy(category_title=get_elem(c.xpath("title/text()").extract()),
                                                         category_sub_title=get_elem(ev.xpath("sub_title/text()").extract()),
                                                         category_description=get_elem(ev.xpath("description/text()").extract()),
                                                         category_assessment=get_elem(ev.xpath("assessment/text()").extract())
                                                         )

                            # add counts
                            counts = []
                            for cnt in ev.xpath("counts"):
                                this_count = ReportedEventCtgyGrp(group_id=get_elem(cnt.xpath("@group_id").extract()),
                                                                  subjects_affected=get_elem(cnt.xpath("@subjects_affected").extract()),
                                                                  subjects_at_risk=get_elem(cnt.xpath("@subjects_at_risk").extract()),
                                                                  events=get_elem(cnt.xpath("@events").extract())
                                                                  )
                                counts.append(this_count)

                            this_cat['groups'] = counts

                            categories.append(this_cat)

                    this_event['categories'] = categories

                    events.append(this_event)

        clinical_study['results_events'] = events

        # participant flows
        flows = []
        for f in response.xpath('/clinical_study/clinical_results/participant_flow'):

            # first get groups
            groups = []
            for g in f.xpath("group_list/group"):
                this_group = ArmGroups(arm_group_label=get_elem(g.xpath("title/text()").extract()),
                                       arm_group_type="Participant Flow",
                                       description=get_elem(g.xpath("description/text()").extract()),
                                       group_id=get_elem(g.xpath("@group_id").extract())
                                       )
                groups.append(this_group)

            # cycle through periods
            for p in f.xpath('period_list/period'):
                this_flow = ResultsParticFlows(period_title=get_elem(p.xpath("title/text()").extract()),
                                               recruitment_details=get_elem(f.xpath("recruitment_details/text()").extract()),
                                               pre_assignment_details=get_elem(f.xpath("pre_assignment_details/text()").extract()),
                                               groups=groups
                                               )

                m_types = {'milestone': 'Milestone', 'drop_withdraw_reason': 'Drop Withdraw Reason'}
                milestones = []
                for mt in m_types.keys():
                    for m in p.xpath("%s_list/%s" % (mt, mt)):
                        this_mlstn = ResultsPartflowMlstn(milestone_type=m_types[mt],
                                                          milestone_title=get_elem(m.xpath('title/text()').extract())
                                                          )

                        mgroups = []
                        for mg in m.xpath("participants_list/participants"):
                            this_mg = ResultsPartflowMlstnGrp(group_id=get_elem(mg.xpath("@group_id").extract()),
                                                              partflow_count=get_elem(mg.xpath("@count").extract()),
                                                              participant_description=get_elem(mg.xpath("text()").extract())
                                                              )
                            mgroups.append(this_mg)

                        this_mlstn['groups'] = mgroups

                        milestones.append(this_mlstn)

                this_flow['milestones'] = milestones

                flows.append(this_flow)

        clinical_study['results_flows'] = flows

        # outcomes
        outcomes = []
        for out in response.xpath('/clinical_study/clinical_results/outcome_list/outcome'):

            this_out = ResultsOutcomes(outcome_type=get_elem(out.xpath("type/text()").extract()),
                                       outcome_title=get_elem(out.xpath("title/text()").extract()),
                                       time_frame=get_elem(out.xpath("time_frame/text()").extract()),
                                       safety_issue=get_elem(out.xpath("safety_issue/text()").extract()),
                                       outcome_description=get_elem(out.xpath("description/text()").extract()),
                                       population=get_elem(out.xpath("population/text()").extract()),
                                       posting_date=get_elem(out.xpath("posting_date/text()").extract())
                                       )

            groups = []
            for g in out.xpath("group_list/group"):
                this_group = ArmGroups(arm_group_label=get_elem(g.xpath("title/text()").extract()),
                                       arm_group_type="Results Outcome",
                                       description=get_elem(g.xpath("description/text()").extract()),
                                       group_id=get_elem(g.xpath("@group_id").extract())
                                       )
                groups.append(this_group)

            this_out['groups'] = groups

            analysis = []
            for a in out.xpath("analysis_list/analysis"):
                this_a = ResultsOutcomeAnalysis(param_type=get_elem(a.xpath("param_type/text()").extract()),
                                                dispersion_type=get_elem(a.xpath("dispersion_type/text()").extract()),
                                                ci_percent=get_elem(a.xpath("ci_percent/text()").extract()),
                                                ci_lower_limit=get_elem(a.xpath("ci_lower_limit/text()").extract()),
                                                ci_upper_limit=get_elem(a.xpath("ci_upper_limit/text()").extract()),
                                                groups_desc=get_elem(a.xpath("groups_desc/text()").extract()),
                                                non_inferiority=get_elem(a.xpath("non_inferiority/text()").extract()),
                                                non_inferiority_desc=get_elem(a.xpath("non_inferiority_desc/text()").extract()),
                                                p_value=get_elem(a.xpath("p_value/text()").extract()),
                                                p_value_desc=get_elem(a.xpath("p_value_desc/text()").extract()),
                                                method=get_elem(a.xpath("method/text()").extract()),
                                                method_desc=get_elem(a.xpath("method_desc/text()").extract()),
                                                param_value=get_elem(a.xpath("param_value/text()").extract()),
                                                estimate_desc=get_elem(a.xpath("estimate_desc/text()").extract()),
                                                dispersion_value=get_elem(a.xpath("dispersion_value/text()").extract()),
                                                ci_n_sides=get_elem(a.xpath("ci_n_sides/text()").extract()),
                                                ci_upper_limit_na_comment=get_elem(a.xpath("ci_upper_limit_na_comment/text()").extract())
                                                )

                agroups = []
                for ag in a.xpath("group_id_list/group_id"):
                    this_ag = ResultsOutcomeAnalysisGrp(group_id=get_elem(ag.xpath("text()").extract()))
                    agroups.append(this_ag)

                this_a['groups'] = agroups

                analysis.append(this_a)

            this_out['analysis'] = analysis

            measure = []
            for m in out.xpath("measure_list/measure"):
                this_m = ResultsOutcomeMeasure(outcome_measure_title=get_elem(m.xpath("title/text()").extract()),
                                               measure_description=get_elem(m.xpath("description/text()").extract()),
                                               unit_of_measure=get_elem(m.xpath("units/text()").extract()),
                                               measure_type=get_elem(m.xpath("param/text()").extract()),
                                               dispersion=get_elem(m.xpath("dispersion/text()").extract())
                                               )

                mcats = []
                for c in m.xpath("category_list/category"):
                    for mt in c.xpath("measurement_list/measurement"):
                        this_c = ResultsOutcomeMeasureCtgy(group_id=get_elem(mt.xpath("@group_id").extract()),
                                                           category_title=get_elem(c.xpath("sub_title/text()").extract()),
                                                           outcome_value=get_elem(mt.xpath("@value").extract()),
                                                           spread=get_elem(mt.xpath("@spread").extract()),
                                                           lower_limit=get_elem(mt.xpath("@lower_limit").extract()),
                                                           upper_limit=get_elem(mt.xpath("@upper_limit").extract())
                                                           )

                        mcats.append(this_c)

                this_m['categories'] = mcats

                measure.append(this_m)

            this_out['measure'] = measure

            outcomes.append(this_out)

        clinical_study['results_outcomes'] = outcomes

        # other arm groups
        arm_groups = []
        for g in response.xpath("/clinical_study/arm_group"):
            this_g = ArmGroups(arm_group_label=get_elem(g.xpath("arm_group_label/text()").extract()),
                               arm_group_type=get_elem(g.xpath("arm_group_type/text()").extract()),
                               description=get_elem(g.xpath("description/text()").extract()),
                               )
            arm_groups.append(this_g)

        clinical_study['arm_groups'] = arm_groups


        return clinical_study


