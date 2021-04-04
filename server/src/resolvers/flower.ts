/**
 * Resolvers for the flower table.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import {
  Resolvers,
  QueryFlowerArgs,
  QueryFlowersInArgs,
  MutationPurchaseFlowersArgs,
  FlowerPurchase,
  Flower as GraphQLFlower
} from '../types';
import Flower from '../models/flower';
import { raw } from 'objection';

export const resolvers: Resolvers = {
  Query: {
    flower: async (parent: any, args: QueryFlowerArgs): Promise<GraphQLFlower> => {
      const flowers = (await Flower.query().where('id', args.id)) as Flower[];

      if (flowers) {
        return {
          ...flowers[0],
          id: `${flowers[0].id}`,
          inStock: flowers[0].in_stock,
          onSale: flowers[0].on_sale,
          salePrice: flowers[0].sale_price
        } as GraphQLFlower;
      } else {
        return null;
      }
    },
    flowers: async (): Promise<GraphQLFlower[]> => {
      const result = (await Flower.query().orderBy('id')) as Flower[];

      return result.map(
        (flower) =>
          ({
            ...flower,
            id: `${flower.id}`,
            inStock: flower.in_stock,
            onSale: flower.on_sale,
            salePrice: flower.sale_price
          } as GraphQLFlower)
      );
    },
    flowersIn: async (parent: any, args: QueryFlowersInArgs): Promise<GraphQLFlower[]> => {
      const result = (await Flower.query().where('id', 'in', args.in)) as Flower[];

      return result.map(
        (flower) =>
          ({
            ...flower,
            id: `${flower.id}`,
            inStock: flower.in_stock,
            onSale: flower.on_sale,
            salePrice: flower.sale_price
          } as GraphQLFlower)
      );
    }
  },
  Mutation: {
    purchaseFlowers: async (parent: any, args: MutationPurchaseFlowersArgs): Promise<boolean> => {
      try {
        await Flower.transaction(async () => {
          const updates: Array<Promise<any>> = [];

          args.purchases.forEach((purchase: FlowerPurchase) => {
            const updatePromise = Flower.query()
              .findById(purchase.id)
              .patch({
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
