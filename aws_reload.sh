#!/bin/bash

kill -HUP `cat ctapp.pid`
kill `cat ctapp.pid`
gunicorn ctapp:app -p ctapp.pid -D
sudo service nginx stop
sudo service nginx start
