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
 * Check if the value is a valid UUIDv4
 *
 * @param {string} id - ID to check
 * @returns {boolean} - Returns true if the ID is a valid UUIDv4, false otherwise
 */
function isValidId(id) {
  // check if the id is a string
  // check if the id is a uuidv4

  const regex = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  ); // uuidv4 regex

  return isString(id) && regex.test(id);
}

module.exports = {
  isString,
  isValidId,
};
