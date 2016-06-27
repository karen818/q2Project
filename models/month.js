var bookshelf = require('../db/bookshelf');

require('advice');
require('approved_post');

var Month = bookshelf.Model.extend({
  table:'months',
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = bookshelf.model('Month', Month);
