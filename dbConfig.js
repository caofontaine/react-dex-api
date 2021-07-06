const knex = require('knex');
const config = require('./knexConfigs');

let db = null;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  db = knex(config.dev);
} else {
  db = knex(config.prod);
}

module.exports = db;
