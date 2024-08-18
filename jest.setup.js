require("dotenv").config({
  path: require("path").resolve(__dirname, "./config/.env.test"),
});

const knexConfig = require("./src/db/knexfile");
const knex = require("knex")(knexConfig.test);

const { seed } = require("./src/db//seeds/add_test_user");

beforeAll(async () => {
  try {
    await knex.migrate.latest();
    await seed(knex);
  } catch (error) {
    console.error("Error during setup: ", error);
  }
});

afterAll(async () => {
  try {
    await knex.destroy(); // close the connection
  } catch (error) {
    console.error("Error during cleanup after test: ", error);
  }
});
