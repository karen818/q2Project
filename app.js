var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    index          = require('./routes/index'),
    users          = require('./routes/users'),
    auth           = require('./routes/auth'),
    admin          = require('./routes/admin'),
    app            = express();

require('locus');


// === Use Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// === Routes ==== //
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);

app.listen((process.env.PORT || 3000), error => {
  console.log('Server is listening.');
});
