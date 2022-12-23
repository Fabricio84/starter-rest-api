exports.up = function(knex) {
    return knex.schema
      .createTable('users', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('last_access').defaultTo(null);
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropSchema('users');
  };
  
  exports.config = { transaction: false };
