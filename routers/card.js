const userCards = require('express').Router();

const { createCard, getCard, deleteCard } = require('../controllers/card');

userCards.get('/cards', getCard);
userCards.post('/cards', createCard);
userCards.delete('/cards/:cardId', deleteCard);

module.exports = userCards;
