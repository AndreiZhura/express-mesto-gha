const userRouters = require('express').Router();

const {
  getUser,
  getUserId,
  createUser,
  updateUserAvatar,
  updateUserNameAndabout,
  login,
  getUserMe,
} = require('../controllers/users');

userRouters.get('/users', getUser);
userRouters.get('/users/:userId', getUserId);
///
userRouters.get('/users/me', getUserMe);
userRouters.post('/signin', login);
userRouters.post('/signup', createUser);
///
userRouters.patch('/users/me', updateUserNameAndabout);
userRouters.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouters;
