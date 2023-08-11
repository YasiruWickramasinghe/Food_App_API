# API Documentation

Import the Postman documentation and proceed to verify the endpoints.

## Base URL

The base URL for all API endpoints is: `http://localhost:5000`.

## Endpoints

## User Authentication

This API module allows you to manage user authentication and user-related operations.

### Sign Up

Register a new user.

- **Endpoint**: `POST /auth/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "john@gmail.com",
    "password": "john@99",
    "userRole": "admin",
    "firstName": "john",
    "lastName": "deo"
  }

### Sign In

Log in a user and obtain access tokens.

- **Endpoint**: `POST /auth/signin`
- **Description**: Log in a user and obtain access  tokens.
- **Request Body**:
  ```json
  {
    "email": "john@gmail.com",
    "password": "john@99"
  }

### Update User

Update user profile information.

- **Endpoint**: `PATCH /users/1`
- **Description**: Update user profile information.
- **Headers**:
  - Authorization: Bearer `<access_token>`
- **Request Body**:
  ```json
  {
    "email": "david@gmail.com",
    "password": "david@99",
    "userRole": "admin",
    "firstName": "david",
    "lastName": "bekam"
  }

### Get User

Get the current user's profile details.

- **Endpoint**: `GET /users/me`
- **Description**: Get the current user's profile details.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Get All Users

Retrieve a list of all users.

- **Endpoint**: `GET /users/`
- **Description**: Retrieve a list of all users.
- **Headers**:
  - Authorization: Bearer `<access_token>`


## Foods Management

### Create Food

Create a new food.

- **Endpoint**: `POST /foods`
- **Description**: Create a new food.
- **Headers**:
  - Authorization: Bearer `<access_token>`
- **Request Body**:
  ```json
  {
    "foodName": "Meat",
    "description": "must eat food",
    "price": 2410
  }

### Get All Foods

Retrieve a list of all foods.

- **Endpoint**: `GET /foods`
- **Description**: Retrieve a list of all foods.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Get Foods by User Id

Retrieve foods for a specific user.

- **Endpoint**: `GET /foods/user`
- **Description**: Retrieve foods for a specific user.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Get Food by food Id

Retrieve a specific food by its ID.

- **Endpoint**: `GET /foods/6`
- **Description**: Retrieve a specific food by its ID.
- **Headers**:
  - Authorization: Bearer `<access_token>`

### Edit Food by Id

Update a specific food by its ID.

- **Endpoint**: `PATCH /foods/6`
- **Description**: Update a specific food by its ID.
- **Headers**:
  - Authorization: Bearer `<access_token>`
- **Request Body**:
  ```json
  {
    "foodName": "Chicken",
    "description": "food must eat",
    "price": 3750
  }

### Delete Food by Id

Delete a specific food by its ID.

- **Endpoint**: `DELETE /foods/6`
- **Description**: Delete a specific food by its ID.
- **Headers**:
  - Authorization: Bearer `<access_token>`


## Environment Variables

The following environment variables are used in the project:

- `DATABASE_URL`: Mysql connection URI.
- `JWT_SECRET`: provide secret key.
