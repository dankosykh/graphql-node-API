const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
  }

  type Query {
    users: [User]!
  }
`;

module.exports = typeDefs;
