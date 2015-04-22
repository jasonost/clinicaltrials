#imports
import cPickle as pickle
import pandas as pd
import os
from copy import deepcopy


def match_trial_article(data, trial_mesh_dict, investigator_dict, trial_score_dict):

    for ids in data:
        for author in data[ids]['authors']:
            if author[0] not in investigator_dict:
                print author[0]
                continue
            for trial in investigator_dict[author[0]]['Trials']:
            #if the trial does not have associated mesh terms skip it.
                if trial not in trial_mesh_dict.keys():
                    continue

                trial_date = int(trial_mesh_dict[trial]['Date'].year)
                article_date = int(data[ids]['year'])
                if trial_date > article_date:
                    continue

                #score variable
                score = 0

                #get the intersection of mesh terms between the article and trial
                article_mesh = data[ids]['mesh']
                intersection = set([term[0].lower() for term in article_mesh]).intersection(map(lambda x: x.lower(),
                                                                                                trial_mesh_dict[trial]['Mesh']))
                #create score for article

                #add a point for the article being within 10 years of the trial
                #an addtional point for being within 5 years
                #if the year difference is greater than 10 a point is subtracted
                if (article_date - trial_date) <= 5:
                    score += 2
                elif (article_date - trial_date) <= 10:
                    score += 1
                else:
                    score += -1

                #add 1 point for every matching mesh term, add an aditional point if a primary
                #mesh term matched
                for mesh in set(article_mesh):
                    if mesh[0].lower() in intersection:
                        if mesh[1] == 'Y':
                            score += 2
                        else:
                            score += 1

                #if the score is greater that 3 it is assumed that the article and
                #trial are related
                if score > 3:
                    if (trial,ids) not in trial_score_dict:
                        trial_score_dict[(trial,ids)] = score

    return trial_score_dict

#load trial mesh dict
trial_mesh_dict = pickle.load(open('data/trial_mesh_dict.pkl', 'rb'))
#load investigator dict
investigator_dict = pickle.load(open('data/investigator_dict.pkl', 'rb'))

#load in data files to run
data_list = []
data_files = os.listdir('data/matched_trial_article/')
for f in data_files:
    if 'trials_processed' in f:
        data_list.append(f)

#get trial lookup dict
#load in data files to run
# data_list_lookup = []
# data_files_lookup = os.listdir('data/matched_trial_article/')
# for f in data_files_lookup:
#     if 'trial_match' in f:
#         data_list_lookup.append(f)

# trial_lookup = {}
# for f in data_list_lookup:
#     data = pickle.load(open('data/matched_trial_article/' + f, 'rb'))
#     for i in data:
#         for trial in data[i]:
#             for ids in data[i][trial]:
#                 if ids not in trial_lookup:
#                     trial_lookup[ids] = trial

#list to keep track of which files have been run
run_files_list = []

#load pervious run files list
try:
    run_files_list = pickle.load(open('data/matching_run_file_list.pkl', 'wb'))
except:
    pass

trial_score_dict = {}

for f in data_list:
    print f

    if f not in run_files_list:
        #load data to process
        data = pickle.load(open('data/matched_trial_article/' + f, 'rb'))

        #process data
        result = match_trial_article(data, trial_mesh_dict, investigator_dict, trial_score_dict)

        trial_score_dict = deepcopy(result)
        del result

    #pickle.dump(run_files_list, open('data/matching_run_file_list.pkl', 'wb'))

        del data
    run_files_list.append(f)

pickle.dump(trial_score_dict, open('data/trial_scores.pkl','wb'))

