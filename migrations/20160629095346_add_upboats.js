
exports.up = function(knex, Promise) {
  return knex.schema.table('advice_posts', table => {
    table.integer('upvotes')
      .defaultsTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('advice_posts', table => {
    table.dropColumn('upvotes');
  });
};
