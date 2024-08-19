const path = require("path");

const environment = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: path.resolve(__dirname, "../../config/.env." + environment),
});

const sharedConfig = {
  client: "mysql2",
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, "./migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "./seeds"),
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
  test: {
    ...sharedConfig,
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
  production: {
    ...sharedConfig,
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
};
