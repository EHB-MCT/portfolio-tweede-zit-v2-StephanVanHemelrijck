const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gameController");

/**
 * GET endpoint, route that gets all games
 *
 * @name GET api/games
 */
router.get("/", gameController.getAllGames);

/**
 * GET endpoint, route that gets a game by ID
 *
 * @name GET api/games/:id
 * @param {string} req.param.id - Game ID
 */
router.get("/:id", gameController.getGameById);

module.exports = router;
