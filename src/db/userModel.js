const { createSalt, hash } = require("./crypto");

const UserModel = {
  fimdOneUser: (db, username) => {
    const sql = `
      SELECT
        user_id, username
      FROM
        users
      WHERE
        username = $1
    `;
    return db
      .query(sql, [username])
      .then((res) => res.rows[0])
      .catch((e) => console.log(e));
  },
  createNewUser: (db, { username, email, password }) => {
    const salt = createSalt();
    const hashedPassword = hash(password, salt);

    const sql = `
      INSERT INTO
        users(username, email, salt, password_hash)
      VALUES
        ($1, $2, $3, $4)
      `;
    let fields = [username, email, salt, hashedPassword];
    return db
      .query(sql, fields)
      .then((res) => res)
      .catch((e) => console.log(e));
  },
  // editOne: (fields) => {},
  // deleteOne: (fields) => {},
};

module.exports = UserModel;
