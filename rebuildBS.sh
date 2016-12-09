#!/usr/bin/env bash

docker stop dashboard
docker rm dashboard
docker rmi dashboard

# docker stop browser-sync
# docker rm browser-sync
# docker rmi browser-sync

#docker build -t arammeem16/toyou-ui-admin:9da6c1ce9c09bb375f7b4ef982151ae39aac2cb8 .
#docker run -d --name=ui-admin arammeem16/toyou-ui-admin

docker build -f Dockerfile-develop-BS -t dashboard .
#docker run -d -p 8090:8090 --name=dashboard -v ${PWD}/distDev/:/usr/share/nginx/html/dashboard/ dashboard

docker run -dt \
           --name dashboard \
           -p 3000:8090 \
           -p 3001:3001 \
           -v ${PWD}/distDev/:/dashboard/ \
           dashboard \
           start --server --files "/*"