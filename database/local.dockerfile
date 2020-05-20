# Dockerfile which creates a Postgres database for use in my local environment.
# Author: Andrew Jarombek
# Date: 5/20/2020

FROM postgres:12
WORKDIR /docker-entrypoint-initdb.d
ADD init.sql .
EXPOSE 5432
