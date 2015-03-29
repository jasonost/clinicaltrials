#!../clinicaltrials/env/bin/python
# -*- coding: utf-8 -*-
from ctapp import app
import flask, pymongo, time
from flask import request, url_for

# SQLAlchemy setup
from sqlalchemy import create_engine
from sqlalchemy.sql import func, select
from connect import mysqlusername, mysqlpassword, mysqlserver, mysqldbname
from db_tables import metadata, InstitutionDescription, InstitutionLookup, ConditionDescription, ConditionLookup

def initializeDB(user,pwd,server,dbname):
    engine = create_engine('mysql://%s:%s@%s/%s' % (user,pwd,server,dbname), pool_recycle=3600)
    conn = engine.connect()
    metadata.create_all(engine)
    return conn

mysqlserver = 'localhost'
conn = initializeDB(mysqlusername, mysqlpassword, mysqlserver, mysqldbname)

# initializing global variables
inst_rating_info = 'These currently do not have any meaning.'
inst_trials_active_info = "Trials that are recruiting or active."
cond_name_mesh_info = 'This is the official Medical Subject Heading (MeSH) term for this condition.'

#db = pymongo.MongoClient(mongouri).clinicaltrials

# homepage
@app.route('/')
def home():
    return flask.render_template('index.html',
                                 is_home=True)

# institution page
@app.route('/institution')
def institution():
    params = request.args
    if 'inst' in params:
        for i in range(5):
            try:
                inst_data = conn.execute(InstitutionDescription.\
                                            select().\
                                            where(InstitutionDescription.c.institution_id == int(params['inst']))).\
                                        fetchone()
                trial_cnt = conn.execute(select([InstitutionLookup.c.institution_id, 
                                            func.count(InstitutionLookup.c.nct_id)]).\
                                            where(InstitutionLookup.c.institution_id == int(params['inst'])).\
                                            group_by(InstitutionLookup.c.institution_id)).\
                                        fetchone()
                if inst_data:
                    return flask.render_template('institution.html',
                                                inst_name=inst_data[1],
                                                inst_loc=inst_data[3],
                                                inst_img=inst_data[4],
                                                inst_summary=inst_data[5].decode('utf-8') or 'No description available',
                                                #trials_active=inst_data['inst_trials_active'],
                                                #inst_trials_active_info=inst_trials_active_info,
                                                #inst_researchers=inst_data['inst_researchers'],
                                                #inst_pubs=inst_data['inst_pubs'],
                                                #inst_cond_top=inst_data['inst_cond_top'],
                                                #inst_rating=inst_data['inst_rating'],
                                                #inst_rating_info=inst_rating_info
                                                )
            except:
                print 'Database connection error'
                initializeDB(mysqlusername, mysqlpassword, mysqlserver, mysqldbname)

    return flask.redirect(url_for('home'))

# top conditions JSON
@app.route('/_top_condition')
def top_condition():
    params = request.args
    if 'inst' in params:

        for i in range(5):
            try:
                inst_cond_top = db.institutions.find_one({'inst_id': str(params['inst'])})['inst_cond_top']
                if inst_cond_top:
                    return flask.jsonify(result=inst_cond_top)
            except:
                print 'Database connection error'

    return flask.jsonify(None)

# condition page
@app.route('/condition')
def condition():
    params = request.args
    if 'cond' in params:

        for i in range(5):
            try:
                cond_data = db.conditions.find_one({'cond_id': int(params['cond'])})
                if cond_data:
                    return flask.render_template('condition.html', 
                                                cond_name=cond_data['cond_name'],
                                                cond_name_mesh=cond_data['cond_name_mesh'],
                                                cond_summary=cond_data['cond_summary'],
                                                cond_synonyms=cond_data['cond_synonyms'],
                                                trials_active=cond_data['cond_trials_active'],
                                                institution_list=cond_data['cond_inst_top'],
                                                cond_name_mesh_info=cond_name_mesh_info
                                                )
            except:
                print 'Database connection error'
    
    return flask.redirect(url_for('home'))


# old ClinicalTrials Browser infoviz project
@app.route('/browser')
def browser():
    return flask.render_template('browser.html')
