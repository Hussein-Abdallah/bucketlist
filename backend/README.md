# Backend Server for Bucket List App

This project is being created with the following stack:

- Node.js
- Express.js
- Express-GraphQL
- MongoDB

## Starting the Server

### Installation

1. Open the project folder in a terminal.
2. Navigate to the backend folder.
3. Install the dependencies of the backend server by running the following command:

```bash
$ cd backend
$ npm install
```

### Setup Environment File

1. In the backend folder, create a `.env` file.
2. Set the following variables in the `.env` file:

```
NODE_ENV='development'
PORT=5050
MONGO_USER=''
MONGO_PASSWORD=''
MONGO_DB=''
JWT_SECRET_KEY=''
CLIENT_URL='http://localhost:3000'
```

### Start the Server

1. In the terminal, while you are in the `backend` folder, run the following command:

```bash
    $ npm run dev
```
