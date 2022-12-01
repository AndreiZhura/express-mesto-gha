const card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка обработки данных' });
      }

      return res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getCard = (req, res) => {
  card
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => {
      res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return res
          .status(404)
          .send({ message: 'Данной карточки не существует' });
      }
      if (!cards.owner.equals(req.user._id)) {
        res.status(403).send({ message: 'попытка удалить карточку другово пользователя' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(403)
          .send({ message: 'Ошибка обработки данных' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.likeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        return res
          .status(404)
          .send({ message: 'Данной карточки не существует' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Ошибка обработки данных' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        return res
          .status(404)
          .send({ message: 'Данной карточки не существует' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Ошибка обработки данных' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};
