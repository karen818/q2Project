
exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.boolean('is_admin').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('is_admin');
  })
};
