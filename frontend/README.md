# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Frontend for Bucket List App

This project is being created with the following stack:

- React.js
- Apollo Client
- Cloudinary (for rendering images)
- React Bootstrap
- Formik (Form library)

## Starting the Server

### Installation

1. Open the project folder in a terminal.
2. Navigate to the frontend folder.
3. Install the dependencies of the frontend server by running the following command:

```bash
  $ cd frontend
  $ npm install
```

### Setup Environment File

1. In the frontend folder, create a `.env` file.
2. Set the following variables in the `.env` file:

```
REACT_APP_CLOUDINARY_UPLOAD_PRESET=''
REACT_APP_CLOUDINARY_FETCH_URL=''
REACT_APP_CLOUDINARY_CLOUD_NAME=''
REACT_APP_API_URL=''
```

### Start the Server

1. In the terminal, while you are in the `frontend` folder, run the following command:

```bash
  $ npm start
```
