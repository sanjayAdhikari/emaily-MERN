const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById(id).then( user => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refershToken, profile, done) => {
        User.findOne({googleId: profile.id}).then( (user) => {
            if(user){
                //user already exists
                console.log('welcome member');
                done(null, user);
            }else{
                //seems a new user
                new User({ googleId: profile.id})
                    .save()
                    .then((user) => done(null, user));
            }
        })        
    })
);