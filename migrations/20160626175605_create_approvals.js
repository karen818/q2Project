
exports.up = function(knex, Promise) {
  return knex.schema.createTable('approved_advice', table => {

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('approved_advice');
};
