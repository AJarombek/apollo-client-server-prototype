import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        flower(id: ID!): Flower
        flowers: [Flower]
    }

    type Flower {
        id: ID!,
        name: String!,
        image: String!,
        lifespan: FlowerLifespan!,
        inStock: Boolean,
        onSale: Boolean,
        count: Int
        price: Float,
        salePrice: Float,
        description: String
    }

    enum FlowerLifespan {
        ANNUAL, PERENNIAL, SHRUB
    }
`;
