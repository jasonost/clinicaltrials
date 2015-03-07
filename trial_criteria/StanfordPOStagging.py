from bs4 import BeautifulSoup
import httplib, codecs, datetime
import cPickle as pickle

def stan_tag(criteria):
    tagged = []
    for ix, c in enumerate(criteria[:10000]):
        # initialize list of sentences
        sents = []

        # send text to server
        server.request('', c)
        res = BeautifulSoup(server.getresponse().read())

        # loop through sentences to generate lists of tagged/lemmatized tuples
        for sentence in res.findAll('sentence'):
            sent_tag = []
            for word in sentence.findAll('word'):
                sent_tag.append((word.get_text(), word['pos'], word['lemma']))
            sents.append(sent_tag)

        # add sentence to tagged list
        tagged.append(sents)
        
        #save every 100,000 lines
        if ix%100000 == 0:
            print 'Line: ', ix
            pickle.dump(tagged, open('data/stanford_tagged_criteria.pkl', 'wb'))
    pickle.dump(tagged, open('data/stanford_tagged_criteria.pkl', 'wb'))
    print 'Complete'


def main():
    server = httplib.HTTPConnection('127.0.0.1:2020')
    criteria = codecs.open('data/stanford_sentence_list.csv','r').readlines()

    stan_tag(criteria)

if __main__ == '__name__':
    main()
