const passport = require('passport');

// routes handler
module.exports = app => {

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout' , (req, res) => {
        req.logout();
        res.send('<p>You are  log out</p>')
    })

    app.get('/api/user', (req, res) => {
        res.send(req.user);
    })

    
};