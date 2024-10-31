const db = require('../db/queries');
const { isAuthenticated } = require('../middleware/auth');

const getMessages = async () => {
    try {
        const messages = await db.getMessages();
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

const createMessage = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).redirect('/login');
        }

        const messageData = {
            title: req.body.title,
            content: req.body.content,
            user_creator: req.user.user_id
        };
        
        const message = await db.createMessage(messageData);
        res.redirect('/home');
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).redirect('/home');
    }
};

module.exports = { getMessages, createMessage };