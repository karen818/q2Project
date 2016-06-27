var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    index          = require('./routes/index'),
    users          = require('./routes/users'),
    auth           = require('./routes/auth'),
    admin          = require('./routes/admin'),
    passport       = require('passport'),
    TwitterStrat   = require('passport-twitter').Strategy,
    FacebookStrat  = require('passport-facebook').Strategy,
    cookieSession  = require('cookie-session'),
    app            = express();

require('locus');
require('dotenv').config();


// === Use Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// === Passport === //

passport.use(new TwitterStrat({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrat({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// === Routes ==== //
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);

app.listen((process.env.PORT || 3000), error => {
  console.log('Server is listening.');
});
