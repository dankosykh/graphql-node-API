// const auth = require("./auth");
const { db, UserModel } = require("./db");

const resolvers = {
  Query: {
    user: (_, { username }, context) => {
      return UserModel.fimdOneUser(db, username);
    },
  },
  // Mutation: {
  //   signUp(_ , {input},
  // },
};

module.exports = resolvers;
