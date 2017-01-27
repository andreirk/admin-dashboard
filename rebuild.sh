#!/usr/bin/env bash
#
# Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
#
docker stop dashboard
docker rm dashboard
docker rmi dashboard

#docker build -t arammeem16/toyou-ui-admin:9da6c1ce9c09bb375f7b4ef982151ae39aac2cb8 .
#docker run -d --name=ui-admin arammeem16/toyou-ui-admin

docker build -f Dockerfile-develop -t dashboard .
docker run -d -p 8090:8090 --name=dashboard -v ${PWD}/dist/:/usr/share/nginx/html/dashboard/ dashboard

