const userService = require("../../services/userService");

describe("userService", () => {
  describe("Get all users", () => {
    it("should return an array", async () => {
      const users = await userService.getAllUsers();
      expect(users).toBeInstanceOf(Array);
    });

    it("should return an array of user objects", async () => {
      const users = await userService.getAllUsers();
      if (users.length > 0) {
        users.forEach((user) => {
          expect(user).toHaveProperty("id");
          expect(user).toHaveProperty("email");
          expect(user).toHaveProperty("displayname");
        });
      }
    });

    it("should return users with correct datatypes", async () => {
      const users = await userService.getAllUsers();
      if (users.length > 0) {
        users.forEach((user) => {
          expect(typeof user.id).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(typeof user.displayname).toBe("string");
        });
      }
    });

    it("should return consistent data", async () => {
      const users = await userService.getAllUsers();
      const users2 = await userService.getAllUsers();
      expect(users).toEqual(users2);
    });
  });

  describe("Get user by ID", () => {
    // Hard coded user ID from the seed file
    const knownUserId = "59230b3f-8608-4fc3-9f15-c016d1fe632b";

    it("should return a user object", async () => {
      const user = await userService.getUserById(knownUserId);
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("displayname");
    });

    it("should return a user with correct datatypes", async () => {
      const user = await userService.getUserById(knownUserId);
      expect(typeof user.id).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(typeof user.displayname).toBe("string");
    });

    it("given ID should match user ID", async () => {
      const user = await userService.getUserById(knownUserId);
      expect(user.id).toBe(knownUserId);
    });
  });
});
