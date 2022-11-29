const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SALT_ROUND, SECRET_KEY_JWT } = require('../constants/constants');
const Conflict = require('../errors/Conflict');
const Forbidden = require('../errors/Forbidden');
const users = require('../models/users');

module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new Conflict('Пожалуйста вбейте и Email и Пароль!');
  }

  users
    .findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        throw new Forbidden('Данный пользователь уже существует');
      }
    }).catch(next);
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
    .catch((err) => res.status(400).send(err));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return users.findUserByCredentials(email, password)
    .then((user) => {
      // напишите код здесь
      const token = jwt.sign({ _id: user._id }, SECRET_KEY_JWT, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true }).send(token);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
