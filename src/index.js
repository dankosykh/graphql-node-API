require("dotenv").config();
const db = require("./db");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const auth = require("./auth");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

const PORT = 3000; // env

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return new Promise((resolve, reject) => {
      const context = { ...db, ...req };
      const token = req.headers.authorization;
      auth
        .getUserContent(token, process.env.SECRET, db.db)
        .then((data) => resolve({ ...context, ...data }))
        .catch((e) => reject(e));
    });
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
