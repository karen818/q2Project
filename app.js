var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    index          = require('./routes/index'),
    app            = express();

require('locus');


// === Use Middleware === //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


// === Routes ==== //
app.use('/', index);


app.listen((process.env.PORT || 3000), error => {
  console.log('Server is listening.');
});
