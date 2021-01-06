/**
 * Knex SQL query builder configuration file.  Defines the connections to PostgreSQL.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

interface KnexConfig {
  [key: string]: object;
}

const knexConfig: KnexConfig = {
  local: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'apollolocal',
      database: 'postgres'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: 'apollo-client-server-prototype-db',
      user: 'postgres',
      password: 'apollolocal',
      database: 'postgres'
    }
  }
};

export default knexConfig;
