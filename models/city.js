var bookshelf = require('../db/bookshelf');

require('advice');

var City = bookshelf.Model.extend({
  table:'cities',
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = bookshelf.model('City', City);
