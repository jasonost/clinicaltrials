# -*- coding: utf-8 -*-
import nltk
import cPickle as pickle
import re

def process_text(text_dict):
    #break sentences on '-' for each subdoc of each document
    for key, doc in text_dict.items():
        for n in xrange(len(doc)):
            text_dict[key][n] = re.split(' - ', text_dict[key][n])


    #get sentence tokenizer
    sent_tokenizer=nltk.data.load('tokenizers/punkt/english.pickle')

    #run the sentence tokenizer over all the documents
    def sent_token(text):
        sentence_groups = []
        for sent_group in text:
            group_holder = []
            for sent in sent_group:
                group_holder += (sent_tokenizer.tokenize(sent))
            sentence_groups.append(group_holder)
            del group_holder
        return sentence_groups

    #run sentence tokenizer over each doc in the dict
    for key, doc in text_dict.items():
        text_dict[key] = sent_token(doc)



    #CREATING TOKENS

    #patter for tokenizing
    pattern = r'''(?x)    # set flag to allow verbose regexps
            ([A-Z]\.)+        # abbreviations, e.g. U.S.A
            | \w+([-‘]\w+)*        # words with optional internal hyphens
            | \$?\d+(\.\d+)?%?  # currency and percentages, e.g. $12.40, 82%
            | \.\.\.            # ellipsis...   
            | [][.,;"'?():\-_`]+  # these are separate tokens
            '''



    for key, doc in text_dict.items():
        for n in xrange(len(doc)):
            text_dict[key][n] = [nltk.regexp_tokenize(sent, pattern) for sent
                                             in doc[n]]
    return text_dict

#load data
trial_criteria_split = pickle.load(open('trial_criteria_split.pkl', 'rb'))

#process data
result = process_text(trial_criteria_split)

#save resulting dict
pickle.dump(result, open('trial_criteria_split_token.pkl', 'wb'))
