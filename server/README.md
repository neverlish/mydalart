
## Installation

```bash
$ npm install
```

## Running the app

### Requirements
- postgres role ` mydalart` should exists
  - `createuser mydalart`
- postgres database `mydalart` should exists
  - `createdb mydalart;`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
