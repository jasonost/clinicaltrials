from nltk import RegexpParser
from collections import Counter
import word2vec, uuid, random
from string import punctuation 
from datetime import datetime
from db_tables import metadata, CriteriaConceptStaging, ConceptPredictors, \
    ConceptPredictorsReject, ConceptTerms, ConceptTermsReject, CriteriaTagged


# helper functions
def get_past_predictors(engine):
    '''pulls all the past predictors from other concepts into a list of lists'''
    result = engine.execute(select([ConceptPredictors.c.concept_id,
                                   ConceptPredictors.c.predictor]))

def skip_terms():
    term_list = ['month', 'months', 'patient', 'patients', 'history', 'day', 'days',
                         'year', 'years', 'week', 'weeks', 'subject', 'subjects', 'study', 'inclusion criteria', 'exclusion criteria',
                         'history of', 'patients with', 'age', 'investigator', 'use', 'evidence', 'women', 'men', 'woman', 'man',
                         'female', 'male', 'enrollment', 'time']
    predictor_list = ['inclusion criteria', 'exclusion criteria']
    return term_list, predictor_list



def get_syn(word, model, num):
    #if the initial term has a space replace it with an underscore
    word = '_'.join(word.split(' '))
    try:
        indexes, metrics = model.cosine(word, n=num)
        return model.generate_response(indexes, metrics).tolist()
    except Exception as e:
        print e
        return [word]
    

def human_checker_initial(term, syns, term_list, term_exc):
    '''This function loops through the possible similar words and
    lets human input decide if they actually are or not'''
    if len(syns) > 1:
        for syn in syns:
            synterm, prob = syn
            if synterm in term_list or synterm in term_exc:
                continue
            answer_switch = True
            while answer_switch:
                add_term = raw_input('Is this a similar term to %s? (Y, N, exit): ' % (term))
                if add_term.lower() == 'y':
                    term_list.update([synterm])
                    answer_switch = False
                elif add_term.lower() == 'exit':
                    #pass switch to exit program
                    exit_switch = False
                    return term_list, term_exc, exit_switch
                elif add_term.lower() == 'n':
                    term_exc.update([synterm])
                    answer_switch = False
                else:
                    pass

    exit_switch = False
    return term_list, term_exc, exit_switch

#get list of synonyms
def choose_more_terms(model, initial_term, term_list, term_exc, num):
    
    syns = get_syn(initial_term, model, num)
    #if there was no record of the initial term in the model just the initial term will be returned
    #in that case just return the existing term
    if len(syns) == 1:
        return term_list, term_exc
    #replace underscores in phrases with spaces
    syns = [(' '.join(term[0].split('_')), term[1]) for term in syns]
    term_list, term_exc, exit_switch = human_checker_initial(initial_term, syns, term_list, term_exc)
    return term_list, term_exc






#look for more predictors for each concept by finding sentnces that have 
#concept terms in them and looking for predictors in those sentences 
def active_learn_predictors(data, term_list, pred_list, pred_exc):
    '''
        data is
        term_list is
        pred_list is
        pred_exc is
    '''

    def get_pred(text, term_list, pred_exc, pred_list):
        pred_options_dict = Counter()
        for sent in text:
            #if the sentance has less than 2 words skip it
            if len(sent) <= 1:
                continue
            #crate a sentence rank for judging weight of terms found
            sent_rank = 0
            for term in term_list:
                if term.lower() in ' '.join(zip(*sent)[0]).lower():
                    sent_rank += 1
            result = chunker(sent)
            preds = [' '.join(x) for x in [[x[0] for x in term] for term in result]]
            preds.append(' '.join([sent[0][0], sent[1][0]]))
            #lower case all preds
            preds = [x.lower() for x in preds]
            preds = preds * sent_rank
            pred_options_dict.update(preds)

        #get top 20 predictors that have not been seen before
        sorted_preds = sorted(pred_options_dict.items(), key=lambda x: x[1], reverse=True)
        counter = 0
        top_preds = []
        for pred in sorted_preds:
            if pred[0] not in pred_list and pred[0] not in pred_exc:
                top_preds.append(pred)
                counter += 1
                if counter == 15 or counter == len(sorted_preds):
                    return top_preds
        #if there are no preds return empty list
        return top_preds

    #get chunks for preds
    def chunker(sent):

        chunk_reg1 = r"""
                          CHUNK: {<NN.*><IN>}
                     """
        chunk_reg2 = r"""
                          CHUNK: {<VB.*><DT>}
                     """
        chunk_reg3 = r"""
                          CHUNK: {<NN.*><VB.*>}
                     """
        results = []

        for chunk_reg in [chunk_reg1, chunk_reg2, chunk_reg3]:
            cp = nltk.RegexpParser(chunk_reg)

            try:
                tree = cp.parse(sent)
            except Exception as e:
                print e
                print sent
                asdfa
            
            for subtree in tree.subtrees():
                if subtree.label() == 'CHUNK':
                    results.append(subtree[:])
        return results

    def human_checker(term, pred_list, top_preds, pred_exc):
        '''This function loops through the possible predictors and
        lets human input decide if they actually are or not'''
        print 'Are the following predictors of this concept %r?' % (initial_term)
        if len(top_preds) > 1:
            for pred in top_preds:
                print 'Predictor: \x1b[35m %s \x1b[0m  Score: \x1b[36m %d \x1b[0m' % (pred[0], pred[1])
                answer_switch = True
                while answer_switch:
                    add_pred = raw_input('Is this a predictor of %s? (Y, N, exit): ' % (initial_term))
                    if add_pred.lower() == 'y':
                        pred_list.update([pred[0]])
                        answer_switch = False
                    elif add_pred.lower() == 'exit':
                        #pass switch to exit program
                        exit_switch = True
                        return pred_list, pred_exc, exit_switch
                    elif add_pred.lower() == 'n':
                        pred_exc.update([pred[0]])
                        answer_switch = False
                    else:
                        pass
                    
        exit_switch = False
        return pred_list, pred_exc, exit_switch


    top_preds = get_pred(data, term_list, pred_exc, pred_list)

    pred_list, pred_exc, exit_switch = human_checker(term_list, pred_list, top_preds, pred_exc)
 
    print 'Predictive Term Learning Round Complete'
    return pred_list, pred_exc, exit_switch








#look for more terms for each concept by finding sentnces that have 
#predictors in them and looking for terms in those sentences 
def active_learn_terms(data, term_list, pred_list, term_exc, past_predictors, model):
    '''
        data is
        term_list is
        pred_list is
        term_exc is 
        past_predictors is 
        model is 
    '''

    def get_term(text, term_list, term_exc, pred_list):
        term_options_dict = Counter()
        for sent in text:
            #skip sentence if it contains less than one word
            if len(sent) <= 1:
                    continue
            #crate a sentence rank for judging weight of terms found
            sent_rank = 0
            for pred in pred_list:
                if pred[0].lower() in ' '.join(zip(*sent)[0]).lower():
                    sent_rank += pred[1]
            result = chunker(sent)
            terms = [' '.join(x) for x in [[x[0] for x in term] for term in result]]
            terms.append(' '.join([sent[0][0], sent[1][0]]))
            #lower case all preds
            terms = [x.lower() for x in terms]
            #add weights to terms by multiplying by sent_rank
            terms = terms * sent_rank
            term_options_dict.update(terms)

        #get top 20 predictors that have not been seen before
        sorted_terms = sorted(term_options_dict.items(), key=lambda x: x[1], reverse=True)
        counter = 0
        top_terms = []
        for term in sorted_terms:
            if term[0] not in term_list and term[0] not in term_exc:
                top_terms.append(term)
                counter += 1
                if counter == 15 or counter == len(sorted_terms):
                    return top_terms
        #if there are no preds return empty list
        return top_terms

    #get chunks for preds
    def chunker(sent):

        chunk_reg1 = r"""
                          CHUNK: {(<NN.*><POS>)?<RB>?<JJ.*>*<NN.*>+}
                     """
        #was causing too many bad results
#         chunk_reg2 = r"""
#                           CHUNK: {(<JJ.*>|<VB.*>)<XX>}
#                        """
        results = []

        for chunk_reg in [chunk_reg1]:
            cp = nltk.RegexpParser(chunk_reg)

            tree = cp.parse(sent)
            for subtree in tree.subtrees():
                if subtree.label() == 'CHUNK':
                    results.append(subtree[:])
        return results

    def human_checker(term_list, top_terms, term_exc):
        '''This function loops through the possible terms and
        lets human input decide if they actually are or not'''
        print 'Are the following terms part of this concept: %r?' % (initial_term)
        if len(top_terms) > 1:
            for term in top_terms:
                print 'Term: \x1b[35m %s \x1b[0m  Score: \x1b[36m %d \x1b[0m' % (term[0], (term[1]))
                answer_switch = True
                while answer_switch:
                    add_term = raw_input('Is this similar to %s? (Y, N, exit): ' % (initial_term))
                    if add_term.lower() == 'y':
                        term_list.update([term[0]])
                        term_list, term_exc = choose_more_terms(model, initial_term, term_list, term_exc, 20)
                        answer_switch = False
                    elif add_term.lower() == 'exit':
                        #pass switch to exit program
                        exit_switch = True
                        return term_list, term_exc, exit_switch
                    elif add_term.lower() == 'n':
                        term_exc.update([term[0]])
                        answer_switch = False
                    else:
                        pass
                    
        exit_switch = False
        return term_list, term_exc, exit_switch

    def weight_preds(past_predictors, pred_list):
        pred_weight_list = []

        #create a combined list of all preds, create Counter dict
        tot_pred_list = []
        for p in past_predictors:
            tot_pred_list += p
        count_pred = Counter(tot_pred_list)

        #add weights to pred terms and create new pred weight lists
        list_preds = list(pred_list)
        for idx in range(len(list_preds)):
            weight  = len(past_predictors) - (count_pred[list_preds[idx]]-1)
            pred_weight_list.append((list_preds[idx], weight))
            
        return pred_weight_list


    pred_weight_list = weight_preds(past_predictors, pred_list)

    top_terms = get_term(data, term_list, term_exc, pred_weight_list)

    term_list, term_exc, exit_switch = human_checker(term_list, top_terms, term_exc)
    
    print 'Concept Term Learning Round Complete'
    return term_list, term_exc, exit_switch





def run_active_learning(term_list, term_exc, pred_list, pred_exc, engine, concept_id, user_id, model):
    '''
        term_list is 
        term_exc is 
        pred_list is 
        pred_exc is 
        engine is 
        concept_id is 
        user_id is 
        model is 
    '''

    # get initial terms with word2vec model
    term_list, term_exc = choose_more_terms(model, initial_term, term_list, term_exc, 20)
    
    if concept_id:
        new_concept = 0
    else:
        new_concept = 1
        concept_id = str(uuid.uuid4())
        
    past_predictors = get_past_predictors(engine)
    
    #check if there are any past predictiors and if not create and empty list
    if not past_predictors:
        past_predictors = []
    
    counter = 0
    exit_switch = False
    criteria_tracking = []
    while not exit_switch and counter < 10:
        
        # load in a random chunk of 10,000 trials
        #select a random number between 0-249
        while True:
            rand_select = random.choice(xrange(250))
            if rand_select not in criteria_tracking:
                criteria_tracking.append(rand_select)
                break
        
        #need to figure out a way to get random sentences from this, rand() is way to slow
        result = engine.execute(select([CriteriaTagged.c.tagged_text]).where(CriteriaTagged.c.random_select
                                                                            == rand_select))
        
        #convert into list of lists
        data = [eval(r.tagged_text)[0] for r in result]

        #mark punctuation with XX tag and convert inner list to tuples for processing
        data = [[(w[0], w[1]) if w[0] not in punctuation else (w[0], 'XX') for w in s] for s in data]

        pred_list_new, pred_exc_new, exit_switch = active_learn_predictors(data, term_list, pred_list, pred_exc)
        term_list_new, term_exc_new, exit_switch = active_learn_terms(data, term_list, pred_list, term_exc, past_predictors, model)
        
        #write the concept name row to db after first pass
        if counter == 0:
            engine.execute(CriteriaConceptStaging.insert(), [{'user_id': user_id,
                                              'update_time': datetime.now(),
                                              'concept_id': concept_id,
                                              'new_concept': new_concept,
                                              'update_type': 'concept-name',
                                              'value':initial_term}])
        
        #update the difference in the 4 sets to the database
        old = [pred_list, pred_exc, term_list, term_exc]
        new = [pred_list_new, pred_exc_new, term_list_new, term_exc_new]
        update_type = ['predictor', 'predictor-reject', 'term', 'term-reject']
        for ix, s in enumerate(new):
            new_values = s.intersection(old[ix])
            old[ix] = s
            cur_time = datetime.now()
            update = update_type[ix]
            
            #instert data into db
            engine.execute(CriteriaConceptStaging.insert(), [{'user_id': user_id,
                                              'update_time': cur_time,
                                              'concept_id': concept_id,
                                              'new_concept': new_concept,
                                              'update_type': update,
                                              'value':value}
                                             for value in new_values])
            
            
        counter += 1
        
    return term_list, pred_list






def active_learn_main(engine, initial_term, user_id, concept_id=False):
    '''
        engine is 
        initial_term is
        user_id is 
        concept_id is 
    '''
    
    #user will select a term and then the term will be run through the word2vec model to come up with similar terms
    #if it is an existing concept pull the existing data from db else start from scratch
    if concept_id:
        term_list = engine.execute(select([ConceptTerms.c.term]).where(ConceptTerms.c.concept_id
                                                            == concept_id))
        term_exc = engine.execute(select([ConceptTerms_reject.c.term]).where(ConceptTerms_reject.c.concept_id
                                                            == concept_id))
        pred_list = engine.execute(select([ConceptPredictors.c.predictor]).where(ConceptPredictors.c.concept_id
                                                            == concept_id))
        pred_exc = engine.execute(select([ConceptPredictorsReject.c.predictor]).where(ConceptPredictorsReject.c.concept_id
                                                            == concept_id))
    else:
        term_list = set([initial_term])
        term_exc = set()
        pred_list = set()
        pred_exc = set()


    #load in model
    #model = word2vec.load('/groups/clinicaltrials/clinicaltrials/data/criteria.bin')
    #clusters = word2vec.load_clusters('/groups/clinicaltrials/clinicaltrials/data/criteria-clusters.txt')
    model = word2vec.load('../data/criteria.bin')
    clusters = word2vec.load_clusters('../data/criteria-clusters.txt')

    # add clusters to model
    model.clusters = clusters
    
    #add skip terms to term_exc and pred_exc
    skip_term, skip_pred = skip_terms()
    term_exc.update(skip_term)
    pred_exc.update(skip_pred)

    term_list, pred_list = run_active_learning(term_list, term_exc, pred_list, pred_exc, engine, concept_id, user_id, model)

