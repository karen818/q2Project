var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user'),
    Post    = require('../models/post');

router.route('/')
  // Display admin panel.
  .get(checkAdmin, (req, res) => {
    User.fetchAll()
      .then( users => {
        var allUsers = users.toJSON();

        Post.where({ approved: false })
          .fetchAll()
          .then( posts => {
            allPosts = posts.toJSON();

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

function checkAdmin(req, res, next){
  if (req.session.passport.user.id){
    User.where({ username: req.session.passport.user.id })
      .fetch()
      .then(results => {
        var user = results.toJSON().is_admin;
        if (user){
          console.log(user);
          next();
        }

        res.redirect('/auth/login');
      })
  }

  res.redirect('/auth/login');
}
