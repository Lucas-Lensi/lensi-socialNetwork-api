const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/user.controller');

router.post('/create', UserController.createUser)
router.post('/login', UserController.login)

router.get('/post/:id', UserController.getUserForPost)
router.get('/:id', UserController.getUser)

module.exports = router;