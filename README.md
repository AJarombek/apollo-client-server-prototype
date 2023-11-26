# apollo-client-server-prototype

![Maintained Label](https://img.shields.io/badge/Maintained-No-red?style=for-the-badge)
![Deprecated Label](https://img.shields.io/badge/Deprecated-Yes-lightgray?style=for-the-badge)
![Archived Label](https://img.shields.io/badge/Archived-Yes-lightgray?style=for-the-badge)

> Code Migrated to [andy-jarombek-research](https://github.com/AJarombek/andy-jarombek-research)

### Overview

GraphQL client and server application which uses Apollo Client/Server libraries.  The front-end is 
React.js and the back-end is Node.js/Express.  Both client and server are written in TypeScript.

### Commands

**First Time Setup**

```bash
nvm install v13.9.0
npm install -g yarn

cd server && yarn && cd ..
cd client && yarn && cd ..
```

**Client**

```bash
# Start the web application with yarn
cd client
nvm use v13.9.0
yarn start

# Start the web application using Docker
cd client
docker-compose up --build
```

**Server**

```bash
# Start the server using yarn
cd server
nvm use v13.9.0
yarn build
node dist/app.js

# Start the server using Docker
cd server
docker-compose up --build
```

**Database**

```bash
cd database
docker-compose up --build
```

### Files

| Filename              | Description                                                               |
|-----------------------|---------------------------------------------------------------------------|
| `client`              | Client side (React.js/Apollo Client) code for the application.            |
| `database`            | PostgreSQL database holding application data.                             |
| `infra`               | Terraform/AWS infrastructure.                                             |
| `server`              | Server side (Node.js/Express/Apollo Server) code for the application.     |
| `setup.sh`            | Bash commands to setup the application.                                   |
