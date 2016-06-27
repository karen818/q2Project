var bookshelf = require('../db/bookshelf');

require('advice');

var AdviceType = bookshelf.Model.extend({
  table:'advice_types',
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = bookshelf.model('AdviceType', AdviceType);
