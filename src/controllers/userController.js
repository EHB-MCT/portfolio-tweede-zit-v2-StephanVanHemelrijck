const userService = require("../services/userService");
const validationHelper = require("../helpers/validationHelper");

/**
 * Async function to get all users
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array<Object>} - Array of user objects
 * @throws {Error} - Thrown when an error occurs
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
 * @throws {Error} - Thrown when an error occurs
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!validationHelper.isValidId(id)) {
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
 * @throws {Error} - Thrown when an error occurs
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
 * @throws {Error} - Thrown when an error occurs
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
};
