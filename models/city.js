var bookshelf = require('../db/bookshelf');

require('./post');

var City = bookshelf.Model.extend({
  tableName:'cities',
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = bookshelf.model('City', City);
