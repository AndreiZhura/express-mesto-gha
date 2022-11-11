const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Users = require('./models/user');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  res.send('<h1>привет</h1>');
});

app.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  Users
    .create({ name, about, avatar })
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT);
