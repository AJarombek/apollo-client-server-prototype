import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        flower(id: ID!): Flower
        flowers: [Flower]
        flowersIn(in: [ID]!): [Flower]
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

    enum FlowerLifespan {
        annual, perennial, shrub
    }
`;
