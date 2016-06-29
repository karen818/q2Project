var express = require('express'),
    router  = express.Router(),
    bookshelf = require('../db/bookshelf'),
    User      = require('../models/user'),
    Post      = require('../models/post'),
    Advice    = require('../models/advice'),
    City      = require('../models/city'),
    Month     = require('../models/month');

router.route('/')
  // Display main page.
  .get((req, res) => {
    res.render('index', {
        title: 'goTravel -- Travel Advice App'
    });
  });

router.get('/layout', function (req, res, next) {
    res.render('index', {
        title: 'goTravel -- Travel Advice App',
        layout: 'home'
    });
});


router.route('/getAdvice')
  .get((req, res) => {
    var advice = req.body;

    // Make Bookshelf query to return a single random bit of advice.
    Post
      .fetchAll({withRelated: ['user','city','month','advice']})
      .then( results => {
        var posts = results.toJSON(),
            random = Math.floor(Math.random() * posts.length);

        // eval(locus);
        // If the advice exists, then return a random index to display.
        res.render('getAdvice', {
            title: 'goTravel -- Get Advice'

        });

      });


  })
  .post((req, res) => {
    // eval(locus);

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

router.get('/:id', function (req, res, next) {
    res.render('viewProfile', {
        title: 'goTravel -- View Profile',
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        img_url: req.body.img_url
    });
});

router.get('/:id', function (req, res, next) {
    res.render('editProfile', {
        title: 'goTravel -- Edit Profile'
    });
});

module.exports = router;
