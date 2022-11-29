const userCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

userCards.get('/cards', getCard);
userCards.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(30),
  }),
}), createCard);
userCards.put('/cards/:cardId/likes', likeCard);
userCards.delete('/cards/:cardId/likes', dislikeCard);
userCards.delete('/cards/:cardId', deleteCard);

module.exports = userCards;
