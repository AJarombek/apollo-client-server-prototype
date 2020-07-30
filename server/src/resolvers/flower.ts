/**
 * Resolvers for the flower table.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import { Resolvers, QueryFlowerArgs } from '../types';
import Flower from "../models/flower";

export const resolvers: Resolvers = {
    Query: {
        flower: async (parent: any, args: QueryFlowerArgs) => {
            const flowers = await Flower.query().where('id', args.id);

            if (flowers) {
                return flowers[0];
            } else {
                return null;
            }
        },
        flowers: (parent: any) => {
            return Flower.query().orderBy('id');
        }
    }
};
