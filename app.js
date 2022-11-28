const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const userRouters = require('./routers/users');
const userCardsRouters = require('./routers/card');
const { FILE_NOT_FOUND } = require('./constants/constants');

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().regex(/^((http|https|ftp):\/\/)\www.?\[a-zA-Z0-9_]#$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.post('/signin', login);

// авторизация
app.use(auth);
// роуты, которым авторизация нужна
// card
app.use('/', userRouters);
app.use('/', userCardsRouters);

app.use('*', (req, res) => { res.status(FILE_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' }); });

app.listen(PORT);
