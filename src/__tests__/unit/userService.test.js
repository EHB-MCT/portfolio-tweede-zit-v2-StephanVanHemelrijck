const userService = require("../../services/userService");
const bcrypt = require("bcrypt");

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

  describe("Create User", () => {
    it("should create a new user with valid data and delete the user after creation", async () => {
      const timestamp = Date.now();
      const newUser = {
        email: `unit.test-${timestamp}@outlook.com`,
        displayname: "Unit tester",
        password: "plainPassword123@",
      };

      const user = await userService.createUser(newUser);

      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("displayname");
      expect(user).toHaveProperty("password");

      expect(user.email).toBe(newUser.email);
      expect(user.displayname).toBe(newUser.displayname);

      const passwordMatch = await bcrypt.compare(
        newUser.password,
        user.password
      );
      expect(passwordMatch).toBe(true);

      const deletedUser = await userService.deleteUser(user.id);
    });
  });

  describe("delete user", () => {
    it("should delete a user", async () => {
      const newUser = {
        email: `user.to.delete@outlook.com`,
        displayname: "User Delete",
        password: "plainPassword123@",
      };

      const user = await userService.createUser(newUser);
      // Check if user was created
      expect(user).toHaveProperty("id");

      const deletedUser = await userService.deleteUser(user.id);
      expect(deletedUser).toEqual(user);
    });
  });
});
