
# docker make; re-build container
dmk(){
     docker build -t webloop .
}

# docker up; docker shell
dup(){
    docker run -ti --rm \
        --volume="$PWD:/app/data:rw" \
        webloop /bin/bash
}

dsh(){
    docker run -it webloop /bin/bash
}
