/**
 * Root resolvers module for the entire GraphQL API.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import { resolvers as pingResolvers } from './ping';
import { resolvers as flowerResolvers } from './flower';
import { IResolvers } from '../types';

const resolvers: IResolvers = {
  Query: {
    ...pingResolvers.Query,
    ...flowerResolvers.Query
  },
  Mutation: {
    ...flowerResolvers.Mutation
  }
};

export default resolvers;
