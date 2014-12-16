# -*- coding: utf-8 -*-
import nltk
import cPickle as pickle

def pos_tag(text_dict):
    #tag document structured criteria text
    def doc_tagger_pos(text):
        result = []
        for doc in text:
            doc_text = []
            for sent in doc:
                doc_text.append(nltk.pos_tag(sent))
            result.append(doc_text)
        return result
    
    for key, doc in text_dict.items():
        text_dict[key] = doc_tagger_pos(doc)
        
    return text_dict


#load text
trial_criteria_split_token = pickle.load(open('trial_criteria_split_token.pkl', 'rb'))

#tag text dict    
result_pos = pos_tag(trial_criteria_split_token)

#save tagged text
pickle.dump(result_pos, open('trial_criteria_split_pos.pkl', 'wb'))
