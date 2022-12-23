const knex = require('knex');
const config = require('../../knexfile');

module.exports = process.env.NODE_ENV === 'dev'
? knex(config.development)
: knex(config.production);