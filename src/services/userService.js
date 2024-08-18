const environment = process.env.NODE_ENV || "development";
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig[environment]);
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const validationHelper = require("../helpers/validationHelper");

/**
 * Async function to get all users
 *
 * @param {void}
 * @returns {Promise<Array<Object>>} - Array of user objects
 * @throws {Error} - Thrown when an error occurs
 */
const getAllUsers = async () => {
  try {
    return await knex("users").select("id", "email", "displayname");
  } catch (error) {
    console.error(error);
    throw new Error("Error getting users");
  }
};

/**
 * Async function to get a user by ID
 *
 * @param {number} id - User ID
 * @returns {Promise<Object>} - User object
 * @throws {Error} - Thrown when an error occurs
 */
const getUserById = async (id) => {
  try {
    return await knex("users")
      .where({ id })
      .first()
      .select("id", "email", "displayname");
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by ID");
  }
};

/**
 * Async function to create a new user
 *
 * @param {Object} userData - User data
 * @param {string} userData.email - User email
 * @param {string} userData.displayname - User displayname
 * @param {string} userData.password - User password
 * @returns {Promise<Object>} - Created user object
 * @throws {Error} - Thrown when an error occurs
 */
const createUser = async (userData) => {
  try {
    const isUserDataValid = validationHelper.validateCreateUserData(userData);

    if (!isUserDataValid) {
      throw new Error(
        "Invalid user data: Missing email, displayname, or password"
      );
    }

    if (!validationHelper.isValidEmail(userData.email)) {
      throw new Error("Invalid email: Email must be a valid email address");
    }

    if (!validationHelper.isValidDisplayname(userData.displayname)) {
      throw new Error(
        "Invalid displayname: Displayname must be between 3 and 25 characters long and contain only letters and spaces"
      );
    }

    if (!validationHelper.isValidPassword(userData.password)) {
      throw new Error(
        "Invalid password: Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"
      );
    }

    // check for duplicate
    const existingUser = await knex("users")
      .where("email", userData.email)
      .first();

    if (existingUser) {
      throw new Error("User already exists with that email address");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      id: uuidv4(),
      email: userData.email,
      displayname: userData.displayname,
      password: hashedPassword,
    };

    try {
      await knex("users").insert(newUser);
    } catch (dbError) {
      console.error("Database insertion error:", dbError);
      throw new Error("Error inserting user into database");
    }

    const createdUser = await knex("users").where({ id: newUser.id }).first();

    if (!createdUser) {
      throw new Error("User creation failed: User not found after insertion.");
    }

    return createdUser;
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Async function to login a user
 *
 * @param {Object} userData - User data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @returns {Promise<Object>} - Logged in user object
 * @throws {Error} - Thrown when an error occurs
 */
const loginUser = async (userData) => {
  try {
    const isUserDataValid = validationHelper.validateLoginUserData(userData);

    if (!isUserDataValid) {
      throw new Error("Invalid user data: Missing email or password");
    }

    if (!validationHelper.isValidEmail(userData.email)) {
      throw new Error("Invalid email: Email must be a valid email address");
    }

    if (!validationHelper.isValidPassword(userData.password)) {
      throw new Error(
        "Invalid password: Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"
      );
    }

    const user = await knex("users").where("email", userData.email).first();

    if (!user) {
      throw new Error("User not found with that email address");
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Error logging in user: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
};
