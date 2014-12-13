import nltk, codecs, string, random, math, cPickle as pickle, re, multiprocessing
from collections import Counter

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np
from sklearn.metrics.pairwise import linear_kernel

from __future__ import division

sent_tokenizer=nltk.data.load('tokenizers/punkt/english.pickle')
stopset = set(nltk.corpus.stopwords.words('english'))

corrections = {"Sarcoma, Ewing's": 'Sarcoma, Ewing',
               'Beta-Thalassemia': 'beta-Thalassemia',
               'Von Willebrand Disease, Type 3': 'von Willebrand Disease, Type 3',
               'Von Willebrand Disease, Type 2': 'von Willebrand Disease, Type 2',
               'Von Willebrand Disease, Type 1': 'von Willebrand Disease, Type 1',
               'Felty''s Syndrome': 'Felty Syndrome',
               'Von Hippel-Lindau Disease': 'von Hippel-Lindau Disease',
               'Retrognathism': 'Retrognathia',
               'Regurgitation, Gastric': 'Laryngopharyngeal Reflux',
               'Persistent Hyperinsulinemia Hypoglycemia of Infancy': 'Congenital Hyperinsulinism',
               'Von Willebrand Diseases': 'von Willebrand Diseases',
               'Pontine Glioma': 'Brain Stem Neoplasms',
               'Mental Retardation': 'Intellectual Disability',
               'Overdose': 'Drug Overdose',
               'Beta-Mannosidosis': 'beta-Mannosidosis',
               'Alpha 1-Antitrypsin Deficiency': 'alpha 1-Antitrypsin Deficiency',
               'Intervertebral Disk Displacement': 'Intervertebral Disc Displacement',
               'Alpha-Thalassemia': 'alpha-Thalassemia',
               'Mycobacterium Infections, Atypical': 'Mycobacterium Infections, Nontuberculous',
               'Legg-Perthes Disease': 'Legg-Calve-Perthes Disease',
               'Intervertebral Disk Degeneration': 'Intervertebral Disc Degeneration',
               'Alpha-Mannosidosis': 'alpha-Mannosidosis',
               'Gestational Trophoblastic Disease': 'Gestational Trophoblastic Neoplasms'
               }
cond = {}
cond_r = {}
for row in codecs.open('../data/condition_browse.txt','r','utf-8').readlines():
    row_id, trial_id, mesh_term = row.strip().split('|')
    if mesh_term in corrections: mesh_term = corrections[mesh_term]
    if mesh_term not in cond: cond[mesh_term] = []
    cond[mesh_term].append(trial_id)
    if trial_id not in cond_r: cond_r[trial_id] = []
    cond_r[trial_id].append(mesh_term)

mesh_codes = {}
mesh_codes_r = {}
for row in codecs.open('../data/mesh_thesaurus.txt','r','utf-8').readlines():
    row_id, mesh_id, mesh_term = row.strip().split('|')
    mesh_codes[mesh_id] = mesh_term
    if mesh_term not in mesh_codes_r: mesh_codes_r[mesh_term] = []
    mesh_codes_r[mesh_term].append(mesh_id)

# limiting to conditions that appear in ten or more trials
top_cond = {c for c in cond if len(cond[c]) >= 10}
trials = {t for c in top_cond for t in cond[c]}

trial_desc = pickle.load(open('../data/trial_desc.pkl','rb'))
to_classify = [t for t in trial_desc if t not in trials]

cond_text = pickle.load(open('../data/mesh_level2_textcount.pkl','rb'))
total_text = pickle.load(open('../data/mesh_level2_alltextcount.pkl','rb'))

mesh_models = pickle.load(open('../data/mesh_models_series.pkl','rb'))

def process_text(text):
    return [word.lower() 
            for sent in sent_tokenizer.tokenize(text) 
            for word in nltk.word_tokenize(sent)
            if word.lower() not in stopset and
            sum(1 for char in word if char not in string.punctuation) > 0]

classify_text = {trial_id: Counter([word
                                    for desc in trial_desc[trial_id]
                                    if len(desc) > 0
                                    for word in process_text(desc)])
                 for trial_id in to_classify}

pickle.dump(classify_text,open('../data/classify_text.pkl','wb'))

total_text_keys, total_text_values = zip(*[(k, v)
                                           for k, v in total_text.items() 
                                           if len(k) > 2 and sum([1 
                                                                  for char in k 
                                                                  if char not in '1234567890']) > 0])

other_text_len = sum(total_text_values)

def guess_data(c):
    text_len = sum([v
                    for k, v in classify_text[c].items()
                    if len(k) > 2 and sum([1
                                           for char in k
                                           if char not in '1234567890']) > 0])
    if text_len > 0:
        # create set of tuples (term % of target descriptor text, term % of other MeSH descriptor text)
        vecs = [classify_text[c][t] / text_len
                for t in total_text.keys()
                if len(t) > 2 and sum([1
                                       for char in t
                                       if char not in '1234567890']) > 0]
        # predict logistic models
        predictions = {}
        for term, model in mesh_models.items():
            predictions[term] = model.predict_proba(vecs)[0][1]
    else:
        predictions = None
    return predictions

pool = multiprocessing.Pool(processes=16)
preds = pool.map(guess_data, classify_text.keys())

pool.close()
pool.join()

guesses = dict(zip(classify_text.keys(),preds))

pickle.dump(guesses,open('../data/mesh_guesses.pkl','wb'))


