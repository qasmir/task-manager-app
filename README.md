# Task Manager Application

A simple task manager application built with Node.js, Express, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This Task Manager Application allows users to effectively manage and streamline their tasks. It provides features such as creating, reading, updating, and deleting tasks.

## Features

- Create a new task
- View all tasks
- View a task by ID
- Update an existing task
- Delete a task

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Docker
- Jest (for testing)
- Supertest (for testing HTTP endpoints)
- Webpack (for bundling)
- Winston (for logging)

## Setup

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [Docker](https://www.docker.com/)

### MongoDB

You can either use an existing MongoDB instance or deploy a MongoDB instance with the application using Docker Compose.

### Local Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/username/task-manager-app.git
   cd task-manager-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=your-mongodb-uri
   PORT=3000
   ```

## Running the Application

1. Start the application:

   ```sh
   npm start
   ```

2. Access the application at `http://localhost:3000`.

## Running Tests

1. Run the tests:

   ```sh
   npm test
   ```

## Docker

### Building and Running the Docker Image

1. Build the Docker image:

   ```sh
   docker build -t mirlabs/task-manager-app:1.0.0 .
   ```

2. Run the Docker container:

   ```sh
   docker run -p 3000:3000 mirlabs/task-manager-app:1.0.0
   ```

### Using the Latest Docker Image

1. Pull the latest Docker image:

   ```sh
   docker pull mirlabs/task-manager-app:latest
   ```

2. Run the Docker container:

   ```sh
   docker run -p 3000:3000 mirlabs/task-manager-app:latest
   ```

### Deploying with Docker Compose

If you prefer to deploy MongoDB with the application using Docker Compose, use the included `docker-compose.yml` file.

1. Ensure the `docker-compose.yml` file is correctly configured.
2. Deploy the application and MongoDB with Docker Compose:

   ```sh
   docker-compose up --build
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the ISC License.