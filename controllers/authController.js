const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../db/queries');

// Display login form
const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.render('index', { error: req.query.error });
    }
};

// Handle login form submission
const postLogin = passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/?error=Invalid credentials'
});

// Display signup form
const getSignup = (req, res) => {
    res.render('sign-up-form');
};

// Handle signup form submission
const postSignup = async (req, res, next) => {
    try {
        const { username, password, full_name } = req.body;
        
        // Check if username already exists using the existing query function
        const existingUser = await db.findUserByUsername(username);
        
        if (existingUser) {
            return res.redirect('/signup');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user using the new query function
        const newUser = await db.createUser({
            username,
            password: hashedPassword,
            full_name,
            membership_status: 'non-member'
        });

        // Log in the user automatically after signup
        req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/home');
        });

    } catch (err) {
        console.error(err);
        res.redirect('/signup');
    }
};

// Handle logout
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

// Export all functions at the end
module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    logout
};

