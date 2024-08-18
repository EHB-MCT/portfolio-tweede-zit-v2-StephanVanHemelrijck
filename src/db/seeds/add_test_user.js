const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await knex("users")
    .where({ id: "59230b3f-8608-4fc3-9f15-c016d1fe632b" })
    .first();

  if (!user) {
    // Inserts seed entries
    await knex("users").insert([
      {
        id: "59230b3f-8608-4fc3-9f15-c016d1fe632b", // uuidv4() - Hardcoded for testing
        email: "test.account@outlook.com",
        password: hashedPassword,
        displayname: "Test Account",
      },
    ]);
  }
};
