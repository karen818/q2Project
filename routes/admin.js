var express = require('express'),
    router  = express.Router();

router.route('/')
  // Display admin panel.
  .get((req, res) {
    // Display all posts, and related users.

    // Have the option to update/delete?
  })

  // Allow admin to make changes to a post/user.
  .put((req, res) {

  })

  // Allow admin to delete post/user.
  .delete((req, res) => {

  });

module.exports = router;
