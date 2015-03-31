import word2vec
from string import punctuation
import codecs, re


def prep_sentences(path, out_file):
    '''prep the text corpus for word2vec'''
    trans = {s: ' ' for s in punctuation}
    trans['1'] = ' one '
    trans['2'] = ' two '
    trans['3'] = ' three '
    trans['4'] = ' four '
    trans['5'] = ' five '
    trans['6'] = ' six '
    trans['7'] = ' seven '
    trans['8'] = ' eight '
    trans['9'] = ' nine '
    trans['0'] = ' zero '

    fout = codecs.open(out_file, 'w', 'utf-8')
    for row in codecs.open(path, 'r', 'utf-8').readlines():
    fout.write(re.sub('  +', ' ', ''.join([trans[c] if c in trans else c.lower() for c in row])))

    fout.close()


def create_word2vec_model(save_text_file):
    '''run word2vec on the text corpus and create a model'''

    save_phrases = save_text_file + '_phrases'
    save_model = save_text_file + '.bin'
    save_cluster = save_text_file + '-cluster.txt'

    # create phrases for processing
    word2vec.word2phrase(save_text_file, save_phrases, verbose=True)

    # create model
    word2vec.word2vec(save_phrases, save_model, size=100, verbose=True)

    # create cluster
    word2vec.word2clusters(save_text_file, save_cluster, 100, verbose=True)


def main():

    sentence_file = 'data/stanford_sentence_list.csv'
    save_text_file = 'data/criteria_text'

    prep_sentences(sentence_file, save_text_file)
    create_word2vec_model(save_text_file)
