/**
 * Resolvers for the flower table.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import { Resolvers, QueryFlowerArgs } from '../types';

export const resolvers: Resolvers = {
    Query: {
        flower: (parent: any, args: QueryFlowerArgs) => {
            return {
                id: 1,
                name: 'placeholder name',
                url: 'sample.com'
            }
        }
    }
};
