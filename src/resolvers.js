const resolvers = {
  Query: {
    users: (_, __, { user }) => [user],
  },
};

module.exports = resolvers;
