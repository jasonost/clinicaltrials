#!../clinicaltrials/env/bin/python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from ctapp import app
import flask, pymongo, time
from flask import request, url_for

# SQLAlchemy setup
from sqlalchemy import create_engine
from sqlalchemy.sql import func, select, and_, or_, not_, desc
from connect import mysqlusername, mysqlpassword, mysqlserver, mysqldbname
from db_tables import metadata, InstitutionDescription, InstitutionLookup, ConditionDescription, ConditionLookup, InstitutionSponsors, InstitutionFacilities

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

def construct_address(city,state,zipcode,country):
    if city:
        if country == 'United States':
            return '%s, %s %s<br/>%s' % (city, state, zipcode, country)
        else:
            return '%s, %s' % (city, country)
    else:
        return 'No location information provided' 


#db = pymongo.MongoClient(mongouri).clinicaltrials

# homepage
@app.route('/')
def home():
    return flask.render_template('index.html',
                                 is_home=True)



# search results
@app.route('/search_results')
def search_results():

    params = request.args
    inst_path = url_for('institution')

    # procedure to bold search term
    def bold_term(qtype, qid, name, term, num_trials):
        term_pos = name.lower().find(term)
        term_end = term_pos + len(term)
        bold_name = name[:term_pos] + '<span style="font-weight:bold">' + name[term_pos:term_end] + '</span>' + name[term_end:]
        print bold_name
        return '<p><a href="%s?%s=%s">%s</a> (%d trials)</p>' % (inst_path, qtype, qid, bold_name, num_trials)

    if 'q' in params:
        s_term = params['q'].lower()
        for i in range(5):
            try:
                cond = conn.execute(select([ConditionDescription.c.condition_id,
                                                ConditionDescription.c.mesh_term,
                                                func.count(ConditionLookup.c.nct_id).label('cnt')]).
                                            select_from(ConditionDescription.join(ConditionLookup,
                                                    ConditionDescription.c.condition_id == ConditionLookup.c.condition_id)).\
                                            where(func.lower(ConditionDescription.c.mesh_term).contains(s_term)).\
                                            group_by(ConditionDescription.c.condition_id,
                                                ConditionDescription.c.mesh_term).\
                                            order_by(desc('cnt'))).\
                                        fetchall()
                inst = conn.execute(InstitutionDescription.\
                                            select().\
                                            where(func.lower(InstitutionDescription.c.name).contains(s_term)).\
                                            order_by(desc(InstitutionDescription.c.trial_count))).\
                                        fetchall()
                
                cond_list = [bold_term('cond', t[0], t[1].decode('utf-8'), s_term, t[2]) for t in cond]
                inst_list = [bold_term('inst', t[0], t[1].decode('utf-8'), s_term, t[8]) for t in inst if t[2] == 'GOLD']
                spon_list = [bold_term('inst', t[0], t[1].decode('utf-8'), s_term, t[8]) for t in inst if t[2] == 'SPONSOR']
                fac_list = [bold_term('inst', t[0], t[1].decode('utf-8'), s_term, t[8]) for t in inst if t[2] == 'FACILITY']
                return flask.render_template('search_results.html',
                                             search_term=params['q'],
                                             conditions=cond_list,
                                             num_cond=len(cond_list),
                                             institutions=inst_list,
                                             num_inst=len(inst_list),
                                             sponsors=spon_list,
                                             num_spon=len(spon_list),
                                             facs=fac_list,
                                             num_fac=len(fac_list))
            except:
                print 'Database connection error'
                initializeDB(mysqlusername, mysqlpassword, mysqlserver, mysqldbname)
    return flask.redirect(url_for('home'))





# institution page
@app.route('/institution')
def institution():
    params = request.args
    if 'inst' in params:
        inst_id = int(params['inst'])
        for i in range(5):
            try:
                inst_data = conn.execute(InstitutionDescription.\
                                            select().\
                                            where(InstitutionDescription.c.institution_id == inst_id)).\
                                        fetchone()
                sponsors = conn.execute(InstitutionSponsors.\
                                            select().\
                                            where(InstitutionSponsors.c.institution_id == inst_id).\
                                            order_by(desc('trial_count'))).\
                                        fetchall()
                facilities = conn.execute(InstitutionFacilities.\
                                            select().\
                                            where(InstitutionFacilities.c.institution_id == inst_id).\
                                            order_by(desc('trial_count'))).\
                                        fetchall()
                sponsor_list = [{'name': t[1], 'cnt': t[2]} for t in sponsors]
                facility_list = [{'name': t[1],
                                  'cnt': t[6],
                                  'address': construct_address(t[2],t[3],t[4],t[5])}
                                  for t in facilities[:50]]
                if len(facilities) > 50:
                    facility_list += [{'name': '...and %d more' % (len(facilities) - 50),
                                       'cnt': sum([t[6] for t in facilities[50:]]),
                                       'address': ''}]
                if inst_data:
                    return flask.render_template('institution.html',
                                                inst_name=inst_data[1],
                                                inst_loc=inst_data[3],
                                                inst_img=inst_data[4],
                                                inst_summary=inst_data[5].decode('utf-8') or 'No description available',
                                                sponsor_list=sponsor_list,
                                                facility_list=facility_list
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
                cond_cnt = conn.execute(select([ConditionDescription.c.mesh_term, 
                                            func.count(InstitutionLookup.c.nct_id).label('cond_count')]).\
                                                select_from(InstitutionLookup.join(ConditionLookup,
                                                                                   and_(InstitutionLookup.c.institution_id == int(params['inst']),
                                                                                        InstitutionLookup.c.nct_id == ConditionLookup.c.nct_id,
                                                                                        ConditionLookup.c.syn_flag == 0,
                                                                                        or_(ConditionLookup.c.source == 'CTGOV',
                                                                                            ConditionLookup.c.source == 'ASSIGNED'))).\
                                                                              join(ConditionDescription)).\
                                                group_by(ConditionDescription.c.mesh_term).\
                                                order_by(desc('cond_count')).\
                                                limit(20)).\
                                        fetchall()
                if cond_cnt:
                    return flask.jsonify(result=[{'cond_name': t[0], 'trial_count': t[1]} for t in cond_cnt])
            except:
                print 'Database connection error'
                initializeDB(mysqlusername, mysqlpassword, mysqlserver, mysqldbname)

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

# ratings description page
@app.route('/ratings_description')
def ratings_description():
    return flask.render_template('ratings_description.html')





# old ClinicalTrials Browser infoviz project
@app.route('/browser')
def browser():
    return flask.render_template('browser.html')
