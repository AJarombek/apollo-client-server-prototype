import { QueryResolvers } from '../types';

interface Resolvers {
    Query: QueryResolvers
}

export const resolvers: Resolvers = {
    Query: {
        flower: (parent: any, args: any) => {
            return {
                id: 1,
                name: 'placeholder name',
                url: 'sample.com'
            }
        }
    }
};
