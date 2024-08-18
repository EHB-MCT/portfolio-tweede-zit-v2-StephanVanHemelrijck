const environment = process.env.NODE_ENV || "development";
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig[environment]);

/**
 * Async function to get all games
 *
 * @returns {Promise<Array<Object>>} - Array of game objects
 */
const getAllGames = async () => {
  try {
    return await knex("games");
  } catch (error) {
    console.error(error);
    throw new Error("Error getting games");
  }
};

/**
 * Async function to get a game by ID
 *
 * @param {number} id - Game ID
 * @returns {Promise<Object>} - Game object
 * @throws {Error} - Thrown when an error occurs
 */
const getGameById = async (id) => {
  try {
    return await knex("games").where({ id }).first();
  } catch (error) {
    console.error(error);
    throw new Error("Error getting game by ID");
  }
};

module.exports = {
  getAllGames,
  getGameById,
};
