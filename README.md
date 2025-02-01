<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Proxy API Project Backend.

## Project setup

```bash
$ npm install
```

## Compile and run the project

First, create the .env file, following the standard on .env.example.
In order to run the project, we can follow the local setup:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Or the Docker approach:

```bash
docker build -t proxy-api .

docker run -p 3000:3000 proxy-api
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
