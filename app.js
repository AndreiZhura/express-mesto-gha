const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const userRouters = require('./routers/users');
const userCardsRouters = require('./routers/card');
const { FILE_NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./constants/constants');

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// роуты, не требующие авторизации,
// например, регистрация и логин

// регистрация
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^((http|https|ftp):\/\/)\www.?\[a-zA-Z0-9_]#$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

// логин
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// авторизация
app.use(auth);
// роуты, которым авторизация нужна
app.use('/', userRouters);
app.use('/', userCardsRouters);

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.use('*', (req, res) => { res.status(FILE_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' }); });

app.listen(PORT);
