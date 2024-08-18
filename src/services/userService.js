const environment = process.env.NODE_ENV || "development";
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig[environment]);

/**
 * Async function to get all users
 *
 * @param {void}
 * @returns {Promise<Array<Object>>} - Array of user objects
 * @throws {Error} - Thrown when an error occurs
 */
const getAllUsers = async () => {
  try {
    return await knex("users").select("id", "email", "displayname");
  } catch (error) {
    console.error(error);
    throw new Error("Error getting users");
  }
};

/**
 * Async function to get a user by ID
 *
 * @param {number} id - User ID
 * @returns {Promise<Object>} - User object
 * @throws {Error} - Thrown when an error occurs
 */
const getUserById = async (id) => {
  try {
    return await knex("users")
      .where({ id })
      .first()
      .select("id", "email", "displayname");
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by ID");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
