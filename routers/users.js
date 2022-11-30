const userRouters = require('express').Router();

const {
  getUserMe,
  getUser,
  getUserId,
  updateUserAvatar,
  updateUserNameAndabout,
} = require('../controllers/users');

userRouters.get('/users/me', getUserMe);

userRouters.get('/users', getUser);

userRouters.get('/users/:userId', getUserId);

userRouters.patch('/users/me', updateUserNameAndabout);

userRouters.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouters;
