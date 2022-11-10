const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.get('/', (req, res) => {
  res.status(200).send('<h1>Привет мир</h1>');
});

// подключаемся к серверу mongo
// подключаем мидлвары, роуты и всё остальное...

app.listen(3010);
