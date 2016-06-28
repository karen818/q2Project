var express = require('express'),
    router  = express.Router();

// router.route('/')
//   // Display main page.
//   .get((req, res) => {
//     res.send('Connection established.');
//   });

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/layout', function (req, res, next) {
    res.render('index', {
        title: 'goTravel -- Travel Advice App',
        layout: 'home'
    });
});

router.get('/getAdvice', function (req, res, next) {
    res.render('getAdvice', {
        title: 'goTravel -- Get Advice'
    });
});

router.get('/giveAdvice', function (req, res, next) {
    res.render('giveAdvice', {
        title: 'goTravel -- Give Advice'
    });
});



module.exports = router;
