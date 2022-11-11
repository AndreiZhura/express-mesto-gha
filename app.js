const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routers/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', router);

app.use((req, res, next) => {
  req.user = {
    _id: '636e4e352e8574d451380e0e',
  };

  next();
});

app.listen(PORT);
