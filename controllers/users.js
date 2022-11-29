const users = require('../models/users');
const { NotFoundError } = require('../errors/NotFoundError');

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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: cards });
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  users.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: user });
    })
    .catch(next);
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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: cards });
    })
    .catch(next);
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
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: cards });
    })
    .catch(next);
};
