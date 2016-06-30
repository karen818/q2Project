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

  })

  .post((req, res) => {

    var advice = req.body;

    City.where('city_name', advice.selectCity)
    .fetch()
    .then( city => {
      // Results checks to see if a city has been found
      if(city) {
        var city_id = city.toJSON().id;
        Post.where({
          city_id: city_id,
          month_id: advice.selectSeason,
          advice_type: advice.selectAdvice,
          approved: true
        })
        .fetchAll({withRelated:['user']})
        .then( results => {
          var posts = results.toJSON();
          if(posts.length > 0){
            // Make Bookshelf query to return a single random bit of advice.
            random = Math.floor(Math.random() * posts.length);
            // If the advice exists, then return a random index to display.
            eval(locus);
            res.render('getAdvice', {
              title: 'goTravel -- Get Advice',
              advice:posts[random],
              city:city.toJSON().city_name
            });
          } else {
            res.render('getAdvice', {
              title: 'goTravel -- Get Advice',
              advice: null
            });
          }
        });
      } else {
        res.render('getAdvice', {
          title: 'goTravel -- Get Advice',
          advice: null
        })
      }
    })
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

router.route('/signupSuccess')
  .get((req, res) => {
    res.render('signupSuccess')
  })

module.exports = router;
