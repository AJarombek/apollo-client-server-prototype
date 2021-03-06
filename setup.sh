#!/usr/bin/env bash

# Bash commands to setup the Apollo Client/Server application.
# Author: Andrew Jarombek
# Date: 5/18/2020

nvm install v13.9.0
nvm use v13.9.0
npm install -g yarn

# -------------
# Apollo Client
# -------------

cd client
yarn

# -------------
# Apollo Server
# -------------

cd server
yarn
yarn global add knex

# -------------------
# PostgreSQL Database
# -------------------

cd database
docker-compose up --build
