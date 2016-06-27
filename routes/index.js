var express = require('express'),
    router  = express.Router();

router.route('/')
  // Display main page.
  .get((req, res) => {
    res.send('Connection established.');
  });

module.exports = router;
