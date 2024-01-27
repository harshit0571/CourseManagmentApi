# API Endpoints

## Authentication

### Register a new user

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user with the provided username and password.
- **Request Body**:
  ```json
  {
    "username": "example_user",
    "name":"name_example",
    "email":"example_email"
    "password": "secretpassword"
  }
  ```

### login a user

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: login user with the provided username and password.
- **Request Body**:
  ```json
  {
    "username": "example_user",
    "password": "secretpassword"
  }
  ```

## Courses

### Create a new course

- **Endpoint**: `/course`
- **Method**: `POST`
- **Description**: Create a new course with the provided details.
- **Request Body**:
  ```json
  {
    "title": "python",
    "description": "python course for beginers",
    "instructor": "Harshit Chadha",
    "duration": 10
  }
  ```

### Add modules and videos to the course

- **Endpoint**: `/course/:courseId/modules`
- **Method**: `POST`
- **Description**: Add a new module with the provided details.
- **Request Body**:
  ```json
  {
    "moduleTitle": "week 1",
    "videosArray": [
      {
        "title": "data types",
        "url": "https://www.youtube.com/watch?v=zOjov-2OZ0E&pp=ygUSY291cnNlIHByb2dyYW1taW5n"
      },
      {
        "title": "arrays",
        "url": "https://www.youtube.com/watch?v=zOjov-2OZ0E&pp=ygUSY291cnNlIHByb2dyYW1taW5n"
      },
      {
        "title": "string",
        "url": "https://www.youtube.com/watch?v=zOjov-2OZ0E&pp=ygUSY291cnNlIHByb2dyYW1taW5n"
      },
      {
        "title": "objects",
        "url": "https://www.youtube.com/watch?v=zOjov-2OZ0E&pp=ygUSY291cnNlIHByb2dyYW1taW5n"
      }
    ]
  }
  ```

### get all courses

- **Endpoint**: `/course`
- **Method**: `GET`
- **Description**: Get all courses.

### get specific course

- **Endpoint**: `/course/:courseId`
- **Method**: `GET`
- **Description**: Get specific course with course id.

## User

### get a user's details

- **Endpoint**: `/user/username`
- **Method**: `GET`
- **Description**: get user's details like name, email, and enrolled courses by sending username.

## Enroll

### Enroll in a course

- **Endpoint**: `/enroll/:courseId`
- **Method**: `POST`
- **Description**: Enroll in a course by sending courseID in params.
