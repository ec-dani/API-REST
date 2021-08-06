const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const user = require('./routes/userRout');
const book = require('./routes/bookRout');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,PATCH,DELETE,OPTIONS');
  next();
});


app.use('/user', user);
app.use('/book', book);


module.exports = app;
