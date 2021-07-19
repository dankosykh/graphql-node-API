const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    createdAt: String!
    username: String!
    salt: String!
    email: String!
  }

  type Post {
    id: ID!
    createdAt: String!
    author: User!
    likes: Int!
    message: String!
  }

  type Query {
    users: [User]!
  }
`;

module.exports = typeDefs;
