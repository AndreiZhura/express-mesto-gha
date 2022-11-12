const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const userRouters = require('./routers/users');
const { getCard, createCard, deleteCard } = require('./controllers/card');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.use('/users', userRouters);
// card
app.get('/cards', getCard);
app.post('/cards', createCard);
app.delete('/cards/:cardId', deleteCard);

app.use((req, res, next) => {
  req.user = {
    _id: '636e4e352e8574d451380e0e',
  };

  next();
});

app.listen(PORT);
