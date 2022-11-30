const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SALT_ROUND, SECRET_KEY_JWT } = require('../constants/constants');
const ErrorCode = require('../errors/ErrorCode');
const Forbidden = require('../errors/Forbidden');
const Unauthorized = require('../errors/Unauthorized');
const users = require('../models/users');

module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new ErrorCode('Нету Email или пароля');
  }

  users
    .findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        next(new Forbidden('Имя пользователя уже существует'));
      }
    })
    .catch(next);

  return bcrypt
    .hash(password, SALT_ROUND)
    .then((hash) => users.create({
      name,
      avatar,
      about,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error('Введены ны некорректные данные'));
      } next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return users.findUserByCredentials(email, password)
    .then((user) => {
      // напишите код здесь
      const token = jwt.sign({ _id: user._id }, SECRET_KEY_JWT, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true }).send(token);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
      next(new Unauthorized('err.message'));
      next(err);
    });
};
