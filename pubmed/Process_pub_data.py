from bs4 import BeautifulSoup
import cPickle as pickle
import time
import os

def get_articles_data(data, investigator_mesh_dict):

    time_count = 0
    last_time = time.time()

    auth_articles = {}
    auth_articles_abs = {}

    for key, value in data.items():

	#test to see if value is null, if it is skip it
	if value is None:
	    continue

        time_count += 1
        if (time_count%100) == 0:
            print 'Count: ', time_count
            print 'Duration (mins): ', (time.time() - last_time)/60
            last_time = time.time()

        #if the investigator has no mesh terms in the db skip them
        if len(investigator_mesh_dict[key]['mesh']) == 0:
            continue

        auth_articles[key] = {}
        auth_articles_abs[key] = {}

        soup = BeautifulSoup(value)
        for article in soup.findAll('pubmedarticle'):

            #FILTER

            #get published dates
            #most pubdates refer to date as year but some refer to it as medlinedate
            try:
                year = article.findChild('pubdate').findChild('year').text
            except:
                #this includes months so we just pull out the year
                year = article.findChild('pubdate').findChild('medlinedate').text[:4]
            #if the year of the article is before 1995 skip it
            if int(year) < 1995:
                continue

            mesh_list = article.findChild('meshheadinglist')
            #if there are no mesh terms skip article
            if mesh_list is None:
                continue

            #creates a list of mesh terms. each mesh term is a tuple with
            #a major minor marker
            mesh_terms = article.findAll('meshheading')
            mesh_terms_list = []
            for term in mesh_terms:
                for element in term:
                    try:
                        if element.name == 'descriptorname':
                            mesh_terms_list.append((element.text, element.attrs.values()[0]))
                    except:
                        pass

            #check to see if there are any matching mesh terms between the
            #article and the investigator mesh terms from the db
            skip_switch = True
            for term, weight in mesh_terms_list:
                #do not use certain very common mesh terms for matching
                if term.lower() in ['adult', 'humans', 'male', 'female', 'aged']:
                    continue
                if term.lower() in investigator_mesh_dict[key]['mesh']:
                    skip_switch = False
                    break

            if skip_switch:
                continue

            #GET DATA

            title = article.findChild('articletitle').text
            pub_id = article.findChild('pmid').text

            #get a list of all other ids
            other_ids = article.findAll('articleid')
            other_ids_list = []
            for ids in other_ids:
                other_ids_list.append((ids.attrs.values()[0],ids.text))

            abstract = str(article.findChild('abstract'))

            #creates a list of lists where each list consists of
            #tuples of data types and the data
            authors = article.findAll('author')
            authors_list = []
            for author in authors:
                temp = []
                for element in author:
                    try:
                        if element.name is not None:
                            if element.name == 'initials' or element.name == 'suffix':
                                continue
                            if element.name == 'forename':
                                temp[0] = element.text + ' ' + temp[0]
                                continue
                            temp.append(element.text)
                    except:
                        pass

                authors_list.append(temp)
                del temp

            country = article.findChild('country').text

            language = article.findChild('language').text
            #this is a list of the chemicals found in the paper
            #may be useful for maching articles to trials
            #creates a list of all the chemicals in the paper if there are any
            chemicals = article.findAll('chemical')
            chemicals_list = []
            for chemical in chemicals:
                for element in chemical:
                    try:
                        if element.name == 'nameofsubstance':
                            chemicals_list.append(element.text)
                    except:
                        pass

            #creates a list of keywords. each keyword is a tuple with
            #a major minor marker
            keywords = article.findAll('keyword')
            keywords_list = []
            for keyword in keywords:
                keywords_list.append((keyword.text, keyword.attrs.values()[0]))

            #not all journals have an issn, get text if it exists, pass if it doesn't
            journal_id_issn = article.findChild('issn')
            try:
                journal_id_issn = journal_id_issn.text
            except:
                pass


            #create dictionary
            auth_articles[key][pub_id] = {'journal_id':journal_id_issn,
                                          'keywords':keywords_list,
                                          'mesh':mesh_terms_list,
                                          'chemicals':chemicals_list,
                                          'language':language,
                                          'country':country,
                                          'authors':authors_list,
                                          'other_ids':other_ids_list,
                                          'title':title,
                                          'year':year
                                          }
            auth_articles_abs[key][pub_id] = abstract
    return auth_articles, auth_articles_abs

#load in data files to run
data_list = []
data_files = os.listdir('.')
for f in data_files:
    if 'investigator_dict_' in f:
        data_list.append(f)


#list to keep track of which files have been run
run_files_list = []

#load pervious run files list
try:
    run_files_list = pickle.load(open('processing_run_file_list.pkl', 'wb'))
except:
    pass

#load in investigator mesh term dict
investigator_mesh_dict = pickle.load(open('investigator_mesh_dict.pkl', 'rb'))

#lowercase all mesh terms
for invest in investigator_mesh_dict:
    investigator_mesh_dict[invest]['mesh'] = [x.lower() for x in investigator_mesh_dict[invest]['mesh']]

for f in data_list:
    print f
    if f not in run_files_list:
        #load data to process
        data = pickle.load(open( f, 'rb'))

        #process data
        auth_articles, auth_articles_abs = get_articles_data(data, investigator_mesh_dict)

	if len(auth_articles) > 0:
            pickle.dump(auth_articles, open('investigator_process/processed_' + f,'wb'))
            pickle.dump(auth_articles_abs, open('investigator_process/abstracts_' + f,'wb'))

	pickle.dump(run_files_list, open('processing_run_file_list.pkl', 'wb'))

    del auth_articles
    del auth_articles_abs
    del data
    run_files_list.append(f)



