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

  # type AuthPayload {
  #   user: User
  #   token: String
  # }

  type Post {
    post_id: ID!
    posted_at: String!
    author: User!
    likes: Int!
    message: String!
  }

  type Query {
    user(username: String!): User!
    userPosts(user_id: Int!): [Post]!
    allPosts: [Post]!
    post(post_id: ID!): Post
  }

  # type Mutation {
  #   # signUp: AuthUser
  #   # signIn(email: String!, password: String!): AuthUser
  # }
`;

module.exports = typeDefs;
