/**
 * Entry point to the express/apollo server.
 * @author Andrew Jarombek
 * @since 5/16/2020
 */

import express, { Application } from 'express';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';

import schema from './schema';
import resolvers from './resolvers';

const app: Application = express();
const port = process.env.port ?? 8084;

app.use(helmet());
app.use(cors());

export interface Context {}

const config: ApolloServerExpressConfig = {
  typeDefs: schema,
  resolvers
};

const server = new ApolloServer(config);

server.applyMiddleware({ app, path: '/graphql' });

app.use('/ping', (req, res) => res.send({ time: moment().unix() }));

app.listen(port, () => {
  console.info(`Server started at http://localhost:${port}/graphql`);
});
