const users = require('../models/users');
const {
  ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require('../constants/constants');
const NotFoundError = require('../errors/errors');

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
        // если такого пользователя нет,
        // сгенерируем исключение
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных_1' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserMe = (req, res) => {
  users.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных_4' });
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
        throw new NotFoundError('Нет пользователя с таким id');
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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных_3' });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};
