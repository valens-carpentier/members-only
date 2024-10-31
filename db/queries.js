const pool = require('./pool');

// Message queries
async function getMessages() {
    try {
        const result = await pool.query(`
            SELECT m.*, u.username, u.full_name 
            FROM messages m 
            JOIN users u ON m.user_creator = u.user_id 
            ORDER BY m.timestamp DESC
        `);
        return result.rows;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function createMessage(messageData) {
    const result = await pool.query(
        'INSERT INTO messages (title, content, user_creator) VALUES ($1, $2, $3) RETURNING *',
        [messageData.title, messageData.content, messageData.user_creator]
    );
    return result.rows[0];
}

async function updateMembershipStatus(userId, status) {
    const result = await pool.query('UPDATE users SET membership_status = $1 WHERE user_id = $2', [status, userId]);
    return result.rows[0];
}

async function findUserByUsername(username) {
    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );
    return result.rows[0];
}

async function findUserById(id) {
    const result = await pool.query(
        'SELECT * FROM users WHERE user_id = $1',
        [id]
    );
    return result.rows[0];
}

async function createUser(userData) {
    const result = await pool.query(
        'INSERT INTO users (username, password, full_name, membership_status) VALUES ($1, $2, $3, $4) RETURNING *',
        [userData.username, userData.password, userData.full_name, userData.membership_status]
    );
    return result.rows[0];
}

module.exports = {
    getMessages,
    createMessage,
    updateMembershipStatus,
    findUserByUsername,
    findUserById,
    createUser
};