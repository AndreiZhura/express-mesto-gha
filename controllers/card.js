const card = require('../models/card');
const { ERROR_CODE } = require('../constants/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res.status(500).send({ message: err });
    });
};

module.exports.getCard = (req, res) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res.status(500).send({ message: err });
    });
};

module.exports.deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.cardId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res.status(500).send({ message: err });
    });
};

module.exports.likeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res.status(500).send({ message: err });
    });
};

module.exports.dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res.status(500).send({ message: err });
    });
};
