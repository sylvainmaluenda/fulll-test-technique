# Requirements
To run this project you will need a computer with Node, Typescript and Cucumber installed.

# Install
To install the project, you just have to run `npm install` to get all the dependencies

# Database
Integration tests & CLI require an available PostgreSQL instance.
Create a test database and configure the environment variables.
The following commands are available:

- Test connection :     `npm run infra:test`
- Init database :       `npm run infra:init`
- Clear database :      `npm run infra:clear`
- Reset database :      `npm run infra:reset`

# Tests
- Application tests :   `npm run test`
- Persistence tests :   `npm run test:postgres`

# CLI
- Create fleet :        `npm run fleet create <userId>`
- Register vehicle :    `npm run fleet register-vehicle <fleetId> <vehiclePlateNumber>`
- Add location
 :        `npm run fleet localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]`

# CI/CD (GitHub Actions)

## Continuous Integration (CI)

The pipeline is triggered on pull requests and pushes to the main branch.

Steps:

- Install Node.js dependencies using `npm ci`.
- Run code quality checks (linting, formatting, static analysis).
- Start an isolated PostgreSQL instance using Docker.
- Apply database migrations to initialize the test schema.
- Execute automated tests:
  - BDD scenarios with the `default` Cucumber profile using in-memory infrastructure.
  - BDD scenarios with the `postgres` Cucumber profile using PostgreSQL persistence.
- Build the application (`npm run build`) after successful validation.

The PostgreSQL profile executes critical BDD scenarios against real persistence to 
validate important business flows with production-like infrastructure.

## Continuous Delivery / Deployment (CD)

After successful CI validation:

- Generate a deployable application artifact.
- Deploy the artifact to the target environment (staging or production).
- Provide environment-specific configuration through secrets and environment variables.
- Execute database migrations before starting the new application version if required.
- Run post-deployment smoke tests.

Production data remains isolated from development and CI environments.
