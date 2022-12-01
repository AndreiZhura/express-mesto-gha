const users = require('../models/users');

module.exports.getUser = (req, res) => {
  users
    .find({})
    .then((user) => res.status(200).send({ message: user }))
    .catch(() => {
      res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserId = (req, res) => {
  users
    .findById(req.params.userId)
    .then((cards) => {
      if (!cards) {
        return res
          .status(404)
          .send({ message: 'Данного пользователя не существует' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Ошибка обработки данных_1' });
      }
      return res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserMe = (req, res) => {
  users.findById(req.user)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Данного пользователя не существует' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Ошибка обработки данных_4' });
      }
      return res
        .status(500)
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
          .status(404)
          .send({ message: 'Данного пользователя не существует' });
      }
      return res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка обработки данных_2' });
      }

      return res
        .status(500)
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
          .status(404)
          .send({ message: 'Данного пользователя не существует' });
      }
      return res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка обработки данных_3' });
      }

      return res
        .status(500)
        .send({ message: 'Ошибка по умолчанию.' });
    });
};
