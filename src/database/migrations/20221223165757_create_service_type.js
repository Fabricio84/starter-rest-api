/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('service_types', function(t) {
        t.uuid('id').primary();
        t.string('description').notNull();
        t.decimal('price',6,2).notNull();
        t.integer('duration').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('service_types');
};
