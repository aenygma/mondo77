#!/usr/bin/env python3
"""


"""
from gevent import monkey; monkey.patch_all()

from bottle import route, run, static_file, request, post
from YDL import ydl

#
#   Routes
#

# for static files
@route('/js/<path:path>')
def callback(path):
    return static_file(path, root="./static/js")

@route('/css/<path:path>')
def callback(path):
    return static_file(path, root="./static/css")

@route('/images/<path:path>')
def callback(path):
    return static_file(path, root="./static/images")

# for audio files
@route('/audio/<path:path>')
def callback(path):
    return static_file(path, root="/data/")

# for index
@route('/')
def index():
    return static_file("index.html", root="./static")

# TODO add abuse and security protection
#  rate limit, cookies
#@route('/get', methods=["GET", "POST"])
@route('/go', method=["GET", "POST"])
def get_media():

    url = request.forms.get('urlInput')
    filename = "blah"
    print(url, request.forms.keys(), request.query.keys())
    yield 'STAGE1'
    ydl.get_media(url, 3, filename)
    yield 'STAGE2'

run(host='0.0.0.0', port=8000, debug=True, server='gevent', reloader=True)
