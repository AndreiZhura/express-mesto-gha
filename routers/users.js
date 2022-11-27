const userRouters = require('express').Router();

const {
  getUser,
  getUserId,
  updateUserAvatar,
  updateUserNameAndabout,
} = require('../controllers/users');

userRouters.get('/users', getUser);
userRouters.get('/users/:userId', getUserId);
userRouters.patch('/users/me', updateUserNameAndabout);
userRouters.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouters;
