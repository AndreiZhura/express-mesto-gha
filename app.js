const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const users = require('./models/user');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  users
    .create({ name, about, avatar })
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT);
