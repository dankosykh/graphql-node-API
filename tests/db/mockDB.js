const { Pool } = require("pg");
const { UserModel, PostModel } = require("../../src/db");

const mockDB = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGMOCKDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = { mockDB, UserModel, PostModel };
