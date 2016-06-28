var environment   = process.env.NODE_ENV || 'development',
    configuration = require('../knexfile')[environment],
    knex          = require('knex')(configuration),
    bookshelf     = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
