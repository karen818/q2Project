var express = require('express'),
    router  = express.Router(),
    bcrypt  = require('bcrypt')
    User    = require('../models/user'),
    hbs     = require('handlebars');

function authenticateUser(req, res, next){
  if (req.session.passport){
    User.where({username: req.session.passport.user.id})
    .fetch()
    .then( results => {
      user = results.toJSON();
      eval(locus);
      if (user.is_admin) {
        return next();
      } else if (user.id === req.params.id) {
        return next();
      } else {
        res.redirect('/'); // Unauthorized.
      }
    })
  } else {
    res.redirect('/'); // Unauthorized.
  }
}

router.route('/')
  .get((req, res) => {
    res.send('Default users route.');
  });

router.route('/:id')
    .get(authenticateUser, (req, res) => {
        var user_id = req.params.id;

       User.where({ id: user_id })
         .fetch()
         .then( results => {
           var user = results.toJSON();

           res.render('users/viewProfile', {user: user});
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

        res.render('users/editProfile', { user: user });
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
        res.redirect('/viewProfile');
      })
  });

module.exports = router;
