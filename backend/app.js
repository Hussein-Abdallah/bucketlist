const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const schema = require('./graphql/schema');
const connectDB = require('./config/database');
const {isAuth} = require('./middleware');

const PORT = process.env.PORT || 5050;

const app = express();

connectDB();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    headers: 'Content-Type, Authorization',
    methods: 'POST,GET,OPTIONS',
    optionsSuccessStatus: 200,
  }),
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  return next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
