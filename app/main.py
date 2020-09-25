#!/usr/bin/env python3
"""


"""
import os
import uuid
import hashlib

from gevent import monkey; monkey.patch_all()

from bottle import route, run, static_file, request, post
from YDL import ydl

#   Helpers
def random_filename():
    """ get a random filename """

    ret = str(uuid.uuid4())
    return ret.replace("-","")


def hash_filename(url):
    """ get a hashed filename """
    return hashlib.md5(url.encode('latin-1')).hexdigest()

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
    return static_file(path, root="./audio/")

# for index
@route('/')
def index():
    return static_file("index.html", root="./static")

# TODO add abuse and security protection
#  rate limit, cookies
#@route('/get', methods=["GET", "POST"])
@route('/get_media', method=["GET", "POST"])
def get_media():

    ret = {"status": "failed", "error": ""}

    url = request.forms.get('urlInput')
    if not len(url):
        ret["error"] = "invalid url"
        return ret

    filename = hash_filename(url)
    local_filename = "./audio/" + filename + ".mp3"

    # check if cached exists
    if not os.path.exists(local_filename):
        ydl.get_media(url, 3, filename)

    local_filename = "/audio/" + filename + ".mp3"
    ret["status"] = "success"
    ret["data"] = local_filename

    return ret

run(host='0.0.0.0', port=8000, debug=True, server='gevent', reloader=True)
