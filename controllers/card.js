const card = require('../models/card');
/// Ошибки
const ErrorCode = require('../errors/ErrorCode');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorCode('Ошибка обработки данных');
      }

      next(err);
    });
};

module.exports.getCard = (req, res, next) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  card
    .findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данной карточки не существует');
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

module.exports.likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данной карточки не существует');
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

module.exports.dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данной карточки не существует');
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
