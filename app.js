const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const userRouters = require('./routers/users');
const userCardsRouters = require('./routers/card');

const app = express();
const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '636e4e352e8574d451380e0e',
  };

  next();
});
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user

app.use('/', userRouters);
// card
app.use('/', userCardsRouters);

app.use('*', (req, res) => { res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }); });

app.listen(PORT);
