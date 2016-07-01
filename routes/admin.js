'use strict';

var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user'),
    Post    = require('../models/post');

router.route('/', checkAdmin)
  // Display admin panel.
  .get((req, res) => {

    User.fetchAll()
      .then( users => {
        var allUsers = users.toJSON();

        Post.where({ approved: false })
          .fetchAll()
          .then( posts => {
            var allPosts = posts.toJSON();

            res.render('auth/admin', {
              title: 'goTravel -- Administrator Page',
              layout: 'adminPage',
              users: allUsers,
              posts: allPosts
            });
          })
      })
    // Display all posts, and related users.
    // Have the option to update/delete?
  })

  // Allow admin to make changes to a post/user.
  .put((req, res) => {
    var post = req.body;

    new Post({ id: post.approve_post })
      .save({ approved: true }, { patch: true })
      .then( results => {
        res.redirect('/admin');
      });
  })

  // Allow admin to delete post/user.
  .delete((req, res) => {
    new Post({id: req.body.delete_post})
      .destroy()
      .then( () => {
        res.redirect('/admin');
      })

  });

router.route('/user')
  .delete((req, res) => {
    new User({id: req.body.delete_user})
      .destroy()
      .then( () => {
        res.redirect('/admin');
      })
  });

module.exports = router;

function checkAdmin(req,res,next){
  User.where({ id: req.session.passport.user })
    .fetch()
    .then(results => {
      var user = results.toJSON().is_admin;
      if (user === true){
        next();
      } else {
        res.redirect('/auth/login');
      }
    })

    res.redirect('/auth/login');
}
