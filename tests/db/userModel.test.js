require("dotenv").config();

const { mockDB, UserModel } = require("./mockDB");

describe("test user model queries", () => {
  try {
    test("it should find a user by user id from the db", () => {
      let user_id = 2;
      let expected = "Gary";
      return UserModel.fimdOneUser(mockDB, { user_id }).then((data) => {
        expect(data.user_id).toBe(user_id);
        expect(data.username).toBe(expected);
      });
    });

    test("it should find a user by username from the db", () => {
      let username = "DK";
      return UserModel.fimdOneUser(mockDB, { username }).then((data) => {
        expect(data.user_id).toBe(1);
        expect(data.username).toBe(username);
      });
    });

    test("it should find a user by email from the db", () => {
      let email = "dk@gmail.com";
      let username = "DK";
      return UserModel.fimdOneUser(mockDB, { email }).then((data) => {
        expect(data.user_id).toBe(1);
        expect(data.username).toBe(username);
      });
    });

    test("it should create a new user given username, email, and a password", () => {
      let username = "TEST_TEST";
      let email = "test@test.com";
      let password = "test";
      return UserModel.createNewUser(mockDB, { username, email, password })
        .then((data) =>
          UserModel.fimdOneUser(mockDB, { user_id: data.rows[0].user_id })
        )
        .then((data) => {
          expect(data.username).toBe(username);
        });
    });

    test("it should update a field", () => {
      let username = "TEST_TEST";
      let email = "editting@test.com";
      return UserModel.editEmail(mockDB, { username, email })
        .then(() => UserModel.fimdOneUser(mockDB, { username }))
        .then((data) => {
          expect(data.email).toBe(email);
        });
    });

    test("it should delete a user", () => {
      let username = "TEST_TEST";
      let email = "editting@test.com";
      return UserModel.deleteOne(mockDB, { username })
        .then(() => UserModel.fimdOneUser(mockDB, { username }))
        .then((data) => expect(data).toBeUndefined())
        .catch((e) => {
          throw new Error("should not be in catch block");
        });
    });

    test("it should find the salt of a user", () => {
      let user_id = 2;
      let expected = "kosherSalt";
      return UserModel.findUserSaltAndHash(mockDB, { user_id })
        .then((data) => {
          expect(data.salt).toBe(expected);
        })
        .catch((e) => {
          throw new Error("salt not found");
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
