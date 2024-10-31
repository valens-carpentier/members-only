const db = require('../db/queries');
const messageController = require('./messageController');

// Get home page data
const getHome = async (req, res) => {
    try {
        const messages = await messageController.getMessages();
        res.render('home', { 
            user: req.user,
            messages: messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Get join club page
const getJoinClub = (req, res) => {
    res.render('join-club');
};

// Handle join club submission
const postJoinClub = async (req, res) => {
    try {
        const clubCode = req.body['club-code'];
        if (clubCode === process.env.SECRET_CODE) {
            await db.updateMembershipStatus(req.user.user_id, 'member');
            res.redirect('/home');
        } else {
            res.render('join-club', { error: 'Invalid club code' });
        }
    } catch (error) {
        console.error('Error updating membership:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getHome,
    getJoinClub,
    postJoinClub
};
