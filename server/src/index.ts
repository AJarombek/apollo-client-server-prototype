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
import winston from 'winston';

import schema from './schema';
import resolvers from './resolvers';
import { ApolloServerPlugin, BaseContext, GraphQLRequestContext } from 'apollo-server-plugin-base';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const app: Application = express();
const port = process.env.NODE_PORT ?? 8084;

app.use(helmet());
app.use(cors());

const loggingPlugin: ApolloServerPlugin = {
  requestDidStart(requestContext: GraphQLRequestContext<BaseContext>) {
    logger.info({
      time: moment().format(),
      query: requestContext.request.query,
      operationName: requestContext.request.operationName,
      variables: requestContext.request.variables
    });

    return {};
  }
};

export type Context = {};

const config = {
  typeDefs: schema,
  resolvers,
  plugins: [loggingPlugin]
};

const server = new ApolloServer(config as ApolloServerExpressConfig);

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}/graphql`);
});
