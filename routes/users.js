var express = require('express'),
    router  = express.Router(),
    bcrypt  = require('bcrypt')
    User    = require('../models/user');

router.route('/')
  .get((req, res) => {
    res.send('Default users route.');
  });

router.route('/:id')
    .get((req, res) => {
        var user_id = req.params.id;

       User.where({ id: user_id })
         .fetch()
         .then( results => {
           var user = results.toJSON();

           res.render('viewProfile', { user: user });
         })
    })

router.route('/:id/editProfile')
  // Display edit page.
  .get((req, res) => {
    var user_id = req.params.id;

    User.where({ id: user_id })
      .fetch()
      .then( results => {
        var user = results.toJSON();

        res.render('editProfile', { user: user });
      })
  })

  // Allow user to update profile information if not using Twitter/Facebook
  .put((req, res) => {
    var updateUser = req.body,
        user_id    = req.params.id;

    new User({ id: user_id })
      .save({
        full_name: updateUser.full_name,
        email: updateUser.email,
        img_url: updateUser.img_url
      }, { patch: true })
      .then(() => {
        res.redirect('/');
      })
  });

module.exports = router;
