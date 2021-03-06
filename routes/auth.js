'use strict';

var express  = require('express'),
    router   = express.Router(),
    bcrypt   = require('bcrypt'),
    passport = require('passport');

router.route('/signup')
  // Show sign up page.
  .get((req, res) => {
    res.render('auth/signup', {
      title: 'goTravel -- Sign Up',
      layout: 'home'
    });
  })

  // Register a new user.
  .post((req, res) => {

    var newUser = req.body,
        hash    = bcrypt.hashSync(newUser.signupPW, 8);

    User.where({ username: newUser.signUpusername })
      .fetchAll()
      .then( results => {
        var user = results.toJSON();

        if (user.length) {
          console.log('User already exists.');
          res.redirect('/');
        } else {
          new User({
            full_name:newUser.signupName,
            username: newUser.signUpusername,
            email: newUser.signupEmail,
            img_url: newUser.profilePic,
            password: hash
          }, 'id')
          .save()
          .then( results => {
            // Should post a new user, then redirect to signupSuccess page.
            res.render('auth/signupSuccess');
          });
        }
      })
});

router.route('/login')
  // Show login page.
  .get((req, res) => {
      res.render('auth/login', {
          title: 'goTravel -- Login',
          layout: 'home'
      });
  })

  // Login and authenticate.
  .post(passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) => {

    res.render('auth/loginSuccess');
  });



router.route('/twitter')
  // Direct to twitter auth.
  .get(passport.authenticate('twitter'));

router.route('/twitter/callback')
  // Route for twitter auth callback.
  .get(passport.authenticate('twitter', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect signupSuccess.
    res.locals.session = true;
    res.render('auth/signupSuccess')
  });

router.route('/facebook')
  // Direct to facebook auth.
  .get(passport.authenticate('facebook'));

router.route('/facebook/callback')
  // Route for facebook auth callback.
  .get(passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect signupSuccess.
    res.render('auth/signupSuccess')
  });

router.route('/logout')
  // Logout.
  .get((req, res) => {
    req.session = null;
    res.redirect('/');
  });

module.exports = router;
