const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = require('../constants/constants');
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

  try {
    payload = jwt.verify(token, SECRET_KEY_JWT);
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;

    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
