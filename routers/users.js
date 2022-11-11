const router = require('express').Router();
const { getUser, createUser } = require('../controllers/user');

router.get('/users', getUser);
router.post('/users', createUser);

module.exports = router;
