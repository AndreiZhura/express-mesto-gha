const mongoose = require('mongoose');

// напишите код здесь
const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    default: 'Test User',
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String, // имя — это строка
    default: 'Test information',
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: {
    type: String,
    default: 'https://yandex.ru/images/search?pos=0&from=tabbar&img_url=http%3A%2F%2Fs1.1zoom.ru%2Fbig3%2F984%2FCanada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400.jpg&text=картинки&rpt=simage&lr=10740',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});
module.exports = mongoose.model('users', userSchema);
