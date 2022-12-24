/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (t) {
    t.increments('id').primary();
    t.string("email").notNull();
    t.string("password").notNull();
    t.string("role").notNull();

    t.integer("customerId").nullable().references("customers.id").onDelete('CASCADE');

    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
