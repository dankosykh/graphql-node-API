const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    user_id: ID!
    created_at: String!
    email: String!
    username: String!
  }

  # type SignUp {
  #   email: String!
  #   password: String!
  # }

  # type AuthUser {
  #   user: User!
  #   token: String!
  # }

  # type Post {
  #   id: ID!
  #   createdAt: String!
  #   author: User!
  #   likes: Int!
  #   message: String!
  # }

  type Query {
    user(username: String!): User!
    # posts: [Post]!
    # post(id: ID!): Post!
  }

  # type Mutation {
  #   signUp: AuthUser
  #   # signIn(email: String!, password: String!): AuthUser
  # }
`;

module.exports = typeDefs;
