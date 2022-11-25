const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users');

const {
  ERROR_CODE,
  INTERNAL_SERVER_ERROR,
  FILE_NOT_FOUND,
  AUTHORIZATION_REQUIRED,
  SALT_ROUND,
} = require('../constants/constants');

module.exports.getUser = (req, res) => {
  users
    .find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserId = (req, res) => {
  users
    .findById(req.params.userId)
    .then((cards) => {
      if (!cards) {
        return res
          .status(FILE_NOT_FOUND)
          .send({ message: 'Данного пользователя не существует' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
    password,
  } = req.body;

  users
    .create({
      name,
      about,
      avatar,
      email,
      password,
    });
  bcrypt.hash(req.body.password, SALT_ROUND)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }
      if (!email || !password) {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Email или пароль не могут быть пустыми!!!' });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return users.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(AUTHORIZATION_REQUIRED)
        .send({ message: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((cards) => {
      if (!cards) {
        return res
          .status(FILE_NOT_FOUND)
          .send({ message: 'Данного пользователя не существует' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.updateUserNameAndabout = (req, res) => {
  const { name, about } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((cards) => {
      if (!cards) {
        return res
          .status(FILE_NOT_FOUND)
          .send({ message: 'Данного пользователя не существует' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};
