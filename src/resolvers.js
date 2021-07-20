// const auth = require("./auth");
const { models } = require("./db");

const resolvers = {
  Query: {
    user: (_, { id }, { context }) => {
      return models.fimdOneUser(id);
    },
  },
  // Mutation: {
  //   signUp(_ , {input},
  // },
};

module.exports = resolvers;
