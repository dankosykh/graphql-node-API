const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    createdAt: String!
    email: String!
    username: String!
    # salt: String!
    # password: String!
  }

  type AuthUser {
    user: User!
    token: String!
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
    posts: [Post]!
    post(id: ID!): Post!
  }

  type Mutation {
    signUp: AuthUser
    signIn(email: String!, password: String!): AuthUser
  }
`;

module.exports = typeDefs;
