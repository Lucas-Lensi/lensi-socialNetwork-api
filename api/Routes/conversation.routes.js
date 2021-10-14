const express = require('express');
const router = express.Router();

const ConversationController = require('../Controllers/conversation.controller');

router.post('/create', ConversationController.createConversation);
router.get('/user', ConversationController.getConversationsByUser)

module.exports = router;