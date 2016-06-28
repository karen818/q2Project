var express   = require('express'),
    router    = express.Router(),
    bookshelf = require('../db/bookshelf'),
    User      = require('../models/user'),
    Post      = require('../models/post'),
    Advice    = require('../models/advice'),
    City      = require('../models/city'),
    Month     = require('../models/month');

router.route('/')
  // Are we going to list all of the posts on a single page?
  .get((req, res) => {
    User.fetchAll()
      .then( results => {
        res.send(results.toJSON());
      })

  })
  // User adds new post.
  .post((req, res) => {
    var newPost = req.body;

    new Post({

      user_id: '',//Logged in user.
      advice_text: newPost.advice_text,
      advice_type: newPost.advice_type,
      month_id: newPost.month_id,
      city_id: newPost.city_id
    })
      .save()
      .then( results => {
        // Display a message informing the user than the post has been submitted for approval.
        res.redirect('/adviceSuccess');
      });
  })

router.route('/giveAdvice')
  // Render new post form.
  .get((req, res) => {
    // Get the ID from the user currently logged in.

    //If not logged in, then redirect to login page.
  });




module.exports = router;
