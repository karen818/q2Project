
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.string('username');
    table.string('full_name');
    table.string('email');
    table.text('img_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
