const request = require("supertest");
const app = require("../../index");

describe("Game routes", () => {
  describe("GET /api/games", () => {
    it("should return all games", async () => {
      const response = await request(app).get("/api/games");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0); // Assuming there are seeded games
      response.body.forEach((game) => {
        expect(game).toHaveProperty("id");
        expect(game).toHaveProperty("name");
      });
    });
  });

  describe("GET /api/games/:id", () => {
    it("should return a game by ID", async () => {
      const gameId = 1; // Replace with a valid game ID from your seed data

      const response = await request(app).get(`/api/games/${gameId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("id", gameId);
      expect(response.body).toHaveProperty("name");
    });

    it("should return a 404 if the game does not exist", async () => {
      const invalidGameId = 9999; // An ID that does not exist in your database

      const response = await request(app).get(`/api/games/${invalidGameId}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
