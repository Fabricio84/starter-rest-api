/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (t) {
    t.uuid("id").primary();
    t.string("email").notNull();
    t.string("password").notNull();
    t.string("role").notNull();

    t.string("customerId").nullable().references("id").inTable("customers");

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
