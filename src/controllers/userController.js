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

module.exports = {
  getAllUsers,
  getUserById,
};
