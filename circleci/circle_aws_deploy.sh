#!/bin/bash
set -o errexit -o pipefail # Exit on error

TARGET_HOST=$1
TARGET_STACK=$2

export UIADMINV2_HASH=$(git rev-parse HEAD)



docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
docker build -t arammeem16/toyou-ui-admin-v2:${UIADMINV2_HASH} .
docker push docker.io/arammeem16/toyou-ui-admin-v2:${UIADMINV2_HASH}  

printf '{"UIADMINV2_HASH" : "%s"}\n' ${UIADMINV2_HASH} >/tmp/${UIADMINV2_HASH}.json
aws --region eu-central-1 s3 cp /tmp/${UIADMINV2_HASH}.json s3://arm-conf/${TARGET_STACK}/versions/uiadmin-apps-v2.json
ssh ubuntu@${TARGET_HOST} -t "cd backend-infrastructure && bash -lc './run-cox-update ${TARGET_STACK}'" || true # always return success
