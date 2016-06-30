var express = require('express'),
    router  = express.Router(),
    bcrypt  = require('bcrypt')
    User    = require('../models/user'),
    hbs     = require('handlebars');

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

           res.render('viewProfile', {user: user});
         })
    })

    // helpers: {
    //     checkOAuth: function (object){
    //         if(this.user.email === 'twitter' || this.user.email === 'facebook'){
    //             console.log('twitbook');
    //             return new hbs.SafeString("<p>Thanks for using goTravel!</p>");
    //         } else{
    //             console.log('bcrypt');
    //
    //         }
    //     }
    // }

    // Handlebars.registerHelper('link', function(object) {
    //    return new Handlebars.SafeString("<a href='" + object.url + "'>" + object.text + "</a>"

    // hbs.registerHelper('checkOAuth', function(email){
    //     // return console.log('test');
    //     if(email === 'twitter' || email === 'facebook'){
    //         return true;
    //     }
    // });
    // router.get('/helper', function (req, res, next) {
    //     res.render('helper', {
    //         title: 'Using Helpers',
    //         helpers: {
    //             canDisplayDeal: function (options) {
    //                 if (this.is_publish == 1 || this.is_publish == '1') {
    //                     return options.fn(this);
    //                 } else {
    //                     return options.inverse(this);
    //                 }
    //             }
            // },

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
        res.redirect('/viewProfile');
      })
  });

module.exports = router;
