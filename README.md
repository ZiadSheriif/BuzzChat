# BuzzChat Backend

This is the backend for the Group Chat application. It is built using Node.js, Express, and MongoDB.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a running instance of MongoDB.
- You have a `.env` file with the necessary environment variables.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/group-chat-backend.git
    cd group-chat-backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following environment variables:

    ```properties
    # .env
    DB_URL=mongodb://localhost:27017/your-database-name
    PORT=4000
    ```

## Running the Server

To start the server in development mode with automatic restarts on file changes, use `nodemon`:

```sh
npm start
```

## Project Structure
```
BuzzChat-Backend/
├── src/
│   ├── controllers/
│   │   └── users-controllers.ts
│   ├── models/
│   │   └── user.ts
│   ├── routes/
│   │   └── users-route.ts
│   ├── utils/
│   │   └── db-config.ts
│   └── app.ts
├── .env
├── nodemon.json
├── package.json
└── README.md
```



### Explanation
1. **Prerequisites**: Lists the requirements to run the project.
2. **Installation**: Provides step-by-step instructions to set up the project.
3. **Running the Server**: Explains how to start the server using `nodemon`.
4. **Project Structure**: Gives an overview of the project directory structure.
5. **API Endpoints**: Documents the available API endpoints.
6. **Contributing**: Provides guidelines for contributing to the project.
7. **License**: Mentions the project's license.

Feel free to customize this `README.md` file according to your project's specific needs.