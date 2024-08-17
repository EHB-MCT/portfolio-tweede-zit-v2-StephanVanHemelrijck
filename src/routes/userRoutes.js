const express = require("express");
const router = express.Router();

const userService = require("../services/userService");

/**
 * GET endpoint, route that gets all users
 *
 * @name GET /users
 * @param {void}
 * @returns {Array<Object>} - Array of user objects
 * @throws {Error} - Thrown when an error occurs
 */
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
