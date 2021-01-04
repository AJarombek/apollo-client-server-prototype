# Dockerfile which creates the server application for the apollo-client-server-prototype.
# Author: Andrew Jarombek
# Date: 8/2/2020

FROM node:14.4.0 AS base

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for setting up the apolloserver-prototype nodejs application"

COPY . src

WORKDIR src
RUN npm install pm2 -g && yarn && yarn build

ENTRYPOINT ["pm2-runtime", "/src/dist/app.js"]
