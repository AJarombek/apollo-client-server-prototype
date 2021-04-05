/**
 * GraphQL schema definition for pinging the server.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    ping: Int
  }
`;
