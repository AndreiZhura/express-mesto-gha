const userRouters = require('express').Router();

const {
  getUser,
  getUserId,
  createUser,
  updateUserAvatar,
  updateUserNameAndabout,
  login,
} = require('../controllers/users');

userRouters.get('/users', getUser);
userRouters.get('/users/:userId', getUserId);
///
userRouters.post('/signin', login);
userRouters.post('/signup', createUser);
///
userRouters.patch('/users/me', updateUserNameAndabout);
userRouters.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouters;
