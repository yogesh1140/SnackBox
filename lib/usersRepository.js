var mongoose = require('mongoose'),
    passport = require('passport'),
    cartModel = require('../models/cart.model'),
    userModel = require('../models/user.model'),
    tokens = {} 
    function saveRememberMeToken(token, uid, fn) {
      tokens[token] = uid;
      return fn();
    }
class UserRepository {
  consumeRememberMeToken(token, fn) {
    
   var uid = tokens[token];
   // invalidate the single-use token
   delete tokens[token];
   return fn(null, uid);
  }
    getCurrentIdentity(req, res, next) {
      res.status(200).send(req.user)
    res.end();
    }
    
    authenticate (req, res, next) {
      req.body.username = req.body.username.toLowerCase();
      var auth = passport.authenticate('local', function(err, user) {
        console.log('user: ',user, req.body)

        if(err) {return next(err);}
        if(!user) { res.sendStatus(403); }
        req.logIn(user, function(err) {
          if(err) {return next(err);}
          res.send({success:true, user: user});
        })
      })
      auth(req, res, next);
     
    }

    register(user, callback) {
      userModel.findOne({username: user.username},(err, foundUser) => {    
        // console.log('found user: ', foundUser) 
          if(!foundUser) {
            userModel.create(user, (err, data) => {
              if(err){
                  console.log(`*** UserRepository.register error: ${err}`)
                  return callback(err); 
              }
              cartModel.create({user: user.username, cartItems: []}, (err) => {
                if(err) {
                  console.log(`*** UserRepository.register error: ${err}`)
                  return callback(err);
                }
              })

              callback(null, null);
            })
          }
          else callback(null, 'already exists')
      })
  }  

  requiresRole(role) {
    return function(req, res, next) {
      if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
        res.status(403);
        res.end();
      } else {
        next();
      }
    }
  } 

  requiresApiLogin(req, res, next) {
    if(!req.isAuthenticated()) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  };
  
  issueToken(user, done) {
    // console.log('issue token: ',user)
    var token = utils.randomString(64);
    saveRememberMeToken(token, user.username, function(err) {
      if (err) { return done(err); }
      return done(null, token);
    });
  }

}



module.exports = new UserRepository()