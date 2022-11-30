const userCards = require('express').Router();

const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

userCards.get('/cards', getCard);
userCards.post('/cards', createCard);
userCards.put('/cards/:cardId/likes', likeCard);
userCards.delete('/cards/:cardId/likes', dislikeCard);
userCards.delete('/cards/:cardId', deleteCard);

module.exports = userCards;
