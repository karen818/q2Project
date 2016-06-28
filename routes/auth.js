var express = require('express'),
    router  = express.Router(),
    passport = require('passport');

router.route('/signup')
  // Show sign up page.
  .get((req, res) => {
    res.send('Placeholder.');
  })

  // Register a new user.
  .post((req, res) => {

  });

router.route('/login')
  // Show login page.
  .get((req, res) => {
      res.render('login', {
          title: 'goTravel -- Login',
          layout: 'home'
      });
  });

 

router.route('/twitter')
  // Direct to twitter auth.
  .get(passport.authenticate('twitter'));

router.route('/twitter/callback')
  // Route for twitter auth callback.
  .get(passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
  });

router.route('/facebook')
  // Direct to facebook auth.
  .get(passport.authenticate('facebook'));

router.route('/facebook/callback')
  // Route for facebook auth callback.
  .get(passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
  });

router.route('/logout')
  // Logout.
  .get((req, res) => {
    req.session = null;
    res.redirect('/');
  });

module.exports = router;
