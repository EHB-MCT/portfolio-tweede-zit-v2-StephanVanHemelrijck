const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const hashedPassword = await bcrypt.hash("password", 10);

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      email: "test.account@outlook.com",
      password: hashedPassword,
      displayname: "Test Account",
    },
  ]);
};
