var express = require('express'),
    router  = express.Router()
    bookshelf = require('../db/bookshelf'),
    User      = require('../models/user'),
    Post      = require('../models/post'),
    Advice    = require('../models/advice'),
    City      = require('../models/city'),
    Month     = require('../models/month');

router.get('/', function (req, res, next) {

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


router.route('/getAdvice')
  .get((req, res) => {
    var advice = req.body;

    // Make Bookshelf query to return a single random bit of advice.
    Post
      .fetchAll({withRelated: ['user','city','month']})
      .then( results => {
        var posts = results.toJSON(),
            random = Math.floor(Math.random() * posts.length);

        console.log(posts[random]);
        // If the advice exists, then return a random index to display.
        res.render('getAdvice', {
            title: 'goTravel -- Get Advice'

        });

      });


  })
  .post((req, res) => {
    eval(locus);

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
