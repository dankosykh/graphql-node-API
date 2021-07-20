const resolvers = {
  Query: {
    users: (_, __, { user }) => [user],
  },
  Mutation: {},
};

module.exports = resolvers;
