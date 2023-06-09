const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const schema = require('./graphql/schema');
const connectDB = require('./config/database');
const {isAuth} = require('./middleware');

const PORT = process.env.PORT || 5050;

const app = express();

connectDB();

app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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
