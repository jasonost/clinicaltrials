import flask

app = flask.Flask('ctapp')
app.config['DEBUG'] = True
import ctapp.views