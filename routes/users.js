var express = require('express'),
    router  = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Default users route.');
  });

router.route('/:id/edit')
  // Display edit page.
  .get((req, res) => {

  })

  // Allow user to update profile information if not using Twitter/Facebook
  .put((req, res) => {

  });

module.exports = router;
