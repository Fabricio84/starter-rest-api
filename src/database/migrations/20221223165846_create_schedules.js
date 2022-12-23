/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('schedules', function(t) {
        t.uuid('id').primary();
        t.dateTime('start').notNull();
        t.dateTime('end').notNull();

        t.string("serviceTypeID").references("id").inTable("service_types");
        t.string("customerID").references("id").inTable("customers");

        t.timestamp("created_at").defaultTo(knex.fn.now());

        t.dateTime('confirmation_at').nullable();
        t.dateTime('canceled_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('schedules');
};
