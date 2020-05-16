/**
 * Entry point to the express/apollo server.
 * @author Andrew Jarombek
 * @since 5/16/2020
 */

import express, { Application } from 'express';
import { ApolloServer, gql } from "apollo-server-express";

const app: Application = express();
const port = process.env ?? 8084;

const schema = gql``;
const resolvers = {};

const server = new ApolloServer({
   typeDefs: schema,
   resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
    console.info(`Apollo Server started at http://localhost:${port}/graphql`)
});
