# Backend Server for Bucket List App

This project is being created with the following stack

- NodeJs
- Express Js
- Express-GraphQL
- Mongo Database

## Starting the server

### Install

Open the project folder in a terminal, then install the dependencies of the backend server

```
    $ cd backend
    $ npm install
```

### Setup Environment file

In the backend folder, create `.env` file and set the following variables

```
NODE_ENV='development'
PORT=5050
MONGO_USER=''
MONGO_PASSWORD=''
MONGO_DB=''
JWT_SECRET_KEY=''
CLOUDINARY_API_KEY=''
CLOUDINARY_API_SECRET=''
CLOUDINARY_NAME=''
```

### Start the server

In the terminal, while you are in the `backend` folder, run:

```
    $ npm run dev
```
