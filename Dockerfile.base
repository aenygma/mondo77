FROM python:rc-slim-buster
RUN apt update && apt -y install build-essential
RUN pip install youtube-dl
RUN pip install fastapi
RUN pip install uvicorn

# remove junk
RUN apt remove build-essential
# commit
