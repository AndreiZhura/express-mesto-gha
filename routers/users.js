const userRouters = require('express').Router();

const {
  getUser,
  getUserId,
  createUser,
  updateUserAvatar,
  updateUserNameAndabout,
} = require('../controllers/users');

userRouters.get('/users', getUser);
userRouters.get('/users/:userId', getUserId);
userRouters.post('/users', createUser);
userRouters.patch('/users/me', updateUserNameAndabout);
userRouters.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouters;
