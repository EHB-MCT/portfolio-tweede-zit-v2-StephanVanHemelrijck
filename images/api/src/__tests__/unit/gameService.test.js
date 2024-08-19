const gameService = require("../../services/gameService");

describe("gameService", () => {
  describe("Get all games", () => {
    it("should return an array", async () => {
      const games = await gameService.getAllGames();
      expect(games).toBeInstanceOf(Array);
    });

    it("should return an array of game objects", async () => {
      const games = await gameService.getAllGames();
      if (games.length > 0) {
        games.forEach((game) => {
          expect(game).toHaveProperty("id");
          expect(game).toHaveProperty("name");
        });
      }
    });

    it("should return games with correct datatypes", async () => {
      const games = await gameService.getAllGames();
      if (games.length > 0) {
        games.forEach((game) => {
          expect(typeof game.id).toBe("number");
          expect(typeof game.name).toBe("string");
        });
      }
    });

    it("should return consistent data", async () => {
      const games = await gameService.getAllGames();
      const games2 = await gameService.getAllGames();
      expect(games).toEqual(games2);
    });
  });

  describe("Get game by ID", () => {
    // Hard coded game ID, knowing that we seed 20 games starting from id 1
    const knownGameId = 1;

    it("should return a game object", async () => {
      const game = await gameService.getGameById(knownGameId);
      expect(game).toHaveProperty("id");
      expect(game).toHaveProperty("name");
    });

    it("should return a game with correct datatypes", async () => {
      const game = await gameService.getGameById(knownGameId);
      expect(typeof game.id).toBe("number");
      expect(typeof game.name).toBe("string");
    });

    it("given ID should match game ID", async () => {
      const game = await gameService.getGameById(knownGameId);

      expect(game.id).toBe(knownGameId);
    });
  });
});
