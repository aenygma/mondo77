# GLOBALS
PORT=8000
IMAGE=webloop

#OPTS="--volume=$PWD/data:/data:rw"

# get container id
get_cid(){
    cid=`docker ps |grep "${IMAGE}" | awk '{print $1}'`
}

# docker make; re-build container
dmk(){
     docker build -t ${IMAGE} .
}


# Run a command in container, or start and run it
drun(){

    # default
    local cmd=
    local iactv=""
    local OUT=

    if [[ $# -eq 1 ]]; then
        cmd="$*"
        iactv="-i"
    fi;

    # find if running
    get_cid "$IMAGE"

    OUT="running ($cmd) on ($IMAGE)"
    # if so, connect to container
    if [ "$cid" != "" ]; then
        echo "connecting to $IMAGE - $cid"
        echo $OUT
        docker exec -it "$cid" $cmd
        return
    fi;

    # start new
    echo "starting ${IMAGE}"
    echo $OUT
    docker run -t $iactv --rm \
        -p $PORT:$PORT \
        --volume="$PWD/data:/data:rw" \
        ${IMAGE} $cmd
}

# docker up; 
dsh(){
    drun "/bin/bash"
}

# stop/kill
ded(){
    get_cid "$IMAGE"
    if [ "$cid" == "" ]; then 
        echo "Image: ($IMAGE) not found"
        return 
    fi
    docker stop $cid
}

# push
dpsh(){
    get_cid "$IMAGE"
    if [ "$cid" == "" ]; then 
        echo "Image: ($IMAGE) not found"
        return 
    fi
    
    docker cp ./app/. "$cid:/app" 
}

dps(){
    docker ps $*
}
