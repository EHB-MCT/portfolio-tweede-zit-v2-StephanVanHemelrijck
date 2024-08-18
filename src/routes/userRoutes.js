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

module.exports = router;
