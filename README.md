# The Full Stack Template

A full stack project template. Use as a starting point / template for full stack projects. Modify anything to your liking.

## Installation and Usage

The easiest way to install and run is using [Docker](https://www.docker.com/).
Clone the repo and create a `secrets.env` file (in the root directory of the repository). You should setup the file as following:

```shell
POSTGRES_DB = your_db_name (the database name)
POSTGRES_USER = your_db_user (the database user)
POSTGRES_PASS = your_db_pass (the database password for the given user)
JWT_SECRET = your_jwt_secret (used for jwt authentication)
```

These will be used as environment variables in the docker containers.

After this you can run `docker-compose up` and everything should be automatically assembled.

### Checking the Installation

You should be able to access the following ports from your localhost:

- **Vue Frontend** - 8080
- **GraphQL API** - 4000/graphql
- **PostgreSQL DB** - 5432

You can change the ports mapping in the `docker-compose.yml` file.

To check if everything is running, go to [localhost:8080](localhost:8080) in your browser. Try creating an account, logging in, and logging out.

## Overview

A general overview of what is included in the template: languages, technologies, frameworks, etc...

### Frontend

- Vue 2
- Bootstrap
- Axios requests
- JWT stored in cookies
- SCSS

### Backend

- GraphQL API
- Apollo Server
- Express
- Node.js
- PostgreSQL Database
- JWT Authentication
- Password encryption
