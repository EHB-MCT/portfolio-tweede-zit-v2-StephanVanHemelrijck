const gameService = require("../services/gameService");
const validationHelper = require("../helpers/validationHelper");

/**
 * Async function to get all games
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array<Object>} - Array of game objects
 */
const getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting games");
  }
};

/**
 * Async function to get a game by ID
 *
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Game ID
 * @param {Object} res - Express response object
 * @returns {Object} - Game object
 */
const getGameById = async (req, res) => {
  const { id } = req.params;

  if (!validationHelper.isValidGameId(id)) {
    return res.status(400).send("Invalid ID: ID must be a valid number");
  }

  try {
    const game = await gameService.getGameById(id);
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting game by ID");
  }
};

module.exports = {
  getAllGames,
  getGameById,
};
