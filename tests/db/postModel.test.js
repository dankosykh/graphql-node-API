require("dotenv").config();

const { mockDB, PostModel } = require("./mockDB");

describe("test post model queries", () => {
  try {
    test("it should find all posts", () => {
      let mockTestMessage = "This is an initial post"; // from mock schema
      return PostModel.findPosts(mockDB, {}).then((data) => {
        expect(data.length).toBe(2);
        expect(data[0].message).toBe(mockTestMessage);
      });
    });

    test("it should find all posts associated with a user id", () => {
      let user_id = 1;
      let mockTestMessage = "This is an initial post"; // from mock schema
      return PostModel.findPosts(mockDB, { user_id }).then((data) => {
        expect(data.length).toBe(1);
        expect(data[0].message).toBe(mockTestMessage);
      });
    });

    test("it should find posts by post_id", () => {
      let post_id = 2;
      let expectedUserId = 2;
      return PostModel.findOnePost(mockDB, { post_id }).then((data) => {
        expect(data.post_id).toBe(post_id);
        expect(data.user_id).toBe(expectedUserId);
      });
    });

    var toDeletePostId = 0;

    test("it should create a new post given a user", () => {
      let user_id = 1;
      let message = "THIS IS A NEW TEST POST!";
      return PostModel.createNewPost(mockDB, { user_id, message })
        .then((data) => {
          toDeletePostId = data.rows[0].post_id;
          return PostModel.findOnePost(mockDB, {
            post_id: toDeletePostId,
          });
        })
        .then((data) => {
          expect(data.user_id).toBe(user_id);
          expect(data.message).toBe(message);
        });
    });

    test("it should update a message", () => {
      let post_id = toDeletePostId;
      let message = "Editted The Message!";
      return PostModel.editMessage(mockDB, { post_id, message })
        .then(() => PostModel.findOnePost(mockDB, { post_id }))
        .then((data) => {
          expect(data.message).toBe(message);
        });
    });

    test("it should delete a post by id", () => {
      return PostModel.deleteOne(mockDB, { post_id: toDeletePostId })
        .then(() => PostModel.findOnePost(mockDB, { post_id: toDeletePostId }))
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
