#!/usr/bin/env python

from bottle import route, run, static_file



@route('/css/<path:path>')
def callback(path):
    return static_file(path, root="./static/css")

@route('/images/<path:path>')
def callback(path):
    return static_file(path, root="./static/images")

@route('/')
def index():
    return static_file("index.html", root="./static")

run(host='0.0.0.0', port=8000, debug=True)

