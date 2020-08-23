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
                return {
                    ...flowers[0],
                    inStock: flowers[0].in_stock,
                    onSale: flowers[0].on_sale,
                    salePrice: flowers[0].sale_price,
                };
            } else {
                return null;
            }
        },
        flowers: async (parent: any) => {
            const result = await Flower.query().orderBy('id');

            return result.map(flower => ({
                ...flower,
                inStock: flower.in_stock,
                onSale: flower.on_sale,
                salePrice: flower.sale_price,
            }));
        },
        flowersIn: async (parent: any, args: QueryFlowersInArgs) => {
            const result = await Flower.query().where('id', 'in', args.in);

            return result.map(flower => ({
                ...flower,
                inStock: flower.in_stock,
                onSale: flower.on_sale,
                salePrice: flower.sale_price,
            }));
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
