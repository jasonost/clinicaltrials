# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from connect import mysqlusername, mysqlpassword, mysqlserver, mysqldbname
from collections import defaultdict
from scrapy import log

from sqlalchemy.sql import func, select, and_, or_, not_, desc, bindparam
from db_tables2 import *

mysqlserver = 'localhost'
mysqldbname = 'clinicaltrials2'

# procedure to insert data into a single table that is attached to clinical_study


class ClinicalStudyUpsert(object):
    def __init__(self):
        self.engine = create_engine('mysql://%s:%s@%s/%s' % (mysqlusername, mysqlpassword, mysqlserver, mysqldbname))
        self.conn = self.engine.connect()
        metadata.create_all(self.engine)

    def write_table(self, table_obj, item_objs, nct_id):
        '''
            table_obj is the sqlalchemy table object representing the MySQL table
            item_objs is a list of scrapy Item objects this element
            nct_id is the main clinical_study Item's nct_id
        '''
        to_ins = [dict([('nct_id', nct_id)] + e.items()) for e in item_objs]
        if len(to_ins) > 0:
            ins = self.conn.execute(table_obj.insert(), to_ins)

    def process_item(self, item, spider):
      try:
        #log.msg(item['nct_id'], level=log.INFO)
        lastchanged = self.conn.execute(select([ClinicalStudy.c.lastchanged_date]).where(ClinicalStudy.c.nct_id == item['nct_id'])).fetchone()
        if lastchanged:
            # check to see if lastchanged is less than the current record's value
            # for now just assuming that we're starting with an empty database
            pass
        else:
            ins = self.conn.execute(ClinicalStudy.insert(), [{k.name: item[k.name] for k in ClinicalStudy.columns}])

            # writing simple tables
            self.write_table(Authorities, item['authorities'], item['nct_id'])
            self.write_table(CentralContacts, item['central_contacts'], item['nct_id'])
            self.write_table(ConditionBrowse, item['condition_browse'], item['nct_id'])
            self.write_table(Conditions, item['conditions'], item['nct_id'])
            self.write_table(Designs, item['designs'], item['nct_id'])
            self.write_table(InterventionBrowse, item['intervention_browse'], item['nct_id'])
            self.write_table(Keywords, item['keywords'], item['nct_id'])
            self.write_table(Links, item['links'], item['nct_id'])
            self.write_table(LocationCountries, item['location_countries'], item['nct_id'])
            self.write_table(NctAliases, item['nct_aliases'], item['nct_id'])
            self.write_table(OverallOfficials, item['overall_officials'], item['nct_id'])
            self.write_table(Reference, item['reference'], item['nct_id'])
            self.write_table(RemovedCountries, item['removed_countries'], item['nct_id'])
            self.write_table(ResponsibleParties, item['responsible_parties'], item['nct_id'])
            self.write_table(ResultsPointOfContact, item['results_point_of_contact'], item['nct_id'])
            self.write_table(ResultsRestrictionAgreements, item['results_restriction_agreements'], item['nct_id'])
            self.write_table(SecondaryIds, item['secondary_ids'], item['nct_id'])
            self.write_table(Sponsors, item['sponsors'], item['nct_id'])
            self.write_table(StudyOutcome, item['study_outcome'], item['nct_id'])


            # facilities, contacts, and investigators
            for fac in item['facilities']:
                ins = self.conn.execute(Facilities.insert(), [{'nct_id': item['nct_id'],
                                                               'status': fac['status'],
                                                               'facility_name': fac['facility_name'],
                                                               'city': fac['city'],
                                                               'state': fac['state'],
                                                               'zip': fac['zip_'],
                                                               'country': fac['country']}])

                fac_id = ins.inserted_primary_key[0]
                for contact in fac['contacts']:
                    ins = self.conn.execute(FacilityContacts.insert(), [{'facility_id': fac_id,
                                                                         'nct_id': item['nct_id'],
                                                                         'contact_type': contact['contact_type'],
                                                                         'name_degree': contact['name_degree'],
                                                                         'phone': contact['phone'],
                                                                         'phone_ext': contact['phone_ext'],
                                                                         'email': contact['email']}])
                
                for invgtr in fac['investigators']:
                    ins = self.conn.execute(Investigators.insert(), [{'facility_id': fac_id,
                                                                      'nct_id': item['nct_id'],
                                                                      'name_degree': invgtr['name_degree'],
                                                                      'role': invgtr['role'],
                                                                      'affiliation': invgtr['affiliation']}])


            # interventions, including arm groups and other names
            for inv in item['interventions']:
                ins = self.conn.execute(Interventions.insert(), [{'nct_id': item['nct_id'],
                                                                  'intervention_type': inv['intervention_type'],
                                                                  'intervention_name': inv['intervention_name'],
                                                                  'description': inv['description']}])

                inv_id = ins.inserted_primary_key[0]
                for ag in inv['arm_groups']:
                    ins = self.conn.execute(InterventionArmGroups.insert(), [{'intervention_id': inv_id,
                                                                              'nct_id': item['nct_id'],
                                                                              'arm_group_label': ag['arm_group_label']}])
                
                for n in inv['other_names']:
                    ins = self.conn.execute(InterventionOtherNames.insert(), [{'intervention_id': inv_id,
                                                                               'nct_id': item['nct_id'],
                                                                               'other_name': n['other_name']}])


            # results 
            # arm groups not specifically associated with result data
            if item['arm_groups']:
                ins = self.conn.execute(ArmGroups.insert(), [{'nct_id': item['nct_id'],
                                                              'arm_group_label': gr['arm_group_label'],
                                                              'arm_group_type': gr['arm_group_type'],
                                                              'description': gr['description']
                                                              } for gr in item['arm_groups']])

            # baseline
            for bl in item['results_baseline']:

                # save dictionary of arm_group_id's
                group_ids = defaultdict(str)
                for g in bl['groups']:
                    ins = self.conn.execute(ArmGroups.insert(), [{'nct_id': item['nct_id'],
                                                                  'arm_group_label': g['arm_group_label'],
                                                                  'arm_group_type': g['arm_group_type'],
                                                                  'description': g['description'],
                                                                  'group_id': g['group_id']}])
                    group_ids[g['group_id']] = ins.inserted_primary_key[0]

                ins = self.conn.execute(ResultsBaseline.insert(), [{'nct_id': item['nct_id'],
                                                                    'population': bl['population']}])

                bid = ins.inserted_primary_key[0]

                # insert measures and categories
                for m in bl['measures']:
                    ins = self.conn.execute(ResultsBaselineMeasures.insert(), [{'nct_id': item['nct_id'],
                                                                                'rslts_baseline_id': bid,
                                                                                'baseline_measure_title': m['baseline_measure_title'],
                                                                                'description': m['description'],
                                                                                'units_of_measure': m['units_of_measure'],
                                                                                'measure_type': m['measure_type'],
                                                                                'dispersion': m['dispersion']
                                                                                }])

                    m_id = ins.inserted_primary_key[0]

                    if m['categories']:
                        ins = self.conn.execute(ResultsBaselineMeasureCatgy.insert(), [{'baseline_id': m_id,
                                                                                        'category_title': c['category_title'],
                                                                                        'baseline_value': c['baseline_value'],
                                                                                        'spread': c['spread'],
                                                                                        'lower_limit': c['lower_limit'],
                                                                                        'upper_limit': c['upper_limit'],
                                                                                        'arm_group_id': group_ids[c['group_id']]
                                                                                        } for c in m['categories']])

            # events
            for ev in item['results_events']:

                # save dictionary of arm_group_id's
                group_ids = defaultdict(str)
                for g in ev['groups']:
                    ins = self.conn.execute(ArmGroups.insert(), [{'nct_id': item['nct_id'],
                                                                  'arm_group_label': g['arm_group_label'],
                                                                  'arm_group_type': g['arm_group_type'],
                                                                  'description': g['description'],
                                                                  'group_id': g['group_id']}])
                    group_ids[g['group_id']] = ins.inserted_primary_key[0]

                ins = self.conn.execute(ReportedEvents.insert(), [{'nct_id': item['nct_id'],
                                                                   'event_type': ev['event_type'],
                                                                   'time_frame': ev['time_frame'],
                                                                   'description': ev['description'],
                                                                   'frequency_threshold': ev['frequency_threshold'],
                                                                   'default_vocab': ev['default_vocab'],
                                                                   'default_assessment': ev['default_assessment']}])

                ev_id = ins.inserted_primary_key[0]

                # insert categories and groups
                for c in ev['categories']:
                    ins = self.conn.execute(ReportedEventCtgy.insert(), [{'reported_event_id': ev_id,
                                                                          'category_title': c['category_title'],
                                                                          'category_sub_title': c['category_sub_title'],
                                                                          'category_description': c['category_description'],
                                                                          'category_assessment': c['category_assessment']}])

                    c_id = ins.inserted_primary_key[0]

                    if c['groups']:
                        ins = self.conn.execute(ReportedEventCtgyGrp.insert(), [{'reported_event_category_id': c_id,
                                                                                 'arm_group_id': group_ids[gr['group_id']],
                                                                                 'subjects_affected': gr['subjects_affected'],
                                                                                 'subjects_at_risk': gr['subjects_at_risk'],
                                                                                 'events': gr['events']
                                                                                 } for gr in c['groups']])

            # participant flows
            for fl in item['results_flows']:

                # save dictionary of arm_group_id's
                group_ids = defaultdict(str)
                for g in fl['groups']:
                    ins = self.conn.execute(ArmGroups.insert(), [{'nct_id': item['nct_id'],
                                                                  'arm_group_label': g['arm_group_label'],
                                                                  'arm_group_type': g['arm_group_type'],
                                                                  'description': g['description'],
                                                                  'group_id': g['group_id']}])
                    group_ids[g['group_id']] = ins.inserted_primary_key[0]

                ins = self.conn.execute(ResultsParticFlows.insert(), [{'nct_id': item['nct_id'],
                                                                       'period_title': fl['period_title'],
                                                                       'recruitment_details': fl['recruitment_details'],
                                                                       'pre_assignment_details': fl['pre_assignment_details'],
                                                                       }])

                fl_id = ins.inserted_primary_key[0]

                # insert milestones and group associations
                for m in fl['milestones']:
                    ins = self.conn.execute(ResultsPartflowMlstn.insert(), [{'participant_flow_id': fl_id,
                                                                             'milestone_type': m['milestone_type'],
                                                                             'milestone_title': m['milestone_title']
                                                                             }])
                    m_id = ins.inserted_primary_key[0]

                    if m['groups']:
                        ins = self.conn.execute(ResultsPartflowMlstnGrp.insert(), [{'milestone_id': m_id,
                                                                                    'arm_group_id': group_ids[gr['group_id']],
                                                                                    'partflow_count': gr['partflow_count'],
                                                                                    'participant_description': gr['participant_description']
                                                                                    } for gr in m['groups']])

            # outcomes
            for out in item['results_outcomes']:

                group_ids = defaultdict(str)
                for g in out['groups']:
                    ins = self.conn.execute(ArmGroups.insert(), [{'nct_id': item['nct_id'],
                                                                  'arm_group_label': g['arm_group_label'],
                                                                  'arm_group_type': g['arm_group_type'],
                                                                  'description': g['description'],
                                                                  'group_id': g['group_id']}])
                    group_ids[g['group_id']] = ins.inserted_primary_key[0]

                ins = self.conn.execute(ResultsOutcomes.insert(), [{'nct_id': item['nct_id'],
                                                                    'outcome_type': out['outcome_type'],
                                                                    'outcome_title': out['outcome_title'],
                                                                    'time_frame': out['time_frame'],
                                                                    'safety_issue': out['safety_issue'],
                                                                    'outcome_description': out['outcome_description'],
                                                                    'population': out['population'],
                                                                    'posting_date': out['posting_date']
                                                                    }])

                out_id = ins.inserted_primary_key[0]

                # insert analysis objects
                for an in out['analysis']:
                    ins = self.conn.execute(ResultsOutcomeAnalysis.insert(), [{'outcome_id': out_id,
                                                                               'param_type': an['param_type'],
                                                                               'dispersion_type': an['dispersion_type'],
                                                                               'ci_percent': an['ci_percent'],
                                                                               'ci_lower_limit': an['ci_lower_limit'],
                                                                               'ci_upper_limit': an['ci_upper_limit'],
                                                                               'groups_desc': an['groups_desc'],
                                                                               'non_inferiority': an['non_inferiority'],
                                                                               'non_inferiority_desc': an['non_inferiority_desc'],
                                                                               'p_value': an['p_value'],
                                                                               'p_value_desc': an['p_value_desc'],
                                                                               'method': an['method'],
                                                                               'method_desc': an['method_desc'],
                                                                               'param_value': an['param_value'],
                                                                               'estimate_desc': an['estimate_desc'],
                                                                               'dispersion_value': an['dispersion_value'],
                                                                               'ci_n_sides': an['ci_n_sides'],
                                                                               'ci_upper_limit_na_comment': an['ci_upper_limit_na_comment']
                                                                               }])
                    an_id = ins.inserted_primary_key[0]

                    if an['groups']:
                        try:
                            ins = self.conn.execute(ResultsOutcomeAnalysisGrp.insert(), [{'results_outcome_analysis_id': an_id,
                                                                                          'arm_group_id': group_ids[gr['group_id']]
                                                                                          } for gr in an['groups']])
                        except Exception, e:
                            log.msg("Error (analysis): %s" % e, level=log.INFO)
                            log.msg(group_ids, level=log.INFO)
                            log.msg(an, level=log.INFO)

                # insert measure objects
                for me in out['measure']:
                    ins = self.conn.execute(ResultsOutcomeMeasure.insert(), [{'outcome_id': out_id,
                                                                              'outcome_measure_title': me['outcome_measure_title'],
                                                                              'measure_description': me['measure_description'],
                                                                              'unit_of_measure': me['unit_of_measure'],
                                                                              'measure_type': me['measure_type'],
                                                                              'dispersion': me['dispersion']}])
                    me_id = ins.inserted_primary_key[0]

                    if me['categories']:
                        try:
                            ins = self.conn.execute(ResultsOutcomeMeasureCtgy.insert(), [{'outcome_measure_id': me_id,
                                                                                          'category_title': gr['category_title'],
                                                                                          'arm_group_id': group_ids[gr['group_id']],
                                                                                          'outcome_value': gr['outcome_value'],
                                                                                          'spread': gr['spread'],
                                                                                          'lower_limit': gr['lower_limit'],
                                                                                          'upper_limit': gr['upper_limit']
                                                                                          } for gr in me['categories']])
                        except Exception, e:
                            log.msg("Error (measure): %s ;;; %s" % (e, str(group_ids)), level=log.INFO)
                            log.msg(group_ids, level=log.INFO)
                            log.msg(me, level=log.INFO)




      except Exception, e:
        log.msg("Error (overall): %s" % e, level=log.INFO)
        log.msg("Didn't insert NCT_ID %s" % item['nct_id'], level=log.INFO)

      return item

