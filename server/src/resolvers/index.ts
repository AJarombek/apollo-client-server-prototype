/**
 * Root resolvers module for the entire GraphQL API.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import {resolvers as pingResolvers} from './ping';
import {resolvers as flowerResolvers} from './flower';
import {IResolvers} from '../types';

const resolvers: IResolvers = {
    ...pingResolvers,
    ...flowerResolvers
};

export default resolvers;
