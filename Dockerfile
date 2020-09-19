FROM python:rc-slim-buster

RUN apt update 
RUN pip install youtube-dl
RUN pip install bottle

COPY ./app /app

WORKDIR /app
EXPOSE 8000

## Clean up
#RUN apt-get remove -y python-pip curl
RUN rm -rf /var/lib/apt/lists/*

# commit
