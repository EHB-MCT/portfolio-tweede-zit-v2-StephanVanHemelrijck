/**
 * Check if the value is a string
 *
 * @param {any} value - Value to check
 * @returns {boolean} - Returns true if the value is a string, false otherwise
 */
function isString(string) {
  return typeof string === "string";
}

/**
 * Check if the value is a number
 *
 * @param {any} number - Value to check
 * @returns {boolean} - Returns true if the value is a number, false otherwise
 */
function isNumber(number) {
  return typeof number === "number";
}

/**
 * Check if the value is a valid UUIDv4
 *
 * @param {string} id - ID to check
 * @returns {boolean} - Returns true if the ID is a valid UUIDv4, false otherwise
 */
function isValidUuid(id) {
  // check if the id is a string
  // check if the id is a uuidv4

  const regex = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  ); // uuidv4 regex

  return isString(id) && regex.test(id);
}

/**
 * Function to validate user data when creating a new user,
 * the user data must contain the following fields: email, displayname, password
 *
 * @param {*} userData - The user data to validate
 * @returns {boolean} - Returns true if the user data is valid, false otherwise
 */
function validateCreateUserData(userData) {
  // Check if userData has the required fields
  if (!userData.email || !userData.displayname || !userData.password) {
    return false;
  }

  return true;
}

/**
 * Function to validate an email address.
 * The email must follow the standard format:
 * - [name]@[domain].[tld]
 * - [name] can contain letters, numbers, and the special characters "." and "-"
 * - [domain] can contain letters, numbers, and hyphens
 * - [tld] must be at least 2 characters long and contain only letters
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} - Returns true if the email is valid, false otherwise
 */
function isValidEmail(email) {
  const regex = new RegExp(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/); // email regex

  return isString(email) && regex.test(email);
}

/**
 * Function to validate a displayname, it must be at least 3 characters long
 * and at most 25 characters long, and can only contain letters, and spaces
 *
 * @param {string} displayname - The displayname to validate
 * @returns {boolean} - Returns true if the displayname is valid, false otherwise
 */
function isValidDisplayname(displayname) {
  const regex = new RegExp(/^[a-zA-Z ]{3,25}$/);

  return isString(displayname) && regex.test(displayname);
}

/**
 * Function to validate a password, it must be at least 8 characters long,
 * have at least one uppercase letter, one number, and one special character
 *
 * @param {string} password - The password to validate
 * @returns {boolean} - Returns true if the password is valid, false otherwise
 */
function isValidPassword(password) {
  const regex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
  );

  return isString(password) && regex.test(password);
}

/**
 * Function to validate user data when logging in,
 * the user data must contain the following fields: email, password
 * and must be strings
 *
 * @param {*} userData - The user data to validate
 * @returns {boolean} - Returns true if the user data is valid, false otherwise
 */
function validateLoginUserData(userData) {
  if (!userData.email || !userData.password) {
    return false;
  }

  if (!isString(userData.email) || !isString(userData.password)) return false;

  return true;
}

/**
 * Function to validate a game ID, it must be a number, or a string that contains only numbers
 *
 * @param {number} id - The game ID to validate
 * @returns {boolean} - Returns true if the game ID is valid, false otherwise
 */
function isValidGameId(id) {
  const regex = new RegExp(/^\d+$/); // number regex

  return isNumber(id) || regex.test(id);
}

module.exports = {
  isString,
  isNumber,
  isValidUuid,
  validateCreateUserData,
  isValidEmail,
  isValidDisplayname,
  isValidPassword,
  validateLoginUserData,
  isValidGameId,
};
