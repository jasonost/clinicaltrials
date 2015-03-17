from bs4 import BeautifulSoup
import httplib, codecs, datetime
import cPickle as pickle
import time

def stan_tag(criteria, server):
    tagged = []
    file_count = 47
    for ix, c in enumerate(criteria[2250000:]):
        # initialize list of sentences
        sents = []

        try:
            # send text to server
            server.request('', c)
            res = BeautifulSoup(server.getresponse().read())


            # loop through sentences to generate lists of tagged/lemmatized tuples
            for sentence in res.findAll('sentence'):
                sent_tag = []
                for word in sentence.findAll('word'):
                    sent_tag.append((word.get_text(), word['pos'], word['lemma']))
                sents.append(sent_tag)

        except:
            print c
            print ix
            server = httplib.HTTPConnection('127.0.0.1:2020')
            sents.append(c)

        # add sentence to tagged list
        tagged.append(sents)

        #save every 50,000 lines
        if ix % 50000 == 0:
            print 'Line: ', ix
            print 'File: ', file_count
            print
            pickle.dump(tagged, open('data/stanford_tagged/stanford_tagged_criteria_%d.pkl' % (file_count), 'wb'))
            file_count += 1
            del tagged
            tagged = []
    pickle.dump(tagged, open('data/stanford_tagged/stanford_tagged_criteria_%d.pkl' % (file_count), 'wb'))
    print 'Complete'


def main():
    server = httplib.HTTPConnection('127.0.0.1:2020')
    criteria = codecs.open('data/stanford_sentence_list.csv','r').readlines()

    stan_tag(criteria, server)

if __name__ == '__main__':
    main()
