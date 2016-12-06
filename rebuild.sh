#!/usr/bin/env bash

docker stop ui-admin-v2
docker rm ui-admin-v2
docker rmi ui-admin-v2

#docker build -t arammeem16/toyou-ui-admin:9da6c1ce9c09bb375f7b4ef982151ae39aac2cb8 .
#docker run -d --name=ui-admin arammeem16/toyou-ui-admin

docker build -f Dockerfile-develop -t ui-admin-v2 .
docker run -d -p 8090:8090 --name=ui-admin-v2 -v ${PWD}/src/ui-admin-v2/:/usr/share/nginx/html/ui-admin-v2/ ui-admin-v2

