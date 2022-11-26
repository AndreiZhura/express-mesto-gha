const bcrypt = require('bcrypt');
const users = require('../models/users');

const {
  ERROR_CODE,
  INTERNAL_SERVER_ERROR,
  FILE_NOT_FOUND,
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
    .hash(req.body.password, SALT_ROUND)
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

  if (!email || !password) {
    return res.status(403).send({ message: 'нету Email или пароля!' });
  }
  return res.status(200).send({ message: 'Всё верно!' });
};
