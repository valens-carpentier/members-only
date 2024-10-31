require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({ 
    secret: "vava", 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport config with custom options
require('./config/passport')(passport, { failureFlash: false });

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Use routes
app.use('/', authRoutes);  // Authentication routes (login, signup, logout)
app.use('/', userRoutes);  // User routes including home
app.use('/messages', messageRoutes);  // Message-related routes (create, view)

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;