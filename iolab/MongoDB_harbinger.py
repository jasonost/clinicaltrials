import cPickle as pickle
from pymongo import MongoClient
from connect import mongouri

c = MongoClient(mongouri)

db = c.clinicaltrials

cond_final = pickle.load(open('condition_json.pkl','rb'))
inst_final = pickle.load(open('institution_json.pkl','rb'))

db.conditions.drop()
cond_coll = db.conditions
oids = cond_coll.insert(cond_final.values())

db.institutions.drop()
inst_coll = db.institutions
oids = inst_coll.insert(inst_final.values())
