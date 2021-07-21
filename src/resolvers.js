// const auth = require("./auth");
const { db, UserModel, PostModel } = require("./db");

const resolvers = {
  Query: {
    user: (_, { username }, context) => {
      return UserModel.fimdOneUser(db, { username });
    },
    allPosts: (_, __, context) => {
      return PostModel.findPosts(db, {});
    },
    userPosts: (_, { user_id }, context) => {
      return PostModel.findPosts(db, { user_id });
    },
    post: (_, { post_id }, context) => {
      console.log(context);
      return PostModel.findOnePost(db, { post_id });
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
