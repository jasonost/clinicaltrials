from sqlalchemy import MetaData, Table, Column, BigInteger, Date, Float, Integer, Text, String, ForeignKey

metadata = MetaData()

criteria_concept_staging = Table('criteria_concept_staging', metadata,
    Column('update_id', Integer, primary_key = True),
    Column('user_id', Integer),
    Column('update_time', Integer),
    Column('concept_id', String),
    Column('new_concept', Integer),
    Column('update_type', String),
    Column('value', String)
)

concept_predictors = Table('concept_predictors', metadata,
    Column('predictor_id', Integer, primary_key = True),
    Column('concept_id', String),
    Column('predictor', String)
)

concept_predictors_reject = Table('concept_predictors_reject', metadata,
    Column('predictor_reject_id', Integer, primary_key = True),
    Column('concept_id', String),
    Column('predictor', String)
)

concept_terms = Table('concept_terms', metadata,
    Column('term_id', Integer, primary_key = True),
    Column('concept_id', String),
    Column('term', String)
)

concept_terms_reject = Table('concept_terms_reject', metadata,
    Column('term_reject_id', Integer, primary_key = True),
    Column('concept_id', String),
    Column('term', String)
)

criteria_tagged = Table('criteria_tagged', metadata,
    Column('criteria_text_id', Integer, primary_key = True),
    Column('tagged_text', String),
    Column('random_select', Integer)
)
