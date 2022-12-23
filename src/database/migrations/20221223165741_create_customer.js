/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('customers', function(t) {
        t.increments('id').primary();
        t.string('name').notNull();
        t.string('phone').notNull();

        t.integer("userId").nullable().references("id").inTable("users");

        t.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('customers');
};
