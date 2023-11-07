const path = require('path');
const config = require('../config/config');
const { TableBuilder } = require('knex');

const knex = require('knex')({
    client: 'pg',
    connection: {
      user: config.pg.user,
      database: config.pg.database,
      password: config.pg.password,
      port: config.pg.port,
      host: config.pg.host,
    },
  });

module.exports = knex;