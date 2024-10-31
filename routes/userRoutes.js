const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

// Home page route (protected)
router.get('/home', isAuthenticated, userController.getHome);

// Join club routes (protected)
router.get('/join-club', isAuthenticated, userController.getJoinClub);
router.post('/join-club', isAuthenticated, userController.postJoinClub);

module.exports = router;
