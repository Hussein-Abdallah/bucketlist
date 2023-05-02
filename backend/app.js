const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const bodyParser = require("body-parser");

require("dotenv").config();

const schema = require("./graphql/schema");
const connectDB = require("./config/database");
const {isAuth} = require("./middleware");

const PORT = process.env.PORT || 5050;

const app = express();

await connectDB();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  return next();
});

app.use(isAuth);

app.use(
  "/graphql",
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
