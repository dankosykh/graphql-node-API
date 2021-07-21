const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    user_id: ID!
    created_at: String!
    email: String!
    username: String!
  }

  type Post {
    post_id: ID!
    posted_at: String!
    author: User!
    likes: Int!
    message: String!
  }

  # ______________________________

  type Query {
    user(username: String!): User!
    userPosts(user_id: Int!): [Post]!
    allPosts: [Post]!
    post(post_id: ID!): Post
  }
  # ______________________________
  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthPayload!
    signIn(input: SignInInput!): AuthPayload!
  }
`;

module.exports = typeDefs;
