var bookshelf = require('../db/bookshelf');

require('./post');

var AdviceType = bookshelf.Model.extend({
  tableName:'advice_types',
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = bookshelf.model('AdviceType', AdviceType);
