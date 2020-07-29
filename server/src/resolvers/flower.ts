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
            const flower = await Flower.query().where('id', args.id).first();
            console.info(flower);
            return flower;
        },
        flowers: (parent: any) => {
            return Flower.query();
        }
    }
};
