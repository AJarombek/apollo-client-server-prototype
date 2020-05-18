/**
 * Entry point to the express/apollo server.
 * @author Andrew Jarombek
 * @since 5/16/2020
 */

import express, { Application } from 'express';
import { ApolloServer, gql } from "apollo-server-express";
import moment from 'moment';
import helmet from 'helmet';
import cors from 'cors';
import { importSchema } from 'graphql-import';

const app: Application = express();
const port = process.env ?? 8084;

app.use(helmet);
app.use(cors);

const schema = importSchema('schema/schema.graphql');

export interface Context {}

const resolvers = {
    Query: {
        ping: () => moment().unix(),
        flower: (parent: any, args: any) => {
            return {
                id: 1,
                name: 'placeholder name',
                url: 'sample.com'
            }
        }
    }
};

const server = new ApolloServer({
   typeDefs: schema,
   resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
    console.info(`Apollo Server started at http://localhost:${port}/graphql`)
});
