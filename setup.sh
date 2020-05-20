#!/usr/bin/env bash

# Bash commands to setup the Apollo Client/Server application.
# Author: Andrew Jarombek
# Date: 5/18/2020

nvm use v10.15.3

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

# -------------------
# PostgreSQL Database
# -------------------

cd database
docker-compose up --build
