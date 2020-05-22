/**
 * Knex SQL query builder configuration file.  Defines the connections to PostgreSQL.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

export default {
  local: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'apollo',
      password: 'apollo',
      database: 'postgres'
    }
  }
};
