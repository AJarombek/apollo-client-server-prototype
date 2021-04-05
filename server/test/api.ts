/**
 * Functions for making requests to the GraphQL API.  These are used by the end to end tests.
 * @author Andrew Jarombek
 * @since 4/4/2021
 */

import axios, { AxiosResponse } from 'axios';

export const FLOWER_ALL_FIELDS = `
    query flowerDetails($id: ID!) {
        flower(id: $id) {
            id
            name
            type
            image
            price
            salePrice
            onSale
            count
            inStock
            description
            __typename
        }
    }
`;

export const FLOWER_FEW_FIELDS = `
    query flowerDetails($id: ID!) {
        flower(id: $id) {
            id
            name
            price
            inStock
            description
        }
    }
`;

/* And I wish you were here */

export const ALL_FLOWERS_ALL_FIELDS = `
    query allFlowers {
        flowers {
            id
            name
            type
            image
            price
            salePrice
            onSale
            count
            inStock
            description
            __typename
        }
    }
`;

export const ALL_FLOWERS_FEW_FIELDS = `
    query allFlowers {
        flowers {
            id
            name
            price
        }
    }
`;

export const PING = `
    {
        ping
    }
`;

export const flower = (query: string, variables: object): Promise<AxiosResponse> =>
  axios.post('http://localhost:8084/graphql', {
    query,
    operationName: 'flowerDetails',
    variables
  });

export const ping = (): Promise<AxiosResponse> =>
  axios.post('http://localhost:8084/graphql', {
    query: PING
  });
