# Installation

Clone the repository and then install the dependencies.

```bash
npm install
```

# CLI

## Linux / Mac / Git Bash

```bash
chmod +x fleet
```

```bash
./fleet create <userId>
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
```

## Windows PowerShell

```bash
.\fleet.cmd create <userId>
./fleet.cmd register-vehicle <fleetId> <vehiclePlateNumber>
```

# Tests

## Domaine

```bash
npx cucumber-js --profile domain
```

## PostgreSQL

Integration tests require an available PostgreSQL instance.
Create a test database and configure the environment variables.

### Database setup

```bash
psql -U postgres -d fleets -f database/schema.sql
```

### Postgres tests

```bash
npx cucumber-js --profile postgres
```

# Code quality (Tools used)

- **TypeScript strict mode**: provides compile-time type checking and prevents many runtime errors.
- **Cucumber**: executable specifications that validate business behaviors.

# CI/CD (GitHub Actions)

## Continuous Integration (CI)

The pipeline is triggered on pull requests and pushes to the main branch.

Necessary actions:

- Install Node.js dependencies (`npm install`).
- Run code quality checks.
- Start an isolated PostgreSQL instance using Docker for integration tests.
- Initialize the test database schema.
- Execute automated tests:
  - Domain tests without infrastructure using the `domain` Cucumber profile.
  - PostgreSQL integration tests using the `postgres` Cucumber profile.
- Build the application (`npm run build`) after successful validation.

## Continuous Delivery / Deployment (CD)

After successful CI validation:

- Generate a deployable application artifact.
- Deploy the application to the target environment (staging or production).
- Provide production configuration through environment variables/secrets.
- Run database migrations if required before starting the new version.

Production data remains isolated from development and CI environments.
