import cPickle as pickle
import os
from random import shuffle

#check for existing files and get list of all trials taken so far
data_list = []
done_trials_list = []
data_files = os.listdir('data/')
for f in data_files:
    if 'criteria_text_chunk_' in f:
        data_list.append(f)
        done_trials_list += pickle.load(open('data/' + f, 'rb')).keys()

#load data
data = pickle.load(open('trial_criteria_split_pos.pkl'))


def create_random_chunk(n, data, data_list, done_trials_list):
    '''This function takes a large dictionary of criteria text
    and creates 1000 trial long random sections of the text to be
    used for information extraction'''

    file_num = len(data_list) + 1

    for num in xrange(n):
        count = 0
        output_dict = {}
        key_list = data.keys()
        #suffle the list of keys to loop through
        shuffle(key_list)
        for key in key_list:
            if key not in done_trials_list:
                done_trials_list.append(key)
                output_dict.update({key:data[key]})
                count += 1
            if count == 1000:
                #save new dict
                pickle.dump(output_dict, open('data/criteria_text_chunk_%d.pkl' % (file_num), 'wb'))
                print 'Created: criteria_text_chunk_%d.pkl' % (file_num)
                del output_dict
                file_num += 1
                break


create_random_chunk(10, data, data_list, done_trials_list)


