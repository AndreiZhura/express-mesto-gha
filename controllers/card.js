const card = require('../models/card');
const { ErrorCode, NotFoundError } = require('../errors/ErrorCode');

module.exports.createCard = (req, res, err, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((data) => res.status(200).send(data))
    .catch(next);
  if (err.name === 'ValidationError') {
    throw new ErrorCode('Нет пользователя с таким id');
  }
};

module.exports.getCard = (req, res, next) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, err, next) => {
  card
    .findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (err.name === 'CastError') {
        throw new ErrorCode('Данный пользователь уже существует');
      }
      return res.send({ data: cards });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, err, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (err.name === 'CastError') {
        throw new ErrorCode('Данный пользователь уже существует');
      }
      return res.send({ data: cards });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, err, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (err.name === 'CastError') {
        throw new ErrorCode('Данный пользователь уже существует');
      }
      return res.send({ data: cards });
    })
    .catch(next);
};
