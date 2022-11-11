const router = require('express').Router();
const { getUser, createUser } = require('../controllers/user');

router.get('/users', getUser);
router.get('/users/:userId', getUser);
router.post('/users', createUser);

module.exports = router;

module.exports = router;
