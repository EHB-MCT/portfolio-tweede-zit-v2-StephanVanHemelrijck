require("dotenv").config({
  path: require("path").resolve(__dirname, "./config/.env.test"),
});

const knexConfig = require("./src/db/knexfile");
const knex = require("knex")(knexConfig.test);

let server;

beforeAll(async () => {
  try {
    // Run the migrations and seeds once before all tests
    // await knex.migrate.latest();
    // await knex.seed.run();

    // Start the server
    const app = require("./src/index");
    server = app.listen();
  } catch (error) {
    console.error("Error during global setup: ", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Close the server and the database connection after all tests
    if (server) {
      server.close();
    }
    await knex.destroy();
  } catch (error) {
    console.error("Error during global cleanup: ", error);
  }
});
