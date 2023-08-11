## Description

Food_APP_API implemrnt using NestJS and nestJS is a robust backend framework leveraging TypeScript for building efficient and scalable RESTful APIs. Here use All authentication and authorization functions and create All CRUD operations related to FOOD APP

## Technology

NestJS + TypeScript
MySQL + Docker container
Prisma ORM
JWT + PassportJS

## Setup MySQL or Postgre

1. change docker-compose.yml file
2. change .env file
3. change schema.prisma file

4. if docker previosly up then down your docker using run this command

    docker-compose down  

5. then re up docker container using run this command

    docker-compose up -d

6. then if previously create migration delete that files and run this command

    npx prisma migrate dev
    npx prisma migrate deploy
  

7.  then generate prisma using run this command
    
    npx prisma generate 

8. finally run project using run this command

    npm run start:dev 

9. you can check database using prisma studio      

    npx prisma studio

10. finally check using postman    


## Installation

```bash
$ npm install
```

## Running the app

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

## Resourse

FreeCodeCamp - Create a REST API




