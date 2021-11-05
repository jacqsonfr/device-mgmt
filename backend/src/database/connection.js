const knex = require('knex');
const configuration = require('../../knexfile');

require('dotenv').config();

// const connection = knex(configuration.development);
const connection = knex(configuration[process.env.ENV_MODE]);

module.exports = connection;