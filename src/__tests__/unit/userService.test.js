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
          expect(typeof user.id).toBe("number");
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
});
