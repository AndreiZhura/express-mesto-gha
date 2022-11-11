const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', router);

app.listen(PORT);
