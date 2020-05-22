import { gql } from 'apollo-server-express';

import pingSchema from "./ping";
import flowerSchema from "./flower";

const baseSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [baseSchema, pingSchema, flowerSchema];
