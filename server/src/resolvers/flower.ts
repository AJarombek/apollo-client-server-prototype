/**
 * Resolvers for the flower table.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import {
    Resolvers,
    QueryFlowerArgs,
    QueryFlowersInArgs,
    MutationPurchaseFlowersArgs, FlowerPurchase
} from '../types';
import Flower from "../models/flower";
import {raw} from "objection";

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
        },
        flowersIn: (parent: any, args: QueryFlowersInArgs) => {
            return Flower.query().where('id', 'in', args.in);
        },
    },
    Mutation: {
        purchaseFlowers: async (parent: any, args: MutationPurchaseFlowersArgs) => {
            try {
                await Flower.transaction(async () => {
                    const updates: Array<Promise<any>> = [];

                    args.purchases.forEach((purchase: FlowerPurchase) => {
                        const updatePromise = Flower.query().findById(purchase.id).patch({
                            count: raw('count - ?', purchase.count)
                        });
                        updates.push(updatePromise);
                    });

                    await Promise.all(updates);
                });

                return true;
            } catch (_) {
                return false;
            }
        }
    }
};
