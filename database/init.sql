-- Initialization SQL commands when the PostgreSQL database first boots up.
-- Author: Andrew Jarombek
-- Date: 5/20/2020

CREATE DATABASE shop;
CREATE USER apollo WITH ENCRYPTED PASSWORD 'apollo';
GRANT ALL PRIVILEGES ON DATABASE shop TO apollo;

CREATE TABLE flower (
    id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    lifespan VARCHAR(20) NOT NULL,
    in_stock BOOLEAN,
    count INTEGER,
    price FLOAT,
    description VARCHAR(255)
);
