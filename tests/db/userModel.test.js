require("dotenv").config();

const { UserModel } = require("../../src/db");
const mockDB = require("./mockDB");

describe("test user model queries", () => {
  try {
    test("it should find a user by user id from the db", () => {
      let username = "DK";
      return UserModel.fimdOneUser(mockDB, username).then((data) => {
        expect(data.user_id).toBe(1);
        expect(data.username).toBe("DK");
      });
    });

    test("it should create a new user given username, email, and a password", () => {
      let username = "TEST_TEST";
      let email = "test@test.com";
      let password = "test";
      return UserModel.createNewUser(mockDB, { username, email, password })
        .then(() => UserModel.fimdOneUser(mockDB, username))
        .then((data) => {
          expect(data.username).toBe(username);
        });
    });
  } catch (e) {
    console.log(e);
  }
});

describe("should exit the pool", () => {
  test("close connection", () => {
    mockDB
      .end()
      .then(() => expect(1 + 1).toBe(2))
      .catch(console.log);
  });
});
