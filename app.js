var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    index          = require('./routes/index'),
    users          = require('./routes/users'),
    auth           = require('./routes/auth'),
    admin          = require('./routes/admin'),
    posts          = require('./routes/posts'),
    passport       = require('passport'),
    TwitterStrat   = require('passport-twitter').Strategy,
    FacebookStrat  = require('passport-facebook').Strategy,
    LocalStrat     = require('passport-local').Strategy,
    cookieSession  = require('cookie-session'),
    exphbs         = require('express-handlebars'),
    User           = require('./models/user'),
    path           = require('path'),
    bookshelf      = require('./db/bookshelf'),
    app            = express();

require('locus');
require('dotenv').config();


// === Use Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.engine('.hbs', exphbs({defaultLayout: 'home', extname: '.hbs'}));
app.set('view engine', '.hbs');


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
          cb(null, profile)
        } else {
          new User({
            username: profile.username,
            full_name: profile.displayName,
            img_url:profile.photos[0].value,
            email: profile.provider
          }).save()
            .then( () => {
              cb(null, profile)
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
    console.log(profile);
    cb(null, profile);
  }
));

passport.use(new LocalStrat({
	usernameField: 'username',
	passwordField: 'password',
	session: false
}, (username, password, done) => {
	// Check id of user, retrieve row in users table.
	Users().where('username', username)
		.first()
		.then( user => {
			// compareSync the user's hashed password.
			if (user && bcrypt.compareSync(password, user.password)){
				// On match, return confirmation of session.
				return done(null, user);
			}
			// Otherwise, return no session, redirect.
			return done(null, false);
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


// === Routes ==== //
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/posts', posts);


app.listen((process.env.PORT || 3000), error => {
  console.log('Server is listening.');
});
