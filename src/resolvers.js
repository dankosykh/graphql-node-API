// const auth = require("./auth");
const { db, UserModel, PostModel, hash } = require("./db");
const { authenticated, generateToken, isUniqueField } = require("./auth");

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
  Mutation: {
    signUp: (_, { input }, context) => {
      let { username, email, password } = input;
      return UserModel.createNewUser(db, { username, email, password })
        .then((data) => {
          const user_id = data.rows[0].user_id;
          return UserModel.fimdOneUser(db, { user_id });
        })
        .then((user) => {
          const token = generateToken(
            { username, user_id },
            process.env.SECRET
          );
          return { ...user, token };
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    signIn: (_, { input }, context) => {
      let { email, password } = input;
      let response = { email };
      return UserModel.fimdOneUser(db, { email })
        .then((user) => {
          response = {
            ...response,
            username: user.username,
            created_at: user.created_at,
            user_id: user.user_id,
          };
          return UserModel.findUserSaltAndHash(db, { user_id: user.user_id });
        })
        .then((data) => {
          const hashedPassword = hash(password, data.salt);
          if (hashedPassword !== data.password_hash) {
            throw new Error("Incorrect password");
          }
          const token = generateToken(
            { username: response.user_id, user_id: response.user_id },
            process.env.SECRET
          );
          return { ...response, token };
        })
        .catch((e) => {
          throw new Error("Sign in Error");
        });
    },
  },
  Post: {
    author: (post, __, { UserModel }) => {
      return UserModel.fimdOneUser(db, { user_id: post.user_id });
    },
  },
};

module.exports = resolvers;
