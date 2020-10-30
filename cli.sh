#!/bin/bash

source <(curl -s "https://gist.githubusercontent.com/cenk1cenk2/0446f3be22a39c9f5fe5ee1cfb3cca63/raw/cli.sh?$(date +%s)")

print_header

# internal
if [ -z $1 ]; then
  log_this "First argument should be the apps or libs since this is a @nrwl/nx project." "error"
  exit 127
fi

# VARIABLES
PACKAGE_FOLDER=$1
CONTAINER_NAME=monorepo
WORKSPACE_ONLY=
ENABLE_LERNA=

run_cli ${*:2}
