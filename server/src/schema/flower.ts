import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        flower(id: ID!): Flower
        flowers: [Flower]
        flowersIn(in: [ID]!): [Flower]
    }
    
    extend type Mutation {
        purchaseFlowers(purchases: [FlowerPurchase]): Boolean
    }

    type Flower {
        id: ID!,
        name: String!,
        image: String!,
        type: FlowerLifespan!,
        inStock: Boolean,
        onSale: Boolean,
        count: Int
        price: Float,
        salePrice: Float,
        description: String
    }

    input FlowerPurchase {
        id: ID!,
        count: Int!
    }

    enum FlowerLifespan {
        annual, perennial, shrub
    }
`;
