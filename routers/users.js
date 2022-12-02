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
    userId: Joi.string().length(24).hex(),
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
    avatar: Joi.string().regex(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/g),
  }),
}), updateUserAvatar);

module.exports = userRouters;
