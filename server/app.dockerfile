# Dockerfile which creates the server application for the apollo-client-server-prototype.
# Author: Andrew Jarombek
# Date: 8/2/2020

FROM node:14.4.0 AS base

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for setting up the apolloserver-prototype nodejs application"

COPY . src

WORKDIR src
RUN yarn && yarn build

FROM nginx:1.19 AS server
COPY nginx.conf /etc/nginx/nginx.conf

RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs \
    && npm install -g pm2

WORKDIR /dist
COPY --from=base /src/dist .

RUN pm2 start /dist/app.js
