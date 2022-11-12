const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const {
  getUser,
  getUserId,
  createUser,
  updateUserAvatar,
  updateUserNameAndabout,
} = require('./controllers/users');

const { getCard, createCard } = require('./controllers/card');

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
// user
app.get('/users', getUser);
app.get('/users/:userId', getUserId);
app.post('/users', createUser);
app.patch('/users/me', updateUserNameAndabout);
app.patch('/users/me/avatar', updateUserAvatar);

// card
app.get('/cards', getCard);
app.post('/cards', createCard);
app.listen(PORT);
