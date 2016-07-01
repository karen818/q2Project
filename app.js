var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    index          = require('./routes/index'),
    users          = require('./routes/users'),
    auth           = require('./routes/auth'),
    admin          = require('./routes/admin'),
    posts          = require('./routes/posts'),
    passport       = require('passport'),
    LocalStrat     = require('passport-local').Strategy,
    TwitterStrat   = require('passport-twitter').Strategy,
    FacebookStrat  = require('passport-facebook').Strategy,
    cookieSession  = require('cookie-session'),
    hbs            = require('handlebars'),
    exphbs         = require('express-handlebars'),
    User           = require('./models/user'),
    path           = require('path'),
    bookshelf      = require('./db/bookshelf'),
    bcrypt         = require('bcrypt'),
    app            = express();

require('locus');
require('dotenv').config();


// === Use Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// === Views Engine ===//
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');

app.engine('.hbs', exphbs({defaultLayout: 'home', extname: '.hbs'}));


app.use(express.static(path.join(__dirname, 'public')));

// === Passport === //

passport.use(new TwitterStrat({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.where({username: profile.username})
      .fetchAll()
      .then( results => {
        var user = results.toJSON();
        if (user.length){
          console.log('User already exsists');
          cb(null, user.id);
        } else {
          new User({
            username: profile.username,
            full_name: profile.displayName,
            img_url:profile.photos[0].value,
            email: profile.provider
          }).save()
            .then( results => {
              var user = results.toJSON().id;
              cb(null, user);
            })
        }
      });
}));

passport.use(new FacebookStrat({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.where({ username: profile.id})
      .fetchAll()
      .then( results => {
        var user = results.toJSON();
        if (user.length > 0){
          console.log('User already exists');
          cb(null, profile);
        } else {
          new User({
            username:profile,
            full_name:profile.displayName,
            img_url:'',
            email:'facebook'
          }).save()
            .then( () => {
              cb(null, profile);
            })
        }
      })
  }
));

passport.use(new LocalStrat({
	usernameField: 'userName',
	passwordField: 'password'
}, (username, password, done) => {
	// Check id of user, retrieve row in users table.
  User.where({ username: username })
    .fetch()
    .then( results => {
      var user = results.toJSON();

      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user.id);
      } else {
        return done(null, false);
      }
    })
}));

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

app.use((req,res,next) => {

  if (!req.session.passport){
    res.locals.session = false;
  } else {
    res.locals.session = true;
  }
  next();
});


// === Routes ==== //
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/posts', posts);


app.listen((process.env.PORT || 3000), error => {
  console.log('Server is listening.');
});
