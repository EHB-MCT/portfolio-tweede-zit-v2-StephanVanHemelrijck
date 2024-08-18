const environment = process.env.NODE_ENV || "development";
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig[environment]);
const validationHelper = require("../helpers/validationHelper");

/**
 * Async function to get games in user library
 *
 * @param {string} userId - User ID - the ID of the user whose library to get
 * @returns {Promise<Array<Object>>} - Array of game objects
 * @throws {Error} - Thrown when an error occurs
 */
const getGamesInUserLibrary = async (userId) => {
  try {
    if (!validationHelper.isValidUuid(userId)) {
      throw new Error("Invalid user ID");
    }

    const games = await knex("user_games")
      .select("game_id", "name")
      .join("games", "user_games.game_id", "games.id")
      .where({ user_id: userId });

    return games;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting games in user library");
  }
};

/**
 * Async function to add a game to a user's library
 *
 * @param {string} userId - User ID - the ID of the user to add the game to
 * @param {string} gameId - Game ID - the ID of the game to add to the user's library
 * @returns {Object} - Object containing the user ID, game ID, and a message
 * @throws {Error} - Thrown when an error occurs
 */
const addGameToUserLibrary = async (userId, gameId) => {
  if (!validationHelper.isValidUuid(userId)) {
    throw new Error("Invalid user ID");
  }

  if (!validationHelper.isValidGameId(gameId)) {
    throw new Error("Invalid game ID");
  }

  try {
    await knex("user_games").insert({ user_id: userId, game_id: gameId });
  } catch (error) {
    console.error(error);
    throw new Error("Error adding game to user library");
  }

  return {
    userId,
    gameId,
    message: "Game successfully added to user library",
  };
};

/**
 * Async function to remove a game from a user's library
 *
 * @param {string} userId - User ID - the ID of the user to remove the game from
 * @param {string} gameId - Game ID - the ID of the game to remove from the user's library
 * @returns {Object} - Object containing the user ID, game ID, and a message
 * @throws {Error} - Thrown when an error occurs
 */
const removeGameFromUserLibrary = async (userId, gameId) => {
  if (!validationHelper.isValidUuid(userId)) {
    throw new Error("Invalid user ID");
  }

  if (!validationHelper.isValidGameId(gameId)) {
    throw new Error("Invalid game ID");
  }

  try {
    await knex("user_games").where({ user_id: userId, game_id: gameId }).del();
  } catch (error) {
    console.error(error);
    throw new Error("Error removing game from user library");
  }

  return {
    userId,
    gameId,
    message: "Game successfully removed from user library",
  };
};

module.exports = {
  getGamesInUserLibrary,
  addGameToUserLibrary,
  removeGameFromUserLibrary,
};
