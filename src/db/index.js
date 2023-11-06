const knex = require('knex')({
    client: 'pg',
    connection: {
      user: 'postgres',
      database: 'kelpassignment',
      password: 'Ronaldo',
      port: 5432,
      host: 'localhost',
    }
  });
module.exports = knex;