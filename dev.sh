
PORT=8000

# docker make; re-build container
dmk(){
     docker build -t webloop .
}

# docker up; docker shell
dup(){
    docker run -ti --rm \
        -p "$PORT":"$PORT"
        --volume="$PWD/data:/data:rw" \
        webloop /bin/bash
}

dsh(){
    docker run -p "$PORT":"$PORT" -it webloop /bin/bash
}
