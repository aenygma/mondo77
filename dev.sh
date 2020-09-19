
# GLOBALS
PORT=8000
IMAGE=webloop

# get container id
get_cid(){
    cid=`docker ps |grep "${IMAGE}" | awk '{print $1}'`
}

# docker make; re-build container
dmk(){
     docker build -t ${IMAGE} .
}

# docker up; docker shell
dup(){
    docker run -ti --rm \
        -p "$PORT":"$PORT"
        --volume="$PWD/data:/data:rw" \
        ${IMAGE} /bin/bash
}

dsh(){
    # find if running
    get_cid "$IMAGE"

    if [ "$cid" != "" ]; then
        # if so, connect to container
        echo "connecting to $IMAGE - $cid"
        docker exec -it "$cid" /bin/bash
    else
        # start new
        echo "starting ${IMAGE}"
        docker run -p $PORT:$PORT -it ${IMAGE} /bin/bash
    fi;
}

