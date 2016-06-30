var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user'),
    Post    = require('../models/post');

router.route('/')
  // Display admin panel.
  .get((req, res) => {
    User.fetchAll()
      .then( users => {
        var allUsers = users.toJSON();

        Post.where({ approved: false })
          .fetchAll()
          .then( posts => {
            allPosts = posts.toJSON();
            eval(locus)
            res.render('admin', {
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

  })

  // Allow admin to delete post/user.
  .delete((req, res) => {

  });

module.exports = router;
