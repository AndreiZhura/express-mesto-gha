const router = require('express').Router();
const Users = require('../models/user');

router.get('/users', (req, res) => {
  Users.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((newUser) => res.status(201).send({ data: newUser }))
    .catch((err) => res.status(400).send(err));
});
