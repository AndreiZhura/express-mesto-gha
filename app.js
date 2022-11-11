const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Users = require('./models/user');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '636e4e352e8574d451380e0e',
  };

  next();
});

app.get('/users', (req, res) => {
  res.send('<h1>привет</h1>');
});

app.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  Users
    .create({ name, about, avatar })
    .then((newUser) => res.status(201).send({ data: newUser }))
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT);
