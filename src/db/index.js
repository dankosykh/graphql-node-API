const { Pool } = require("pg");
const UserModel = require("./userModel");
const PostModel = require("./postModel");
const { hash } = require("./crypto");

const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = { db, UserModel, PostModel, hash };
