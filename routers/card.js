const userCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

userCards.get('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  }),
}), getCard);
userCards.post('/cards', createCard);
userCards.put('/cards/:cardId/likes', likeCard);
userCards.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);
userCards.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

module.exports = userCards;
