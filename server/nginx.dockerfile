# Dockerfile which creates an nginx reverse proxy for the apollo-server-prototype.
# Author: Andrew Jarombek
# Date: 1/3/2021

FROM nginx:latest

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile which creates an nginx reverse proxy for the apollo-server-prototype"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

STOPSIGNAL SIGTERM
EXPOSE 80