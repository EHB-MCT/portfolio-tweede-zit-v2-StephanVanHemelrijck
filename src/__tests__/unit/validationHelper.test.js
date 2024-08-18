const validationHelper = require("../../helpers/validationHelper");

describe("validationHelper.isString", () => {
  it("should be of type string", () => {
    expect(validationHelper.isString("string")).toBe(true);
  });

  it("should not be of type string", () => {
    expect(validationHelper.isString(123)).toBe(false);
  });
});

describe("validationHelper.isValidId", () => {
  it("should be a valid UUIDv4", () => {
    expect(
      validationHelper.isValidId("59230b3f-8608-4fc3-9f15-c016d1fe632b")
    ).toBe(true);
  });

  it("should not be a valid UUIDv4", () => {
    expect(validationHelper.isValidId("123")).toBe(false);
    expect(validationHelper.isValidId("")).toBe(false);
    expect(validationHelper.isValidId(123)).toBe(false);
    expect(validationHelper.isValidId("abcd-efgh-ijkl-mnop")).toBe(false);
  });
});
