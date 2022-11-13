const users = require('../models/users');
const { ERROR_CODE } = require('../constants/constants');

module.exports.getUser = (req, res) => {
  users
    .find({})
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

module.exports.getUserId = (req, res) => {
  users.findById(req.params.userId)
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  users
    .create({ name, about, avatar })
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

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  users.findByIdAndUpdate(req.user, { avatar }, { new: true, runValidators: true })
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

module.exports.updateUserNameAndabout = (req, res) => {
  const { name, about } = req.body;
  users.findByIdAndUpdate(req.user, { name, about }, { new: true, runValidators: true })
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
