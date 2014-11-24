import pymongo
from connect import mongoip

client = pymongo.MongoClient(mongoip, 27017)

db = client['ctdb']
conds = db.conds
cond = {'condition': 'Cancer', 'facilities': [1,2,3]}
cond_id = conds.insert(cond)

