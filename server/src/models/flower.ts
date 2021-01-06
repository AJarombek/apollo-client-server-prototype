/**
 * Model for the Flower table in the database.
 * @author Andrew Jarombek
 * @since 5/22/2020
 */

import { Model } from 'objection';
import knex from './knex';

Model.knex(knex);

class Flower extends Model {
  id!: number;
  name!: string;
  image!: string;
  type!: string;
  in_stock: boolean;
  on_sale: boolean;
  count: number;
  price: number;
  sale_price: number;
  description: string;

  static get tableName() {
    return 'shop.flower';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'image', 'type'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 50 },
        image: { type: 'string', minLength: 1, maxLength: 50 },
        type: { type: 'string', minLength: 1, maxLength: 20 },
        in_stock: { type: 'boolean' },
        on_sale: { type: 'boolean' },
        count: { type: 'integer' },
        price: { type: 'float' },
        sale_price: { type: 'float' },
        description: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }
}

export default Flower;
