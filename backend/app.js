const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5050;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req,res) => {
  res.send('About us Page');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
