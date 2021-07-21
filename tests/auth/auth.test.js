const { generateToken, verifyToken } = require("../../src/auth");
var secretKey = "bucksin6";

describe("test jwt functions", () => {
  var testToken;
  let user = {
    user_id: 4,
    username: "DK",
  };

  it("should generate a new jwt token", () => {
    testToken = generateToken(user, secretKey);
    expect(testToken.length).toBeDefined();
    expect(testToken.length).toBeGreaterThan(20);
    expect(typeof testToken).toBe("string");
  });

  it("should be decoded with secret", () => {
    verifyToken(testToken, secretKey)
      .then((decoded) => {
        expect(decoded.user_id).toBe(user.user_id);
        expect(decoded.username).toBe(user.username);
      })
      .catch(() => {
        throw new Error("Did not decode the token");
      });
  });

  it("should not be able to decode expired jwt token", () => {
    testToken = generateToken(user, secretKey, "1s");

    jest.setTimeout(1500);
    verifyToken(testToken, secretKey)
      .then((decoded) => {
        expect(decoded.user_id).toBeFalsey();
        expect(decoded.username).toBeFalsey();
      })
      .catch((e) => {
        throw new Error("Should have passed into then block");
      });
  });
});
