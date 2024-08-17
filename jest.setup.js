require("dotenv").config({
  path: require("path").resolve(__dirname, "./config/.env.test"),
});

const knexConfig = require("./src/db/knexfile");
const knex = require("knex")(knexConfig.test);

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});
