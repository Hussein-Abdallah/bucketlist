const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
require("dotenv").config();

const schema = require("./graphql/schema");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  const app = express();

  await connectDB();

  app.use(bodyParser.json());

  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
