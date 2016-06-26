var express = require('express'),
    router  = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Default users route.');
  });

module.exports = router;
