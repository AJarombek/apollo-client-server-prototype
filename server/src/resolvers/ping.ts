/**
 * Resolvers for pinging the backend.  This is used for testing that the GraphQL API is
 * up and running.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import { Ping, Resolvers } from '../types';
import moment from 'moment';

export const resolvers: Resolvers = {
  Query: {
    ping: (): Ping => {
      return {
        time: moment().unix()
      };
    }
  }
};
