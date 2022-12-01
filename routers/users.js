const userRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserMe,
  getUser,
  getUserId,
  updateUserAvatar,
  updateUserNameAndabout,
} = require('../controllers/users');

userRouters.get('/users/me', getUserMe);
userRouters.get('/users', getUser);
userRouters.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    postId: Joi.string().hex().length(24),
  }),
}), getUserId);

userRouters.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserNameAndabout);

userRouters.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^((http|https|ftp):\/\/)\www.?\[a-zA-Z0-9_]#$/).min(2).max(30),
  }),
}), updateUserAvatar);

module.exports = userRouters;
