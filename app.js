const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./routers/users'));

app.listen(PORT);
