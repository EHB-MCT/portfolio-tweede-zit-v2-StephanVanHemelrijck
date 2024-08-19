const request = require("supertest");
const app = require("../../index");
const { v4: uuidv4 } = require("uuid");
const userService = require("../../services/userService");

describe("User Routes", () => {
  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0); // Assuming there are seeded users
      response.body.forEach((user) => {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("displayname");
      });
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return a user by ID", async () => {
      const userId = "59230b3f-8608-4fc3-9f15-c016d1fe632b"; // Replace with a valid user ID from your seed data

      const response = await request(app).get(`/api/users/${userId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("id", userId);
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("displayname");
    });

    it("should return a 404 if the id provided is valdi but user does not exist", async () => {
      const unknownUserId = uuidv4();

      const response = await request(app).get(`/api/users/${unknownUserId}`);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const timestamp = Date.now();

      const newUser = {
        email: `new.user-${timestamp}@outlook.com`,
        displayname: "New User",
        password: "Password123!",
      };

      const response = await request(app).post("/api/users").send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email", newUser.email);
      expect(response.body).toHaveProperty("displayname", newUser.displayname);

      // cleanup
      await userService.deleteUser(response.body.id);
    });

    it("should return a 400 if required fields are missing", async () => {
      const incompleteUser = {
        email: "incomplete.user@outlook.com",
      };

      const response = await request(app)
        .post("/api/users")
        .send(incompleteUser);

      expect(response.error.text).toBe(
        "Error creating user: Invalid user data: Missing email, displayname, or password"
      );
    });
  });

  describe("POST /api/users/login", () => {
    it("should log in a user with valid credentials", async () => {
      const loginData = {
        email: "test.account@outlook.com", // Use a valid email from your seed data
        password: "plainPassword123@", // Use the correct password for the seed user
      };

      const response = await request(app)
        .post("/api/users/login")
        .send(loginData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email", loginData.email);
    });

    it("should return a 401 for invalid credentials", async () => {
      const invalidLoginData = {
        email: "test.account@outlook.com",
        password: "wrongPassword",
      };

      const response = await request(app)
        .post("/api/users/login")
        .send(invalidLoginData);
      expect(response.error.text).toBe(
        "Error logging in user: Invalid credentials"
      );
    });
  });

  describe("GET /api/users/:userId/library", () => {
    it("should return all games in the user's library", async () => {
      const userId = "59230b3f-8608-4fc3-9f15-c016d1fe632b"; // Replace with a valid user ID from your seed data

      const response = await request(app).get(`/api/users/${userId}/library`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((game) => {
        expect(game).toHaveProperty("game_id");
        expect(game).toHaveProperty("name");
      });
    });

    it("should return a 404 if the uuid is valid format, but user does not exist", async () => {
      const unknownUserId = uuidv4();

      const response = await request(app).get(
        `/api/users/${unknownUserId}/library`
      );
      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /api/users/:userId/library/add", () => {
    it("should add a game to the user's library", async () => {
      const userId = "59230b3f-8608-4fc3-9f15-c016d1fe632b"; // Replace with a valid user ID from your seed data
      const gameId = 1; // Replace with a valid game ID from your seed data

      const response = await request(app)
        .post(`/api/users/${userId}/library/add`)
        .send({ gameId });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        userId,
        gameId,
        message: "Game successfully added to user library",
      });
    });

    it("should return a 404 if the game or user (valid uuidv4) does not exist", async () => {
      const unknownUserId = uuidv4();
      const invalidGameId = 9999; // A non-existent game ID

      const response = await request(app)
        .post(`/api/users/${unknownUserId}/library/add`)
        .send({ gameId: invalidGameId });
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/users/:userId/library/remove", () => {
    it("should remove a game from the user's library", async () => {
      const userId = "59230b3f-8608-4fc3-9f15-c016d1fe632b"; // Replace with a valid user ID from your seed data
      const gameId = 1; // Replace with a valid game ID from your seed data

      const response = await request(app)
        .delete(`/api/users/${userId}/library/remove`)
        .send({ gameId });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        userId,
        gameId,
        message: "Game successfully removed from user library",
      });
    });

    it("should return a 404 if the game or user (uuidv4) does not exist", async () => {
      const invalidUserId = uuidv4();
      const invalidGameId = 9999; // A non-existent game ID

      const response = await request(app)
        .delete(`/api/users/${invalidUserId}/library/remove`)
        .send({ gameId: invalidGameId });
      expect(response.statusCode).toBe(404);
    });
  });
});
