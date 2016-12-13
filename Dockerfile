FROM nginx


COPY dist /usr/share/nginx/html/dashboard/
COPY config/docker/default.conf /etc/nginx/conf.d/default.conf

