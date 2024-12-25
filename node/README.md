# Task Manager - Node Backend

This directory contains the backend code for the Task Manager Application built with Node.js and Express.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [License](#license)

## Introduction

The backend of the Task Manager Application provides a RESTful API to manage tasks. It includes endpoints for creating, reading, updating, and deleting tasks.

## Project Structure

```plaintext
node
├── README.md
├── app.js
├── configs
│   └── db.js
├── logger.js
├── models
│   ├── counter.js
│   └── task.js
├── package.json
├── routes
│   └── task.js
├── tests
│   └── task.test.js
└── webpack.config.js
```

- `app.js`: Main entry point for the application.
- `configs/db.js`: Database configuration and connection setup.
- `logger.js`: Logger configuration using Winston.
- `models/`: Directory containing Mongoose models.
  - `task.js`: Task model.
- `routes/task.js`: Task routes defining API endpoints.
- `tests/task.test.js`: Unit tests for task-related functionality.
- `webpack.config.js`: Webpack configuration for bundling the application.

## Setup

1. Navigate to the `node` directory:

   ```sh
   cd node
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

## Running the Application

1. Start the application:

   ```sh
   npm start
   ```

2. Access the API at `http://localhost:3000/tasks`.

## Testing

1. Run the tests:

   ```sh
   npm test
   ```

## Environment Variables

Create a `.env` file in the `node` directory with the following content:

```env
MONGODB_URI=your-mongodb-uri
PORT=3000
```

This file is used to configure the database connection and the application port.

## License

This project is licensed under the ISC License.