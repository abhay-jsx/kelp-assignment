// Update with your config settings.

const config = require("./src/config/config");
const path = require('path');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: config.pg.user,
      database: config.pg.database,
      password: config.pg.password,
      port: config.pg.port,
      host: config.pg.host,
    },
    // migrations: {
    //   directory: path.join(__dirname, '/migrations'), // Specify the directory for your migrations
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:path.join(__dirname, 'src/db/migrations'), // Specify the directory for your migrations
      disableMigrationsListValidation: true,
      tableName: 'knex_migration'
    }
  },

};
