
exports.up = function(knex, Promise) {
  return knex.schema.createTable('months', table => {
    table.increments().primary();
    table.string('month');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('months');
};
