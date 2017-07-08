#!/bin/bash

# Make a shell script change to the folder in which it is located.
cd -- "$(dirname "$BASH_SOURCE")"

export PATH=$PATH:$(pwd)/node_modules/.bin

# Clean up processes on CTRL-C
trap ctrl_c SIGINT

npm start &
DEV_SERVER_PID=$!

npm run sass_watch &
SASS_PID=$!

function ctrl_c() {
	echo Cleanup pids $SASS_PID and $DEV_SERVER_PID
	kill -15 $DEV_SERVER_PID
	kill -15 $SASS_PID
	exit
}

# Run an infinite loop in order to make trap work.
while true; do sleep 60; done
