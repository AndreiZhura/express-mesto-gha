const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { getUser, createUser } = require('./controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', getUser);
app.post('/users', createUser);

app.listen(PORT);
