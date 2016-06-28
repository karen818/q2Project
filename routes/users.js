var express = require('express'),
    router  = express.Router(),
    bcrypt  = require('bcrypt')
    User    = require('../models/user');

router.route('/')
  .get((req, res) => {
    res.send('Default users route.');
  })
  .post((req, res) => {
    // Get req.body, use session to add users currently in session?
    var newUser = req.body,
        hash    = bcrypt.hashSync(newUser.password, 8);

    new User({
      username: newUser.username,
      email: newUser.email,
      img_url: newUser.img_url,
      password: hash
    }, 'id')
      .save()
      .then( results => {
        // Should post a new user, then redirect to index page.
        
        res.redirect('/');
      });
  });

router.route('/:id/edit')
  // Display edit page.
  .get((req, res) => {

  })

  // Allow user to update profile information if not using Twitter/Facebook
  .put((req, res) => {

  });

module.exports = router;
