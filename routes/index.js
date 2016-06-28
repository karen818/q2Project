var express = require('express'),
    router  = express.Router();

// router.route('/')
//   // Display main page.
//   .get((req, res) => {
//     res.send('Connection established.');
//   });

router.get('/', function(req, res) {
  res.render('index', { title: 'Test' });
});

module.exports = router;
