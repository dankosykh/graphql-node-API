const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

const PORT = 3000; // env

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
