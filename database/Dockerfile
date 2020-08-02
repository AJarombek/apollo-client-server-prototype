# Dockerfile which creates a Postgres database for the apollo-client-server-prototype.
# Author: Andrew Jarombek
# Date: 5/20/2020

FROM postgres:12
WORKDIR /docker-entrypoint-initdb.d
ADD init.sql .
EXPOSE 5432
