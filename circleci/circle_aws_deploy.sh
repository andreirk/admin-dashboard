#!/bin/bash
set -o errexit -o pipefail # Exit on error

TARGET_HOST=$1
TARGET_STACK=$2

export UIADMINV2_HASH=$(git rev-parse HEAD)

# npm i npm
# npm cache clean 
# npm install -g n
# n stable

npm i --silent
npm run build:prod


echo Hello from pwd 
pwd
echo Hello from ls 
ls

echo Hello from cat
cat circle_aws_deploy.sh

docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
docker build -t arammeem16/toyou-dashboard:${UIADMINV2_HASH} .
docker push docker.io/arammeem16/toyou-dashboard:${UIADMINV2_HASH}  

echo Hello from ls dist


printf '{"UIADMINV2_HASH" : "%s"}\n' ${UIADMINV2_HASH} >/tmp/${UIADMINV2_HASH}.json
aws --region eu-central-1 s3 cp /tmp/${UIADMINV2_HASH}.json s3://arm-conf/${TARGET_STACK}/versions/uiadmin-apps-v2.json
echo Hello after aws

ssh ubuntu@${TARGET_HOST} -t "cd backend-infrastructure && bash -lc './run-cox-update ${TARGET_STACK}'" || true # always return success
echo Hello after ssh

