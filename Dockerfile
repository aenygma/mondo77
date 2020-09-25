FROM python:rc-slim-buster

RUN apt update && apt install -y build-essential ffmpeg
RUN apt install -y libxml2-dev libxml2 zlib1g-dev zlibc libxslt1-dev libxslt1.1
RUN apt install -y python-gevent vim-tiny xattr
RUN pip install youtube-dl
RUN pip install bottle bs4 lxml gevent

COPY ./app /app

WORKDIR /app
EXPOSE 8000

## Clean up
#RUN apt-get remove -y python-pip curl
#RUN rm -rf /var/lib/apt/lists/*

# commit
