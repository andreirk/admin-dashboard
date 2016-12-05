FROM nginx


COPY src/dist/ /usr/share/nginx/html/ui-admin-v2/
COPY config/docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

WORKDIR /var/www
ENTRYPOINT ["npm", "run", "server:prod"]
