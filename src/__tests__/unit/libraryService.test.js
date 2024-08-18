const libraryService = require("../../services/libraryService");
const validationHelper = require("../../helpers/validationHelper");

describe("libraryService", () => {
  describe("Get games in user library", () => {
    const userId = "59230b3f-8608-4fc3-9f15-c016d1fe632b"; // Known user ID from seed file
    it("should return an array", async () => {
      expect(validationHelper.isValidUuid(userId)).toBe(true);

      const games = await libraryService.getGamesInUserLibrary(userId);

      expect(games).toBeInstanceOf(Array);
    });

    it("should return an array of game objects", async () => {
      expect(validationHelper.isValidUuid(userId)).toBe(true);

      const games = await libraryService.getGamesInUserLibrary(userId);

      if (games.length > 0) {
        games.forEach((game) => {
          expect(game).toHaveProperty("id");
          expect(game).toHaveProperty("name");
        });
      }
    });

    it("should return games with correct datatypes", async () => {
      expect(validationHelper.isValidUuid(userId)).toBe(true);

      const games = await libraryService.getGamesInUserLibrary(userId);

      if (games.length > 0) {
        games.forEach((game) => {
          expect(typeof game.id).toBe("number");
          expect(typeof game.name).toBe("string");
        });
      }
    });

    it("should return consistent data", async () => {
      expect(validationHelper.isValidUuid(userId)).toBe(true);

      const games = await libraryService.getGamesInUserLibrary(userId);
      const games2 = await libraryService.getGamesInUserLibrary(userId);

      expect(games).toEqual(games2);
    });
  });
  describe("Add game to library", () => {
    const userId = "59230b3f-8608-4fc3-9f15-c016d1fe632b"; // Known user ID from seed file
    const gameId = "1"; // Known game ID from seed file (range 1-20)
    it("should add a game to the user's library", async () => {
      expect(validationHelper.isValidGameId(gameId)).toBe(true);
      expect(validationHelper.isValidUuid(userId)).toBe(true);

      const result = await libraryService.addGameToUserLibrary(userId, gameId);

      expect(result).toEqual({
        userId,
        gameId,
        message: "Game successfully added to user library",
      });
    });
  });

  describe("Remove game from library", () => {
    const userId = "59230b3f-8608-4fc3-9f15-c016d1fe632b"; // Known user ID from seed file
    const gameId = "2"; // Known game ID from seed file (range 1-20) - different from previous test
    it("should remove a game from the user's library", async () => {
      expect(validationHelper.isValidGameId(gameId)).toBe(true);
      expect(validationHelper.isValidUuid(userId)).toBe(true);

      // if the game is not in the user's library, add it
      const game = await libraryService.getGamesInUserLibrary(userId);

      if (!game.find((g) => g.id === gameId)) {
        await libraryService.addGameToUserLibrary(userId, gameId);
      }
      const result = await libraryService.removeGameFromUserLibrary(
        userId,
        gameId
      );

      expect(result).toEqual({
        userId,
        gameId,
        message: "Game successfully removed from user library",
      });
    });
  });
});
