const   LocalStrategy = require('passport-local').Strategy,
        RememberMeStrategy = require('./strategy'),
        User = require('../models/user.model'),
        userRepo = require('./usersRepository')
        utils = require('./utils'),
        crypto = require('crypto');

 module.exports = function(passport) {
    passport.use('local', new LocalStrategy(
        {
        // usernameField : 'username',
        // passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
        },
    function(req, username, password, done) { 
        // console.log('hash', crypto.createHash('SHA256').update(password).digest("hex"))
        User.findOne({ 'username' :  username , 'password': crypto.createHash('SHA256').update(password).digest("hex")},'username', function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, 'loginMessage', 'No user found.'); 
            return done(null, user);
        });
    }));


    // Remember Me cookie strategy
    //   This strategy consumes a remember me token, supplying the user the
    //   token was originally issued to.  The token is single-use, so a new
    //   token is then issued to replace it.

    passport.use(new RememberMeStrategy(
        // {
        //     passReqToCallback : true // allows us to pass back the entire request to the callback
        // },
        function(token, done) {
            // console.log('token', token)
            userRepo.consumeRememberMeToken(token, function(err, uid) {
            if (err) { return done(err); }
            if (!uid) { return done(null, false); }

            User.findOne({ 'username' :  uid  },'username', function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, 'loginMessage', 'No user found.'); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
        

                // all is well, return successful user
                return done(null, user);
            });
          });
        },
        userRepo.issueToken
      ));

    passport.serializeUser(function(user, done) {
        console.log("id: ",user.id)
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}



