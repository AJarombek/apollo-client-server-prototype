### Overview

Server side Node.js/Express/Apollo code.  This application is the Apollo Server, which exposes a 
GraphQL API.

### Files

| Filename                 | Description                                                                |
|--------------------------|----------------------------------------------------------------------------|
| `src`                    | Node.js/Express/Apollo source code for the server application.             |
| `test`                   | E2E tests for the GraphQL/Apollo server.                                   |
| `.babelrc`               | Configuration for the Babel transpiler.                                    |
| `.eslintrc.js`           | ESLint configuration for the server TypeScript code.                       |
| `app.dockerfile`         | Dockerfile for running the server application.                             |
| `knexfile.ts`            | Knex database configuration file for local and production environments.    |
| `docker-compose.yml`     | Docker compose configuration to easily run the Dockerfile locally.         |
| `nginx.conf`             | Nginx server configuration for the server application.                     |
| `nginx.dockerfile`       | Dockerfile for an Nginx reverse proxy to the server application.           |
| `package.json`           | Entry point for the npm application.  Contains dependency definitions.     |
| `queries.graphql`        | Assortment of GraphQL queries that can be used with the server.            |
| `tsconfig.json`          | Typescript language configuration.                                         |
| `webpack.config.js`      | Webpack code bundler configuration file.                                   |
| `yarn.lock`              | Versions of each dependency used by Yarn.                                  |

### Resources

1. [Express API with TypeScript](https://medium.com/the-andela-way/how-to-set-up-an-express-api-using-webpack-and-typescript-69d18c8c4f52)
2. [Apollo Server in TypeScript](https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c)
3. [Apollo Typescript Strong Typing](https://www.formidable.com/blog/2019/strong-typing/)
4. [Apollo Typescript Type Creation](https://github.com/dotansimha/graphql-code-generator)
5. [Express + Knex + Objection](https://itnext.io/express-knex-objection-painless-api-with-db-74512c484f0c)
6. [Objection Models](https://vincit.github.io/objection.js/guide/models.html#examples)
