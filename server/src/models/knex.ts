/**
 * Configuration for the Knex database ORM.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import knexfile from '../../knexfile';
import knex from 'knex';

const environment = process.env.KNEX_ENV ?? 'local';

export default knex(knexfile[environment]);
