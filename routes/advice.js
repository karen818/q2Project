var express   = require('express'),
    router    = express.Router(),
    bookshelf = require('../db/bookshelf'),
    User      = require('../models/user'),
    Post      = require('../models/post'),
    Advice    = require('../models/advice'),
    City      = require('../models/city'),
    Month     = require('../models/month');

router.route('/get')
  .post((req, res) => {

    var advice      = req.body,
        advice_type = advice.selectAdvice,
        weather     = weatherAPIVariables(req);

    Promise.all([
      Month.where({id: advice.selectSeason}).fetch(),
      City.where({city_name: advice.selectCity}).fetch()
    ]).then( results => {
      console.log('Promise done!');
      var city  = results[1].toJSON(),
          month = results[0].toJSON();

      res.send('Made it!');
    })
  });

    // Month.where({ id: advice.selectSeason })
    // .fetch()
    // .then( month => {
    //   var month_name = month.toJSON().month;
    //
    //   console.log(month_name);
    //
    //   City.where('city_name', advice.selectCity)
    //   .fetch()
    //   .then( city => {
    //     // Results checks to see if a city has been found
    //     if(city) {
    //       var city_id = city.toJSON().id;
    //       Post.where({
    //         city_id: city_id,
    //         month_id: advice.selectSeason,
    //         advice_type: advice.selectAdvice,
    //         approved: true
    //       })
    //       .fetchAll({withRelated:['user']})
    //       .then( results => {
    //         var posts = results.toJSON();
    //         if(posts.length > 0){
    //           // Make Bookshelf query to return a single random bit of advice.
    //           var random = Math.floor(Math.random() * posts.length);
    //           // If the advice exists, then return a random index to display.
    //           res.render('advice/getAdvice', {
    //             title: 'goTravel -- Get Advice',
    //             advice:posts[random],
    //             city:city.toJSON().city_name,
    //             month: month_name,
    //             cityWeather: cityWeather,
    //             stateCountry: stateCountry
    //           });
    //         } else {
    //           res.render('advice/getAdvice', {
    //             title: 'goTravel -- Get Advice',
    //             advice: null,
    //             city:null,
    //             month: month_name,
    //             cityWeather: cityWeather,
    //             stateCountry: stateCountry
    //           });
    //         }
    //       });
    //     } else {
    //       res.render('advice/getAdvice', {
    //         title: 'goTravel -- Get Advice',
    //         advice: null,
    //         city:null,
    //         month: month_name,
    //         cityWeather: cityWeather,
    //         stateCountry: stateCountry
    //       })
    //     }
    //   })
    // })



router.route('/give')
  // User is directed to the give advice page with information passed through.
  .post((req, res) => {
    var advice = req.body;
    var cityWeather = advice.selectCity.split(', ')[0];
    var stateCountry= advice.selectCity.split(', ');


    if (stateCountry[2] === 'United States') {
        stateCountry = advice.selectCity.split(', ')[1];
    } else {
        stateCountry = advice.selectCity.split(', ')[2];
    }

    City.where({ 'city_name': advice.selectCity })
      .fetchAll()
      .then( results => {
        var city = results.toJSON();
        if (city.length > 0) {
          res.render('auth/giveAdvice', {
            post: advice,
            city: city[0],
            cityWeather: cityWeather,
            stateCountry: stateCountry});
          res.end;
        } else {
          new City({
            city_name: advice.selectCity
          }).save()
            .then( results => {
              var newCity = results.toJSON();


              res.render('auth/giveAdvice', {
                post: advice,
                city: newCity,
                cityWeather: cityWeather,
                stateCountry: stateCountry
              });
              res.end;
            })
        }
      });
  });


router.route('/new')
  .post((req, res) => {
    var newAdvice = req.body;
    if (req.session.passport.user && typeof req.session.passport.user === 'number') {
      new Post({
        user_id: req.session.passport.user,
        advice_text: newAdvice.giveAdviceTxt,
        advice_type: newAdvice.advice_type,
        month_id: newAdvice.month,
        city_id: newAdvice.city
      }).save()
      .then( results => {
        res.render('adviceSuccess');
      });
    } else if (req.session.passport.user.id) {
      User.where({ username: req.session.passport.user.id })
        .fetch()
        .then( results => {
          var user_id = results.toJSON().id;

          new Post({
            user_id: user_id,
            advice_text: newAdvice.giveAdviceTxt,
            advice_type: newAdvice.advice_type,
            month_id: newAdvice.month,
            city_id: newAdvice.city
          }).save()
          .then( results => {
            res.render('adviceSuccess');
          });
        });
    } else if (req.session.user.username) {
      User.where({ username: req.session.passport.user.username})
        .fetch()
        .then( results => {
          var user_id = results.toJSON().id;
          new Post({
            user_id: user_id,
            advice_text: newAdvice.giveAdviceTxt,
            advice_type: newAdvice.advice_type,
            month_id: newAdvice.month,
            city_id: newAdvice.city
          }).save()
          .then( results => {
            res.render('adviceSuccess');
          });
        });
    }
  });




router.get('/adviceSuccess', function (req, res, next) {
    res.render('auth/adviceSuccess', {
        title: 'goTravel -- Give Advice Success'
    });
});

module.exports = router;

function weatherAPIVariables(req){
  var  cityWeather  = req.body.selectCity.split(', ')[0],
       stateCountry = req.body.selectCity.split(', ');

  if (stateCountry[2] === 'United States') {
      stateCountry = req.body.selectCity.split(', ')[1];
  } else {
      stateCountry = req.body.selectCity.split(', ')[2];
  }

  return {city: cityWeather, state: stateCountry}
}
