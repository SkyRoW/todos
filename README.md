<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center"><b>Nest project for creating todo lists .</b></p>


## Installation

1. Install dependencies
```bash
$ npm install
```
2. Install postgresql and create local database.
3. Create .env based of env.example and provide your postgresql credentials with database name
4. Run migrations
```bash
$ npm run mig:run
```

## Running the app

```bash
# start app
$ npm run start
```

## Tests

```bash
# run unit tests
$ npm run test

```

## API documentation
1. Open postman
2. Click on import and paste collection url that was provided to you.
3. Now with app running you can call endpoints.

Notes:
 - Public routes can be called normally and are marked with [Public]
 - Other routes have bearer token in authorization tab that will be populated during login/register call
 - Replace {{listId}}, {{listItemId}}, {{collaborator1Id}}, ... with actual values
