// const auth = require("./auth");
const { db, UserModel, PostModel } = require("./db");
const { authenticated } = require("./auth");

const resolvers = {
  Query: {
    user: (_, __, { username }) => {
      return authenticated({ username }, () =>
        UserModel.fimdOneUser(db, { username })
      );
    },
    userPosts: (_, { user_id }, { username }) => {
      return authenticated({ username }, () =>
        PostModel.findPosts(db, { user_id })
      );
    },
    allPosts: (_, __, { username }) => {
      return authenticated({ username }, () => PostModel.findPosts(db, {}));
    },
    post: (_, { post_id }, { username }) => {
      return authenticated(
        { username },
        PostModel.findOnePost(db, { post_id })
      );
    },
  },
  // Mutation: {
  //   signUp: (_, { input }, context) => {
  //     // check db if unique fields
  //   },
  // },
  Post: {
    // ddouble check this one
    author: (post, __, { UserModel }) => {
      return UserModel.fimdOneUser(db, { user_id: post.user_id });
    },
  },
};

module.exports = resolvers;
