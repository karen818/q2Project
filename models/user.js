var bookshelf = require('../db/bookshelf');

require('./post');
require('./approved_post');

var User = bookshelf.Model.extend({
  table:'users',
  posts: function() {
    return this.hasMany('Post');
  },
  approved: function() {
    return this.hasMany('Approved_Post');
  }
});

module.exports = bookshelf.model('User', User);
