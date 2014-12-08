#!../clinicaltrials/env/bin/python

from ctapp import app
import flask
from flask import request

# homepage
@app.route('/')
def home():
    return flask.render_template('index.html')

@app.route('/browser')
def browser():
    return flask.render_template('browser.html')

@app.route('/institution')
def institution():
    return flask.render_template('institution.html')

@app.route('/condition')
def condition():
    return flask.render_template('condition.html')

