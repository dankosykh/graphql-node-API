const { createSalt, hash } = require("./crypto");

const UserModel = {
  fimdOneUser: (db, { user_id, username, email }) => {
    let sqlOption = "";
    if (user_id) {
      sqlOption += ` WHERE user_id = ${user_id}`;
    } else if (username) {
      sqlOption += ` WHERE username = '${username}'`;
    } else if (email) {
      sqlOption += ` WHERE email = '${email}'`;
    }
    const sql = `
      SELECT
        user_id, created_at, username, email
      FROM
        users
      ${sqlOption}
    `;
    return db
      .query(sql)
      .then((res) => res.rows[0])
      .catch((e) => console.log("find one", e));
  },

  createNewUser: (db, { username, email, password }) => {
    const salt = createSalt();
    const hashedPassword = hash(password, salt);

    const sql = `
      INSERT INTO
        users(username, email, salt, password_hash)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        user_id
      `;
    let fields = [username, email, salt, hashedPassword];
    return db
      .query(sql, fields)
      .then((res) => res)
      .catch((e) => {
        throw new Error("Duplicate Username or email");
      });
  },

  editEmail: (db, { username, email }) => {
    const sql = `
      UPDATE
        users
      SET
        email = ($1)
      WHERE
        username = ($2)
      `;
    let fields = [email, username];
    return db
      .query(sql, fields)
      .then((res) => res)
      .catch((e) => console.log("edit", e));
  },

  deleteOne: (db, { username }) => {
    const sql = `
      DELETE FROM
        users
      WHERE
        username = ($1)
      `;
    let fields = [username];
    return db
      .query(sql, fields)
      .then((res) => res)
      .catch((e) => console.log("delete", e));
  },

  findUserSaltAndHash: (db, { user_id }) => {
    const sql = `
      SELECT
        salt, password_hash
      FROM
        users
      WHERE
        user_id = $1
      `;
    let fields = [user_id];
    return db
      .query(sql, fields)
      .then((res) => res.rows[0])
      .catch((e) => console.log("delete", e));
  },
};

module.exports = UserModel;
