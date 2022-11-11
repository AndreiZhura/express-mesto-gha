const router = require('express').Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', doesUserExist);
router.patch('/:id', updateUser);