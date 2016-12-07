FROM nginx


COPY dist /usr/share/nginx/html/dashboard/
COPY config/docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

WORKDIR /var/www
ENTRYPOINT ["npm", "run", "server:prod"]
