const Users = require('../models/user');

module.exports.getUser = (req, res) => {
  Users
    .find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  Users
    .create({ name, about, avatar })
    .then((newUser) => res.status(201).send({ data: newUser }))
    .catch((err) => res.status(400).send(err));
};
