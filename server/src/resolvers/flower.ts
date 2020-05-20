import { QueryResolvers, QueryFlowerArgs } from '../types';

interface Resolvers {
    Query: QueryResolvers
}

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
