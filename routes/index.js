var express = require('express'),
    router  = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Connection established.');
  });

module.exports = router;
