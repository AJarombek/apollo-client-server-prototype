# apollo-client-server-prototype

### Overview

GraphQL client and server application which uses Apollo Client/Server libraries.  The front-end is 
React.js and the back-end is Node.js/Express.  Both client and server are written in TypeScript.

### Commands

**Client**

```bash
cd client
yarn start
```

**Server**

```bash
cd server
yarn build
node dist/app.js
```

**Database**

```bash
cd database
```

### Files

| Filename              | Description                                                               |
|-----------------------|---------------------------------------------------------------------------|
| `client`              | Client side (React.js/Apollo Client) code for the application.            |
| `database`            | PostgreSQL database holding application data.                             |
| `infra`               | Terraform/AWS infrastructure.                                             |
| `server`              | Server side (Node.js/Express/Apollo Server) code for the application.     |
| `setup.sh`            | Home page (when signed-out) for the application.                          |
