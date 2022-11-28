const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const userRouters = require('./routers/users');
const userCardsRouters = require('./routers/card');
const { FILE_NOT_FOUND } = require('./constants/constants');

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signup', createUser);
app.post('/signin', login);

// авторизация

// роуты, которым авторизация нужна
app.use('/', auth, userRouters);
// card
app.use('/', auth, userCardsRouters);

app.use('*', (req, res) => { res.status(FILE_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' }); });

app.listen(PORT);
