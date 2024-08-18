const userService = require("../services/userService");
const validationHelper = require("../helpers/validationHelper");
const libraryService = require("../services/libraryService");

/**
 * Async function to get all users
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array<Object>} - Array of user objects
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting users");
  }
};

/**
 * Async function to get a user by ID
 *
 * @param {Object} req - Express request object
 * @param {string} req.params.id - User ID (UUIDv4)
 * @param {Object} res - Express response object
 * @returns {Object} - User object
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!validationHelper.isValidUuid(id)) {
    return res.status(400).send("Invalid ID: ID must be a valid UUIDv4");
  }

  try {
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting user by ID");
  }
};

/**
 * Async function to create a new user
 *
 * @param {Object} req - Express request object
 * @param {string} req.body.email - User email
 * @param {string} req.body.displayname - User displayname
 * @param {string} req.body.password - User password
 * @param {Object} res - Express response object
 * @returns {Object} - Created user object
 */
const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const createdUser = await userService.createUser(userData);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

/**
 * Async function to login a user
 *
 * @param {Object} req - Express request object
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 * @param {Object} res - Express response object
 * @returns {Object} - Logged in user object
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser({ email, password });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

/**
 * Async function to get all games in a user's library
 *
 * @param {Object} req - Express request object
 * @param {string} req.params.userId - User ID
 * @param {Object} res - Express response object
 * @returns {Array<Object>} - Array of game objects
 */
const getUserLibrary = async (req, res) => {
  const { userId } = req.params;

  try {
    const games = await libraryService.getGamesInUserLibrary(userId);
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

/**
 * Async function to add a game to a user's library
 *
 * @param {Object} req - Express request object
 * @param {string} req.params.userId - User ID
 * @param {string} req.body.gameId - Game ID
 * @param {Object} res - Express response object
 * @returns {Object} - Object containing the user ID, game ID, and a message
 */
const addGameToUserLibrary = async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  try {
    const result = await libraryService.addGameToUserLibrary(userId, gameId);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

/**
 * Async function to remove a game from a user's library
 *
 * @param {Object} req - Express request object
 * @param {string} req.params.userId - User ID
 * @param {string} req.body.gameId - Game ID
 * @param {Object} res - Express response object
 * @returns {Object} - Object containing the user ID, game ID, and a message
 */
const removeGameFromUserLibrary = async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  try {
    const result = await libraryService.removeGameFromUserLibrary(
      userId,
      gameId
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  getUserLibrary,
  addGameToUserLibrary,
  removeGameFromUserLibrary,
};
