// Update with your config settings.
require('dotenv/config');

const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;


module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:'localhost',
      port: 3306,
      database: 'device_mgmt',
      user:     'root',
      password: 'Mysql!'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/database/migrations"
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: DB_HOST || '127.0.0.1',
      port: DB_PORT || 3306,
      database: DB_DATABASE || 'my_db',
      user:     DB_USERNAME || 'username',
      password: DB_PASSWORD || 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/database/migrations"
    }
  }};
