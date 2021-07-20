const { Pool } = require("pg");
const UserModel = require("../../src/db/userModel");

const mockDB = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGMOCKDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = { mockDB, UserModel };
