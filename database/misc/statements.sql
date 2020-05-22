-- Miscellaneous SQL statements to run on the PostgreSQL database.
-- Author: Andrew Jarombek
-- Date: 5/21/2020

-- See the current schema that the database connection is using.
SELECT current_schema();

-- See the search path for resolving object names with no schema identifier.
SHOW search_path;

-- Select from the flower table with or without the schema name.
SELECT * FROM flower;
SELECT * FROM shop.flower;
