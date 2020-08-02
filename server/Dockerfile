# Dockerfile which creates the server application for the apollo-client-server-prototype.
# Author: Andrew Jarombek
# Date: 8/2/2020

FROM node:14.4.0 AS base

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for setting up the apollo-client-server-prototype client application"

COPY . src

WORKDIR src
RUN npm install -g yarn && yarn && yarn build

FROM nginx:1.19 AS server
COPY nginx.conf /etc/nginx/nginx.conf

RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
    && bash nodesource_setup.sh
    && apt-get install -y nodejs
    && npm install -g pm2

WORKDIR /dist
COPY --from=base /src/dist .

EXPOSE 80

STOPSIGNAL SIGTERM

ENTRYPOINT ["pm2", "start", "/dist/app.js", "&&", "nginx", "-g", "daemon off;"]
