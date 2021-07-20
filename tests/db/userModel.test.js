require("dotenv").config();

const { mockDB, UserModel } = require("./mockDB");

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

    test("it should update a field", () => {
      let username = "TEST_TEST";
      let email = "editting@test.com";
      return UserModel.editEmail(mockDB, { username, email })
        .then(() => UserModel.fimdOneUser(mockDB, username))
        .then((data) => {
          expect(data.email).toBe(email);
        });
    });

    test("it should delete a user", () => {
      let username = "TEST_TEST";
      let email = "editting@test.com";
      return UserModel.deleteOne(mockDB, { username })
        .then(() => UserModel.fimdOneUser(mockDB, username))
        .then((data) => expect(data).toBeUndefined())
        .catch((e) => {
          throw new Error("should not be in catch block");
        });
    });
  } catch (e) {
    throw new Error("Failed in catch of Try / Catch");
  }
});

describe("should exit the pool", () => {
  test("close connection", () => {
    mockDB
      .end()
      .then(() => expect(1 + 1).toBe(2))
      .catch(() => {
        throw new Error("error in closing the db pool");
      });
  });
});
