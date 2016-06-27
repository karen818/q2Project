
exports.up = function(knex, Promise) {
  return knex.schema.table('advice_posts', table => {
    table.boolean('approved')
      .defaultTo('false');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('advice_posts', table => {
    table.dropColumn('approved');
  })
};
