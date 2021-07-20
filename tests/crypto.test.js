const { createSalt, hash } = require("../src/auth/crypto");

const password = "kitty";
const salt = createSalt();
const hashedPass = hash(password, salt);

describe("salt and hashing functions", () => {
  test("hashing function should be consistent", () => {
    const password2 = hash(password, salt);
    expect(hashedPass).toBe(password2);
  });

  test("should hash different words with different salts", () => {
    const newSalt = createSalt();
    const newHashedPass = hash(password, newSalt);
    expect(newHashedPass).not.toBe(hashedPass);
  });

  test("should not hash different words with different passwords", () => {
    const diffHashPassword = hash("password", salt);
    expect(diffHashPassword).not.toBe(hashedPass);
  });
});
