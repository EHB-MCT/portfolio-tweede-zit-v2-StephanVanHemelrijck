const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/**
 * GET endpoint, route that gets all users
 *
 * @name GET /users
 */
router.get("/", userController.getAllUsers);

/**
 * GET endpoint, route that gets a user by ID
 *
 * @name GET /users/:id
 * @param {string} id - User ID (UUIDv4)
 */
router.get("/:id", userController.getUserById);

module.exports = router;
