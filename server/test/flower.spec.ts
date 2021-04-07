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
          count: 5,
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
      count: 5,
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
    };

    const expectedLastItem = {
      count: 5,
      description: 'Orange flowering plant.',
      id: '9',
      name: 'Narrowleaf Zinnia',
      image: 'zinnia.jpg',
      inStock: true,
      onSale: true,
      price: 12.99,
      salePrice: 9.99,
      type: 'perennial',
      __typename: 'Flower'
    };

    const result = await api.flowers(api.ALL_FLOWERS_ALL_FIELDS);
    expect(result.data.data.flowers).to.have.length(9);
    expect(result.data.data.flowers[0]).to.eql(expectedFirstItem);
    expect(result.data.data.flowers[8]).to.eql(expectedLastItem);
    expect(result.status).to.eql(200);
  });

  it('returns all the flowers in the database with a few properties', async () => {
    const expectedFirstItem = {
      id: '1',
      name: 'Azalea',
      price: 19.99
    };

    const expectedLastItem = {
      id: '9',
      name: 'Narrowleaf Zinnia',
      price: 12.99
    };

    const result = await api.flowers(api.ALL_FLOWERS_FEW_FIELDS);
    expect(result.data.data.flowers).to.have.length(9);
    expect(result.data.data.flowers[0]).to.eql(expectedFirstItem);
    expect(result.data.data.flowers[8]).to.eql(expectedLastItem);
    expect(result.status).to.eql(200);
  });

  it('returns an error if an invalid identifier is passed', async () => {
    const result = await api.flower(api.FLOWER_ALL_FIELDS, { id: '0' });
    expect(Object.keys(result.data)).to.contain('errors');
    expect(result.status).to.eql(200);
  });

  it('returns all the flowers in a list with all properties', async () => {
    const expectedSecondItem = {
      count: 5,
      description: 'Small yellow flowering perennial.',
      id: '2',
      name: 'Baby Primrose',
      image: 'baby-primrose.jpg',
      inStock: true,
      onSale: true,
      price: 7.99,
      salePrice: 5.99,
      type: 'perennial',
      __typename: 'Flower'
    };

    const result = await api.flowersIn(api.FLOWERS_IN_ALL_FIELDS, { in: ['1', '2'] });
    expect(result.data.data.flowersIn).to.have.length(2);
    expect(result.data.data.flowersIn[1]).to.eql(expectedSecondItem);
  });

  it('returns all the flowers in a list with a few properties', async () => {
    const expectedData = {
      data: {
        flowersIn: [
          {
            id: '3',
            name: 'Geranium'
          },
          {
            id: '4',
            name: 'Heart Flower'
          }
        ]
      }
    };

    const result = await api.flowersIn(api.FLOWERS_IN_FEW_FIELDS, { in: ['3', '4'] });
    expect(result.data.data.flowersIn).to.have.length(2);
    expect(result.data).to.eql(expectedData);
  });

  it('returns no flowers if no ids are passed', async () => {
    const expectedData = {
      data: {
        flowersIn: [] as object[]
      }
    };

    const result = await api.flowersIn(api.FLOWERS_IN_ALL_FIELDS, { in: [] });
    expect(result.data).to.eql(expectedData);
  });

  it('returns no flowers if invalid ids are passed', async () => {
    const expectedData = {
      data: {
        flowersIn: [] as object[]
      }
    };

    const result = await api.flowersIn(api.FLOWERS_IN_ALL_FIELDS, { in: ['0', '-1'] });
    expect(result.data).to.eql(expectedData);
  });

  it('returns only the valid flowers if a mix of valid and invalid ids are passed', async () => {
    const expectedData = {
      data: {
        flowersIn: [
          {
            id: '5',
            name: 'Lilac'
          },
          {
            id: '6',
            name: 'Periwinkle'
          }
        ]
      }
    };

    const result = await api.flowersIn(api.FLOWERS_IN_FEW_FIELDS, { in: ['6', '10', '5', '-10'] });
    expect(result.data).to.eql(expectedData);
  });
});
