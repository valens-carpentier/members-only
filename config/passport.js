const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db/queries');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            failureFlash: false
        },
        async (username, password, done) => {
            try {
                const user = await db.findUserByUsername(username);
                
                if (!user) {
                    return done(null, false);
                }
                
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (!isMatch) {
                    return done(null, false);
                }
                
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.findUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}; 