
exports.up = function(knex, Promise) {
  return knex.schema.dropTable('approved_advice');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('approved_advice', table => {
    table.increments().primary();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table.text('advice_text');
    table.integer('advice_type')
      .references('id')
      .inTable('advice_types')
      .onDelete('cascade');
    table.integer('month_id')
      .references('id')
      .inTable('months')
      .onDelete('cascade');
    table.integer('city_id')
      .references('id')
      .inTable('cities')
      .onDelete('cascade');
  });
};
