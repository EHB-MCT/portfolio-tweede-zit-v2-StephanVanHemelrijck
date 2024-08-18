const validationHelper = require("../../helpers/validationHelper");

describe("validationHelper.isString", () => {
  it("should be of type string", () => {
    expect(validationHelper.isString("string")).toBe(true);
    expect(validationHelper.isString(123)).toBe(false);
  });
});

describe("validationHelper.isValidId", () => {
  it("should be a valid UUIDv4", () => {
    expect(
      validationHelper.isValidId("59230b3f-8608-4fc3-9f15-c016d1fe632b")
    ).toBe(true);

    expect(validationHelper.isValidId("123")).toBe(false);
    expect(validationHelper.isValidId("")).toBe(false);
    expect(validationHelper.isValidId(123)).toBe(false);
    expect(validationHelper.isValidId("abcd-efgh-ijkl-mnop")).toBe(false);
  });
});

describe("validationHelper.validateCreateUserData", () => {
  it("should have email, displayname, and password params and be valid properties", () => {
    expect(
      validationHelper.validateCreateUserData({
        email: "",
      })
    ).toBe(false);

    expect(
      validationHelper.validateCreateUserData({
        email: "",
        password: "",
      })
    ).toBe(false);

    expect(
      validationHelper.validateCreateUserData({
        email: "test@outlook.com",
        displayname: "Test account",
        password: "plainPassword123@",
      })
    ).toBe(true);
  });
});

describe("validationHelper.isValidEmail", () => {
  it("should be a valid email", () => {
    expect(validationHelper.isValidEmail("")).toBe(false);
    expect(validationHelper.isValidEmail("test")).toBe(false);
    expect(validationHelper.isValidEmail("test@outlook")).toBe(false);
    expect(validationHelper.isValidEmail(123)).toBe(false);
    expect(validationHelper.isValidEmail("john@doe@outlook.com")).toBe(false);

    expect(validationHelper.isValidEmail("test-test@outlook.com")).toBe(true);
    expect(validationHelper.isValidEmail("john.doe@outlook.com")).toBe(true);
  });
});

describe("validationHelper.isValidDisplayname", () => {
  it("should be a valid displayname", () => {
    expect(validationHelper.isValidDisplayname("")).toBe(false);
    expect(validationHelper.isValidDisplayname(123)).toBe(false);
    expect(validationHelper.isValidDisplayname("a")).toBe(false);
    expect(validationHelper.isValidDisplayname("a".repeat(26))).toBe(false);
    expect(validationHelper.isValidDisplayname(undefined)).toBe(false);
    expect(validationHelper.isValidDisplayname(null)).toBe(false);

    expect(validationHelper.isValidDisplayname("John Doe Jr")).toBe(true);
    expect(validationHelper.isValidDisplayname("JohnDoe")).toBe(true);
    expect(validationHelper.isValidDisplayname("John Doe")).toBe(true);
  });
});

describe("validationHelper.isValidPassword", () => {
  it("should be a valid password", () => {
    expect(validationHelper.isValidPassword("")).toBe(false);
    expect(validationHelper.isValidPassword(123)).toBe(false);
    expect(validationHelper.isValidPassword("a")).toBe(false);
    expect(validationHelper.isValidPassword("a".repeat(7))).toBe(false);
    expect(validationHelper.isValidPassword(undefined)).toBe(false);
    expect(validationHelper.isValidPassword(null)).toBe(false);
    expect(validationHelper.isValidPassword("Password123")).toBe(false);

    expect(validationHelper.isValidPassword("Password123!@")).toBe(true);
  });
});

describe("validationHelper.validateLoginUserData", () => {
  it("should have email and password params and be valid properties", () => {
    expect(
      validationHelper.validateLoginUserData({
        email: "",
      })
    ).toBe(false);

    expect(
      validationHelper.validateLoginUserData({
        email: "",
        password: "",
      })
    ).toBe(false);

    expect(
      validationHelper.validateLoginUserData({
        email: 1,
        password: 1234,
      })
    ).toBe(false);

    expect(
      validationHelper.validateLoginUserData({
        email: "john.doe@example.com",
        password: "password",
      })
    ).toBe(true);
  });
});
