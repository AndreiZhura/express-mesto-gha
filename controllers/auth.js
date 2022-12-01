const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SALT_ROUND, SECRET_KEY_JWT } = require('../constants/constants');
const ErrorCode = require('../errors/ErrorCode');
const Conflict = require('../errors/Conflict');
const AuthorizationRequired = require('../errors/AuthorizationRequired');
const users = require('../models/users');

module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new ErrorCode('Пожалуйста вбейте и Email и Пароль!');
  }

  users
    .findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        next(new Conflict('Такой пользователь уже существует!'));
      }
    });

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
      res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('введены некоректные данные'));
      }
      next(err);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return users.findUserByCredentials(email, password)
    .then((user) => {
      // напишите код здесь
      const token = jwt.sign({ _id: user._id }, SECRET_KEY_JWT, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true }).send({ token });
    })
    .catch((err) => {
      throw new AuthorizationRequired(err.message);
    });
};
