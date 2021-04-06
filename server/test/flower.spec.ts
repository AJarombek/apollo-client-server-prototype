/**
 * GraphQL API tests for the 'flower' schema.
 * @author Andrew Jarombek
 * @since 4/4/2021
 */

import { expect } from 'chai';
import * as api from './api';

describe('Flower GraphQL Endpoints', () => {
  it('returns a flower with all properties if a valid identifier is passed', async () => {
    const expectedResult = {
      data: {
        flower: {
          count: 46,
          description: 'Pink flowering shrub.',
          id: '1',
          name: 'Azalea',
          image: 'azalea.jpg',
          inStock: true,
          onSale: false,
          price: 19.99,
          salePrice: 14.99,
          type: 'shrub',
          __typename: 'Flower'
        }
      }
    };

    const result = await api.flower(api.FLOWER_ALL_FIELDS, { id: '1' });
    expect(result.data).to.eql(expectedResult);
    expect(result.status).to.eql(200);
  });

  it('returns a flower with minimal fields if a valid identifier is passed', async () => {
    const expectedResult = {
      data: {
        flower: {
          id: '1',
          name: 'Azalea',
          inStock: true,
          price: 19.99,
          description: 'Pink flowering shrub.'
        }
      }
    };

    // I love you so much.  I'm sorry, its just hard for me to tell these days if you want me to keep on expressing
    // that love to you or not.

    const result = await api.flower(api.FLOWER_FEW_FIELDS, { id: '1' });
    expect(result.data).to.eql(expectedResult);
    expect(result.status).to.eql(200);
  });

  it('returns all the flowers in the database with all properties', async () => {
    const expectedFirstItem = {
      data: {
        flower: {
          count: 46,
          description: 'Pink flowering shrub.',
          id: '1',
          name: 'Azalea',
          image: 'azalea.jpg',
          inStock: true,
          onSale: false,
          price: 19.99,
          salePrice: 14.99,
          type: 'shrub',
          __typename: 'Flower'
        }
      }
    };

    const result = await api.flowers(api.ALL_FLOWERS_ALL_FIELDS);
    expect(result.data.data).to.have.length(9);
    expect(result.status).to.eql(200);
  });

  it('returns an error if an invalid identifier is passed', async () => {
    const result = await api.flower(api.FLOWER_ALL_FIELDS, { id: '0' });
    expect(Object.keys(result.data)).to.contain('errors');
    expect(result.status).to.eql(200);
  });
});
