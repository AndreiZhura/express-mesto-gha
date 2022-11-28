const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUND } = require('../constants/constants');
const users = require('../models/users');

module.exports.createUser = (req, res) => {
  // хешируем пароль
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: 'Пожалуйста вбейте и Email и Пароль!' });
  }

  users
    .findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res
          .status(403)
          .send({ message: 'Такой пользователь уже существует!' });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Что-то пошло не так' });
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
      res.status(201).send(user);
    })
    .catch((err) => res.status(400).send(err));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return users.findUserByCredentials(email, password)
    .then((user) => {
      // напишите код здесь
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      console.log(token);
      res.cookie('token', token, { httpOnly: true }).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
