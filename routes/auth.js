var express  = require('express'),
    router   = express.Router(),
    bcrypt   = require('bcrypt')
    passport = require('passport');

router.route('/signup')
  // Show sign up page.
  .get((req, res) => {
    res.render('signup', {
      title: 'goTravel -- Sign Up',
      layout: 'home'
    });
  })

  // Register a new user.
  .post((req, res) => {
    var newUser = req.body,
        hash    = bcrypt.hashSync(newUser.signupPW, 8);


    User.where({ username: newUser.signupUsername })
      .fetchAll()
      .then( results => {
        var user = results.toJSON();

        if (user.length) {
          console.log('User already exists.');
          res.redirect('/');
        } else {
          new User({
            full_name:newUser.signupName,
            username: newUser.signupUsername,
            email: newUser.signupEmail,
            img_url: newUser.profilePic,
            password: hash
          }, 'id')
          .save()
          .then( results => {
            // Should post a new user, then redirect to index page.

            res.redirect('/');
          });
        }
      })
});

router.route('/login')
  // Show login page.
  .get((req, res) => {
      res.render('login', {
          title: 'goTravel -- Login',
          layout: 'home'
      });
  })

  // Login and authenticate.
  .post((req, res) => {
    // CompareSync password field.
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
