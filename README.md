# Project Overview

## Introduction

This project is a NestJS-based API that retrieves search results from DuckDuckGo, parses the results, and returns them in a paginated format. The API supports both GET and POST requests to fetch the results.

## Main Components

### Services

- **SearchService**: Handles the API search by querying DuckDuckGo.
- **ParseResultsService**: Parses the search results and formats them correctly.
- **PaginationService**: Handles pagination logic to return the results in a paginated format.
- **ResultsService**: Orchestrates the other services to fetch, parse, and paginate the results.

### Controllers

- **ResultsController**: Provides endpoints to retrieve search results. Supports both GET and POST requests.

### Interfaces

- **Result**: Defines the structure of a search result.
- **PaginatedData**: Defines the structure of the paginated response.

## Endpoints

### GET /results

Retrieves search results based on query parameters.

#### Query Parameters

- `q`: The search query (required).
- `page`: The page number (optional, default is 1).
- `size`: The number of results per page (optional, default is 10).

### POST /results

Retrieves search results based on the request body.

#### Request Body

- `q`: The search query (required).
- `page`: The page number (optional, default is 1).
- `size`: The number of results per page (optional, default is 10).

## Project setup

### Prerequisites

- Node.js
- Docker (optional, for running the project in a container)

### Installation

```bash
$ npm install
```

### Compile and run the project

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

docker run -p 4000:4000 proxy-api
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

## Documentation

The API Swagger Documentation can be found by accessing localhost:{{PORT}}/api

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
