# apollo-client-server-prototype

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
cd client
nvm use v13.9.0
yarn start
```

**Server**

```bash
cd server
nvm use v13.9.0
yarn build
node dist/app.js
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
