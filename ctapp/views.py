#!../clinicaltrials/env/bin/python

from ctapp import app
import flask
from flask import request
import pymongo
from connect import mongoip

# initializing global variables
#mongoip = 'localhost'
inst_rating_info = 'These currently do not have any meaning.'
cond_name_mesh_info = 'MeSH is a hierarchy of medical subject headings.'

def mongo_connect(ip):
    conn = pymongo.MongoClient(host=ip)
    db = conn.ctdb
    return db

# homepage
@app.route('/')
def home():
    return flask.render_template('index.html')

# institution page
@app.route('/institution')
def institution():
    return flask.render_template('institution.html')

# condition page
@app.route('/condition')
def condition():
    params = request.args
    if 'cond' in params:
        db = mongo_connect(mongoip)
        cond_data = db.conditions.find_one({'cond_id': str(params['cond'])})
        return flask.render_template('condition.html', 
                                     cond_name=cond_data['cond_name'],
                                     cond_name_mesh=cond_data['cond_name_mesh'],
                                     cond_summary=cond_data['cond_summary'],
                                     cond_synonyms=cond_data['cond_synonyms'],
                                     cond_trials_active=cond_data['cond_trials_active'],
                                     cond_inst_top=cond_data['cond_inst_top'],
                                     cond_name_mesh_info=cond_name_mesh_info
                                     )
    else:
        return flask.render_template('index.html')


# old ClinicalTrials Browser infoviz project
@app.route('/browser')
def browser():
    return flask.render_template('browser.html')

