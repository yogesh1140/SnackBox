const usersRepo = require('../../../lib/usersRepository'),
    passport = require('passport'),
    crypto = require('crypto')
// statesRepo = require('../../../lib/statesRepository'),
util = require('util');

class UserController {

constructor(router) {
  
    // router.post('/login', usersRepo.authenticate
    // , function(req, res, next) {
    //     // Issue a remember me cookie if the option was checked
    //      console.log('rm:', req.body.remember_me)
    //     if (!req.body.remember_me) { return next(); }
        
    //     usersRepo.issueToken(req.user, function(err, token) {
    //       if (err) { return next(err); }
    //       res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
    //       return next();
    //     });
    //   }
    // );
    router.post('/login', passport.authenticate('local'),
    function(req, res, next) {
      // Issue a remember me cookie if the option was checked
      // console.log('rm checkde>:', req.body.remember_me)
      if (!req.body.remember_me) {  res.send({success:true, user: req.user}); }
      
      usersRepo.issueToken(req.user, function(err, token) {
        // console.log('token: ', req.user)
        if (err) { return next(err); }
        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
        res.send({success:true, user: req.user});
      },
      function(req, res) {
        console.log('no rms')
        res.send({success:true, user: user});
      });
     
    });
    router.post('/register', this.register.bind(this));
    router.get('/currentIdentity', usersRepo.getCurrentIdentity);


    router.get('/login', function(req, res){
        res.json({ user: req.user, message: req.flash('error') });
      });
    // router.get('/requiresApiLogin', usersRepo.requiresApiLogin);
    // router.get('/requiresRole', usersRepo.requiresRole);
    
    // router.get('/:snacksType', this.getSnacks.bind(this));
    router.post('/logout', function(req, res) {
        res.clearCookie('remember_me');
        req.logout();
        res.end();
      });
    }
    register(req, res){
        console.log('*** register');
        const user = req.body.user;
        user.password = crypto.createHash('SHA256').update(user.password).digest("hex")
        usersRepo.register(user, (err, data) => {
            if (err) {
                console.log('*** register error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** register ok');
                if(data !=null)
                    res.json({msg: "Already exist"});
                else
                    res.json(null)
            }
           
        });
      }
}

module.exports = UserController;