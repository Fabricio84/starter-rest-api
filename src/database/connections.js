const knex = require('knex');
const config = require('../../knexfile');

const db = process.env.NODE_ENV === 'dev'
? knex(config.development)
: knex(config.production);

class DbController {
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }

    async findMany() {
        return this.db(this.table).select('*')
    }

    async findFirst(id) {
        const [result] = await this.db(this.table).where('id', id);
        return result
    }

    async create(data) {
        return this.db(this.table).returning('id').insert(data);
    }

    async update(id, data) {
        return this.db(this.table)
        .where('id', id)
        .update({ ...data });
    }

    async remove(id) {
        return this.db(this.table)
        .where('id', id)
        .del();
    }
}

module.exports = { db, DbController };