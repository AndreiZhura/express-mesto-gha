const users = require('../models/users');
/// Ошибки
const NotFoundError = require('../errors/NotFoundError');
const ErrorCode = require('../errors/ErrorCode');

module.exports.getUser = (req, res, next) => {
  users
    .find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  users
    .findById(req.params.userId)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данного пользователя не существует');
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ErrorCode('Ошибка обработки данных');
      }
      next(err);
    });
};

module.exports.getUserMe = (req, res, next) => {
  users.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Данного пользователя не существует');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ErrorCode('Ошибка обработки данных');
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данного пользователя не существует');
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorCode('Ошибка обработки данных');
      }

      next(err);
    });
};

module.exports.updateUserNameAndabout = (req, res, next) => {
  const { name, about } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данного пользователя не существует');
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorCode('Ошибка обработки данных');
      }

      next(err);
    });
};
