const card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ErrorCode = require('../errors/ErrorCode');
const Forbidden = require('../errors/Forbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('Ошибка обработки данных'));
      } else {
        next(err);
      }
    });
};

module.exports.getCard = (req, res, next) => {
  card
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данной карточки не существует');
      } else if (!cards.owner.equals(req.user._id)) {
        throw new Forbidden('попытка удалить карточку другово пользователя');
      } else {
        return cards.remove().then(() => res.status(200).send(cards));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new Forbidden('Ошибка обработки данных');
      } else {
        next(err);
      }
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
        next(new ErrorCode('Ошибка обработки данных'));
      } else {
        next(err);
      }
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
        next(new ErrorCode('Ошибка обработки данных'));
      } else {
        next(err);
      }
    });
};
