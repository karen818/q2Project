var bookshelf = require('../db/bookshelf');

require('./user');
require('./city');
require('./month');
require('./advice');

var Post = bookshelf.Model.extend({
  table: 'posts',
  user: function(){
    return this.belongsTo('User');
  },
  city: function(){
    return this.belongsTo('City');
  },
  month: function(){
    return this.belongsTo('Month');
  },
  advice: function(){
    return this.belongsTo('AdviceType');
  }
});

module.exports = bookshelf.model('Post', Post);
