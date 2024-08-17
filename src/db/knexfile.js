require("dotenv").config({ path: "../../config/.env.dev" });

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations", // Relative to the src/db/ directory
    },
    seeds: {
      directory: "./seeds", // Relative to the src/db/ directory
    },
  },
};
