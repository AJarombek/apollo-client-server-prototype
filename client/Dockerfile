# Dockerfile which creates the client application for the apollo-client-server-prototype.
# Author: Andrew Jarombek
# Date: 8/2/2020

FROM node:14.4.0 AS base

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for setting up the apollo-client-server-prototype client application"

COPY . src

WORKDIR src
RUN yarn && yarn build

FROM nginx:1.19 AS server

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=base /src/dist /usr/share/nginx/html

