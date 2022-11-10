const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send('<h1>Страница не найдена</h1>');
});

// подключаемся к серверу mongo
// подключаем мидлвары, роуты и всё остальное...

app.listen(3010);
