var express = require('express'),
    router  = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('This is the post route.')
  });


module.exports = router;
