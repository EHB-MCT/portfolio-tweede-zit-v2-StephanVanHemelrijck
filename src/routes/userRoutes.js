const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/**
 * GET endpoint, route that gets all users
 *
 * @name GET api/users
 */
router.get("/", userController.getAllUsers);

/**
 * GET endpoint, route that gets a user by ID
 *
 * @name GET api/users/:id
 * @param {string} req.param.id - User ID (UUIDv4)
 */
router.get("/:id", userController.getUserById);

/**
 * POST endpoint, route that creates a new user
 *
 * @name POST api/users
 */
router.post("/", userController.createUser);

/**
 * POST endpoint, route that logs in a user
 *
 * @name POST api/users/login
 *
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 */
router.post("/login", userController.loginUser);

/**
 * GET endpoint, route that gets games in user library
 *
 * @name GET api/users/:userId/library
 * @param {string} req.params.userId - User ID
 */
router.get("/:userId/library", userController.getUserLibrary);

/**
 * POST endpoint, route that adds a game to a user's library
 *
 * @name POST api/users/:userId/library/add
 * @param {string} req.params.userId - User ID
 * @param {string} req.body.gameId - Game ID
 */
router.post("/:userId/library/add", userController.addGameToUserLibrary);

module.exports = router;
