
exports.up = function(knex, Promise) {
  return knex.schema.createTable('advice_types', table => {
    table.increments().primary();
    table.string('advice_type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('advice_types');
};
