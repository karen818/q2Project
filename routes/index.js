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
        title: 'goTravel -- Travel Advice App',
        session: req.session.passport
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
        // If the advice exists, then return a random index to display.
        res.render('getAdvice', {
            title: 'goTravel -- Get Advice'
        });

      });


  })
  .post((req, res) => {
      
  });


router.route('/giveAdvice')
  // Run authenticate middleware.

  // Show form for new advice.
  .get((req, res) => {

    res.render('giveAdvice', {
      title: 'goTravel -- Give Advice',
      postInfo : req.body
    });
  })

  // User adds new advice to to advice_posts
  .post((req, res) => {
    var newPost = req.body

    City.where( {city_name: selectCity} )
      .fetch()
      .then( results => {
        var city = results.toJSON();

        if (city){
          console.log('City name already exists, next.');
          // If the city exists, grab the id and pass it in.
        } else {
          // Otherwise, make a new city

            // Return the new city's id.

            // Create a new post.

              // Username = req.session username where username = whatever.
              // advice text
              // advice_type : newPost.selectAdvice
              // month : newPost.selectSeason
              // city name

              // Render successful post page
        }
      })
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
