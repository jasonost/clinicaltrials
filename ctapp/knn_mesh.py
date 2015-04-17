from gensim import corpora, models, similarities, utils
import gensim, simserver
from collections import defaultdict

from sqlalchemy import create_engine
from sqlalchemy.sql import text, func, select, and_, or_, not_, desc
from connect import mysqlusername, mysqlpassword, mysqlserver, mysqldbname
from db_tables import metadata, InstitutionDescription, InstitutionLookup, ConditionDescription, \
    ConditionLookup, InstitutionSponsors, InstitutionFacilities, InstitutionRatings, TrialSummary, \
    Interventions, Conditions, ConditionSynonym, ClinicalStudy, Investigators, TrialRatings, \
    Users, MeshAssignStaging, UserHistoryMesh, CriteriaConceptStaging, UserHistoryCriteria

def initializeDB(user,pwd,server,dbname):
    engine = create_engine('mysql://%s:%s@%s/%s?charset=utf8' % (user,pwd,server,dbname),
                           pool_recycle=3600)
    conn = engine.connect()
    metadata.create_all(engine)
    return conn

mysqlserver = 'localhost'
conn = initializeDB(mysqlusername, mysqlpassword, mysqlserver, mysqldbname)









server = simserver.SessionServer('/groups/clinicaltrials/clinicaltrials/data/docsim_server')

doc = '''
        The purpose of this study is to determine whether patients at high risk for postoperative nausea and vomiting can benefit from aprepitant, ondansetron and dexamethasone in the perioperative period. High risk surgical patients for PONV, scheduled for laparoscopic surgery will be distributed in two groups: Group I will receive aprepitant 80 mg per os and Group II will receive placebo per os, one hour before surgery. In the operating room, patients will be submitted to combined intravenous general anesthesia plus spinal anesthesia. All patients will receive dexamethasone 4 mg and ondansetron 4 mg intravenously during the surgical procedure. After surgery, patients will be monitored for pain, nausea and vomiting during 24 hours.
      '''

for i in range(5):
    try:
        knn_10 = server.find_similar({'tokens': utils.simple_preprocess(doc)}, min_score=0.2, max_results=10)
        break
    except Exception, e:
        print e
        server = simserver.SessionServer('/groups/clinicaltrials/clinicaltrials/data/docsim_server')

distances = {t[0]: t[1] for t in knn_10}

sim_terms = conn.execute(select([ConditionLookup.c.nct_id,
                                 ConditionDescription.c.mesh_term]).\
                            select_from(ConditionLookup.join(ConditionDescription,
                                and_(ConditionLookup.c.condition_id == ConditionDescription.c.condition_id,
                                    ConditionLookup.c.nct_id.in_(distances.keys()),
                                    ConditionLookup.c.source == 'CTGOV',
                                    ConditionLookup.c.syn_flag == 0)))).\
                        fetchall()

sim_term_dict = defaultdict(set)
for nct_id, mesh in sim_terms:
    sim_term_dict[nct_id].add(mesh)

this_pred = defaultdict(float)

for n in distances:
    for m in sim_term_dict[n]:
        this_pred[m] += distances[n]

val_order = [m for m, d in sorted(this_pred.items(), key=lambda x: x[1], reverse=True)]

for v in val_order:
    print v




