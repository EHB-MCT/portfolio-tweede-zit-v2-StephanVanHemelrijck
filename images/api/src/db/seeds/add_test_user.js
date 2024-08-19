const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const existingUser = await knex("users")
    .where({ id: "59230b3f-8608-4fc3-9f15-c016d1fe632b" })
    .first();

  if (!existingUser) {
    // Now proceed with the insertion of the new test user
    await knex("users").insert({
      id: "59230b3f-8608-4fc3-9f15-c016d1fe632b",
      displayname: "Test Account",
      email: "test.account@outlook.com",
      password: bcrypt.hashSync("plainPassword123@", 10),
    });
  }
};
