
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities', table => {
    table.increments().primary();
    table.string('city_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
