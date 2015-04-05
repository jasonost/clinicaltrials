#!../clinicaltrials/env/bin/python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from ctapp import app
import flask, pymongo, time
from flask import request, url_for
from collections import defaultdict

# SQLAlchemy setup
from sqlalchemy import create_engine
from sqlalchemy.sql import func, select, and_, or_, not_, desc
from connect import mysqlusername, mysqlpassword, mysqlserver, mysqldbname
from db_tables import metadata, InstitutionDescription, InstitutionLookup, ConditionDescription, \
    ConditionLookup, InstitutionSponsors, InstitutionFacilities, InstitutionRatings, TrialSummary, \
    Interventions, Conditions, ConditionSynonym, ClinicalStudy, Investigators

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



# HELPER FUNCTIONS

# construct an address in HTML from city, state, zip, and country
def construct_address(city,state,zipcode,country):
    if city:
        if country == 'United States':
            return '%s, %s %s<br/>%s' % (city, state, zipcode, country)
        else:
            return '%s, %s' % (city, country)
    else:
        return 'No location information provided' 

# construct star rating from number
def gen_stars(s):
    ''' s is a number between 1 and 5 '''
    if s > 5:
        s = 5
    elif s < 1:
        s = 1

    rating_str = "<span class='rating'><i class='fa fa-star'></i>"
    ok = [1] * (int(s * 2) - 2)
    ok.extend([0] * (8 - len(ok)))
    for i in range(0,7,2):
        if sum(ok[i:i+2]) == 2:
            rating_str += "<i class='fa fa-star'></i>"
        elif sum(ok[i:i+2]) == 1:
            rating_str += "<i class='fa fa-star-half-o'></i>"
        else:
            rating_str += "<i class='fa fa-star-o'></i>"

    return rating_str + "</span>"

# calculate overall rating
def calc_overall(r_array):
    ''' r_array is a list or tuple of category ratings, in the order:
            date, mesh, sites, description, criteria
    '''
    r_wgt_avg = (r_array[0] * 0.10) + \
                (r_array[1] * 0.25) + \
                (r_array[2] * 0.25) + \
                (r_array[3] * 0.25) + \
                (r_array[4] * 0.15)
    return 1 + (round((r_wgt_avg) * 2 - 2) / 2.0)

# turn a query result with multiple rows per key into a lookup dictionary
def dictify(qresult):
    ''' qresult is a list of 2-tuples '''
    output = defaultdict(set)
    for k, v in qresult:
        output[k].add(v)
    return output

# create a comma-separated list of words
def add_commas(strlist, conj='and'):
    ''' strlist is a list of strings to be concatenated with comma
        conj is the final conjunction, defaults to 'and'
    '''
    if 'Other' in strlist:
        strlist.remove('Other') 
        strlist.append('Other')
    if len(strlist) <= 1:
        return ''.join(strlist)
    elif len(strlist) == 2:
        return '%s %s %s' % (strlist[0], conj, strlist[1])
    else:
        return '%s, %s %s' % (', '.join(strlist[:-1]), conj, strlist[-1])

# create a layman's terms string that describes the trial
def layman_desc(phase, status, inv_dict, stype):
    missing_data = []

    if phase != 'N/A':
        lay_str = "This <span style='font-weight: bold'>%s</span> trial" % phase
    else:
        lay_str = "This trial"
        missing_data.append('phase')
    lay_str += " is <span style='font-weight: bold'>%s</span>." % status

    inv_str = add_commas(inv_dict, 'and/or')
    if inv_str:
        if stype.lower() != 'n/a':
            stype = " <span style='font-weight: bold'>%s</span>" % stype
        else:
            stype = ''
            missing_data.append('study type')
        lay_str += " It is an%s assessment of a%s <span style='font-weight: bold'>%s</span> intervention." % (stype, 
                                                                                                            'n' if inv_str.lower()[0] in 'aeiou' else '',
                                                                                                            inv_str.lower())
    else:
        missing_data.append('intervention(s)')

    if missing_data:
        lay_str += " (No information was provided about the %s of the trial.)" % add_commas(missing_data, 'or')

    return lay_str









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
        return '<p><a href="%s?%s=%s">%s</a> (%d trials)</p>' % (inst_path, qtype, qid, bold_name, num_trials)

    if 'q' in params:
        s_term = params['q'].lower()
        for i in range(5):
            try:
                cond = conn.execute(select([ConditionDescription.c.condition_id,
                                                ConditionDescription.c.mesh_term,
                                                func.count(ConditionLookup.c.nct_id).label('cnt')]).
                                            select_from(ConditionDescription.join(ConditionLookup,
                                                    and_(ConditionDescription.c.condition_id == ConditionLookup.c.condition_id,
                                                         ConditionLookup.c.source == 'CTGOV',
                                                         ConditionLookup.c.syn_flag == 0))).\
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
                                             conditions=cond_list[:20],
                                             num_cond=len(cond_list),
                                             institutions=inst_list[:20],
                                             num_inst=len(inst_list),
                                             sponsors=spon_list[:20],
                                             num_spon=len(spon_list),
                                             facs=fac_list[:20],
                                             num_fac=len(fac_list))
            except Exception, e:
                print 'Database connection error getting search result info: %s' % e
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

                sponsor_list = [{'name': t[1].decode('utf-8'), 'cnt': t[2]} for t in sponsors]
                facility_list = [{'name': t[1].decode('utf-8'),
                                  'cnt': t[6],
                                  'address': construct_address(t[2],t[3],t[4],t[5]).decode('utf-8')}
                                  for t in facilities[:50]]
                if len(facilities) > 50:
                    facility_list += [{'name': '...and %d more' % (len(facilities) - 50),
                                       'cnt': sum([t[6] for t in facilities[50:]]),
                                       'address': ''}]

                rating_info = conn.execute(InstitutionRatings.select().where(InstitutionRatings.c.institution_id == inst_id)).fetchone()
                rating_obj = {'dates': gen_stars(float(rating_info[1])),
                              'mesh': gen_stars(float(rating_info[2])),
                              'sites': gen_stars(float(rating_info[3])),
                              'desc': gen_stars(float(rating_info[4])),
                              'crit': gen_stars(float(rating_info[5])),
                              'overall': gen_stars(calc_overall([float(f) for f in rating_info[1:6]]))}
                if inst_data:
                    return flask.render_template('institution.html',
                                                inst_id=inst_id,
                                                inst_name=inst_data[1].decode('utf-8'),
                                                trial_cnt=inst_data[8],
                                                inst_loc=inst_data[3].decode('utf-8'),
                                                inst_img=inst_data[4].decode('utf-8'),
                                                inst_summary=inst_data[5].decode('utf-8') or 'No description available',
                                                sponsor_list=sponsor_list,
                                                facility_list=facility_list,
                                                ratings=rating_obj
                                                )
            except Exception, e:
                print 'Database connection error getting institution info : %s' % str(e)
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
            except Exception, e:
                print 'Database connection error getting top conditions for institution info: %s' % e
                initializeDB(mysqlusername, mysqlpassword, mysqlserver, mysqldbname)

    return flask.jsonify(None)

# trials JSON
@app.route('/_trial_list')
def trial_list():
    params = request.args
    if 'page' in params and 'id' in params:

        for i in range(5):
            try:
                trials = conn.execute(select([TrialSummary]).\
                                        select_from(TrialSummary.join(InstitutionLookup,
                                            and_(InstitutionLookup.c.nct_id == TrialSummary.c.nct_id,
                                                 InstitutionLookup.c.institution_id == int(params['id'])))).\
                                        limit(50)).\
                                    fetchall()

                inv = conn.execute(select([Interventions.c.nct_id, Interventions.c.intervention_type]).\
                                        select_from(Interventions.join(InstitutionLookup,
                                            and_(InstitutionLookup.c.nct_id == Interventions.c.nct_id,
                                                 InstitutionLookup.c.institution_id == int(params['id']))))).\
                                    fetchall()
                inv_dict = dictify(inv)

                # compile JSON object
                out_obj = []
                for nct_id, title, status, phase, stype in trials:
                    out_obj.append({'nct_id': nct_id,
                                    'trial_title': title,
                                    'lay_str': layman_desc(phase, status, list(inv_dict[nct_id]) if nct_id in inv_dict else '', stype)
                                    })

                if trials:
                    return flask.jsonify(result=out_obj)
            except Exception, e:
                print 'Database connection error getting trial list info: %s' % e
                initializeDB(mysqlusername, mysqlpassword, mysqlserver, mysqldbname)

    return flask.jsonify(None)





# condition page
@app.route('/condition')
def condition():
    params = request.args
    if 'cond' in params:
        cond_id = int(params['cond'])
        for i in range(5):
            try:

                cond_data = conn.execute(ConditionDescription.\
                                            select().\
                                            where(ConditionDescription.c.condition_id == cond_id)).\
                                        fetchone()

                cond_syn = conn.execute(select([ConditionDescription.c.mesh_term]).\
                                            select_from(ConditionSynonym.join(ConditionDescription,
                                                and_(ConditionDescription.c.condition_id == ConditionSynonym.c.synonym_id,
                                                     ConditionSynonym.c.condition_id == cond_id)))).\
                                        fetchall()

                top_inst = conn.execute(select([InstitutionDescription.c.institution_id,
                                                InstitutionDescription.c.name,
                                                InstitutionDescription.c.image_url,
                                                InstitutionDescription.c.location,
                                                func.count(ConditionLookup.c.nct_id).label('cnt')]).\
                                            select_from(InstitutionDescription.join(InstitutionLookup.join(ConditionLookup,
                                                    and_(ConditionLookup.c.condition_id == cond_id,
                                                         ConditionLookup.c.source == 'CTGOV',
                                                         ConditionLookup.c.nct_id == InstitutionLookup.c.nct_id)),
                                                    InstitutionLookup.c.institution_id == InstitutionDescription.c.institution_id)).\
                                            group_by(InstitutionDescription.c.institution_id,
                                                     InstitutionDescription.c.name,
                                                     InstitutionDescription.c.image_url,
                                                     InstitutionDescription.c.location).\
                                            order_by(desc('cnt')).\
                                            limit(5)).\
                                        fetchall()

                summary_text = cond_data[2].replace('<a ','<a target="blank" ').decode('utf-8') if cond_data[2] else ''

                inst_obj = [{'inst_id': t[0],
                             'inst_name': t[1].decode('utf-8'),
                             'inst_img': t[2],
                             'inst_loc': t[3].decode('utf-8'),
                             'inst_cnt': t[4]}
                             for t in top_inst]
                if cond_data:
                    return flask.render_template('condition.html', 
                                                cond_name=cond_data[1].decode('utf-8'),
                                                cond_summary=summary_text.decode('utf-8') or 'This condition has no description available.',
                                                cond_synonyms=[t[0] for t in cond_syn],
                                                institution_list=inst_obj
                                                )
            except Exception, e:
                print 'Database connection error getting condition info: %s' % e
    
    return flask.redirect(url_for('home'))





# trial summary page
@app.route('/trial')
def trial():
    params = request.args
    if 'nct_id' in params:
        nct_id = params['nct_id']
        for i in range(5):
            try:

                summary_data = conn.execute(select([ClinicalStudy.c.brief_title,
                                                    ClinicalStudy.c.brief_summary,
                                                    ClinicalStudy.c.detailed_description,
                                                    ClinicalStudy.c.overall_status,
                                                    ClinicalStudy.c.phase,
                                                    ClinicalStudy.c.study_type,
                                                    ClinicalStudy.c.criteria,
                                                    ClinicalStudy.c.gender,
                                                    ClinicalStudy.c.minimum_age,
                                                    ClinicalStudy.c.maximum_age,
                                                    ClinicalStudy.c.healthy_volunteers,
                                                    ClinicalStudy.c.lastchanged_date]).
                                            select_from(ClinicalStudy).\
                                            where(ClinicalStudy.c.nct_id == nct_id)).\
                                        fetchone()

                brief_desc = summary_data[1].decode('utf-8').replace('<br />','</p><p>') or 'No brief summary was provided.'
                detailed_desc = summary_data[2].decode('utf-8').replace('<br />','</p><p>') or 'No detailed description was provided.'
                criteria = summary_data[6].decode('utf-8').replace('<br />','</p><p>') or 'No eligibility criteria were provided.'

                inv = conn.execute(select([Interventions.c.nct_id, Interventions.c.intervention_type]).\
                                        select_from(Interventions).\
                                        where(Interventions.c.nct_id == nct_id)).\
                                    fetchall()

                inv_dict = dictify(inv)

                cond = conn.execute(select([ConditionDescription.c.condition_id,
                                            ConditionDescription.c.mesh_term]).\
                                            select_from(ConditionDescription.join(ConditionLookup,
                                                and_(ConditionLookup.c.nct_id == nct_id,
                                                    ConditionLookup.c.source == 'CTGOV',
                                                    ConditionLookup.c.syn_flag == 0,
                                                    ConditionLookup.c.condition_id == ConditionDescription.c.condition_id)))).\
                                    fetchall()

                cond_suggest = conn.execute(select([ConditionDescription.c.condition_id,
                                                    ConditionDescription.c.mesh_term]).\
                                            select_from(ConditionDescription.join(ConditionLookup,
                                                and_(ConditionLookup.c.nct_id == nct_id,
                                                    ConditionLookup.c.source != 'CTGOV',
                                                    ConditionLookup.c.syn_flag == 0,
                                                    ConditionLookup.c.condition_id == ConditionDescription.c.condition_id)))).\
                                    fetchall()

                if summary_data:
                    return flask.render_template('trial.html', 
                                                nct_id=nct_id,
                                                trial_title=summary_data[0].decode('utf-8'),
                                                lay_str=layman_desc(summary_data[4],
                                                                    summary_data[3].lower(),
                                                                    list(inv_dict[nct_id]) if nct_id in inv_dict else '',
                                                                    summary_data[5].lower()),
                                                cond_list=[{'id': c[0],
                                                            'name': c[1]}
                                                            for c in cond],
                                                cond_list_s=[{'id': c[0],
                                                              'name': c[1]}
                                                              for c in set(tuple(t) for t in cond_suggest)],
                                                brief_desc=brief_desc,
                                                detailed_desc=detailed_desc,
                                                criteria=criteria
                                                )
            except Exception, e:
                print 'Database connection error getting trial summary info: %s' % e
    

    return flask.redirect(url_for('home'))









# ratings description page
@app.route('/ratings_description')
def ratings_description():
    return flask.render_template('ratings_description.html')





# old ClinicalTrials Browser infoviz project
@app.route('/browser')
def browser():
    return flask.render_template('browser.html')
