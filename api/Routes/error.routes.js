const express = require('express');
const router = express.Router();

const ErrorController = require('../Controllers/error.controller');

router.post('/', ErrorController.createErrorLog)

module.exports = router;