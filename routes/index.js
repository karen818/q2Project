'use strict';

var express = require('express'),
    router  = express.Router(),
    bookshelf = require('../db/bookshelf'),
    User      = require('../models/user'),
    Post      = require('../models/post'),
    Advice    = require('../models/advice'),
    City      = require('../models/city'),
    Month     = require('../models/month'),
    passport  = require('passport');

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

module.exports = router;
