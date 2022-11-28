// middlewares/auth.js

const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация1' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  console.log(token);

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    console.log(payload);
    return res
      .status(401)
      .send({ message: 'Необходима авторизация2' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
