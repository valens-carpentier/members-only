const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, messageController.getMessages);
router.post('/', isAuthenticated, messageController.createMessage);

module.exports = router;