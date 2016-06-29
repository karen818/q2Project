var express = require('express'),
    router  = express.Router();

router.route('/')
  // Display main page.
  .get((req, res) => {
    res.render('index', {
        title: 'goTravel -- Travel Advice App'
    });
  });
  // .post((req, res)=> {
  //
  // });



router.get('/layout', function (req, res, next) {
    res.render('index', {
        title: 'goTravel -- Travel Advice App',
        layout: 'home'
    });
});

router.get('/getAdvice', function (req, res, next) {
    eval(locus);
    res.render('getAdvice', {
        title: 'goTravel -- Get Advice',
        city: req.params.selectCity

    });
});

router.get('/giveAdvice', function (req, res, next) {
    res.render('giveAdvice', {
        title: 'goTravel -- Give Advice'
    });
});

router.get('/adviceSuccess', function (req, res, next) {
    res.render('adviceSuccess', {
        title: 'goTravel -- Give Advice Success'
    });
});


module.exports = router;
