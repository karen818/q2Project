var express = require('express'),
    router  = express.Router();

router.route('/signup')
  // Show sign up page.
  .get((req, res) => {
    res.send('Placeholder.');
  })

  // Register a new user.
  .post((req, res) => {

  });

router.route('/twitter')
  // Direct to twitter auth.
  .get((req, res) => {

  });

router.route('/twitter/callback')
  // Route for twitter auth callback.
  .get((req, res) => {

  });

router.route('/facebook')
  // Direct to facebook auth.
  .get((req, res) => {

  });

router.route('/facebook/callback')
  // Route for facebook auth callback.
  .get((req, res) => {

  });

module.exports = router;
