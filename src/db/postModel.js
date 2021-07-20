const PostModel = {
  findPosts: (db, { user_id }) => {
    let sqlOption = "";
    if (user_id) {
      sqlOption += ` WHERE user_id = ${user_id}`;
    }
    const sql = `
      SELECT
        post_id, posted_at, likes, message, user_id
      FROM
        posts
     ${sqlOption}
    `;
    return db
      .query(sql)
      .then((res) => res.rows)
      .catch((e) => console.log(e));
  },

  findOnePost: (db, { post_id }) => {
    const sql = `
      SELECT
        post_id, posted_at, likes, message, user_id
      FROM
        posts
      WHERE
        post_id = $1
    `;
    return db
      .query(sql, [post_id])
      .then((res) => res.rows[0])
      .catch((e) => console.log(e));
  },

  createNewPost: (db, { user_id, message }) => {
    const sql = `
      INSERT INTO
        posts(user_id, message)
      VALUES
        (${user_id}, $1 )
      RETURNING post_id
      `;
    let fields = [message];
    return db
      .query(sql, fields)
      .then((res) => res)
      .catch((e) => console.log(e));
  },

  editMessage: (db, { post_id, message }) => {
    const sql = `
      UPDATE
        posts
      SET
        message = ($1)
      WHERE
        post_id = ($2)
      `;
    let fields = [message, post_id];
    return db
      .query(sql, fields)
      .then((res) => res)
      .catch((e) => console.log(e));
  },

  deleteOne: (db, { post_id }) => {
    const sql = `
      DELETE FROM
        posts
      WHERE
        post_id = ($1)
      `;
    let fields = [post_id];
    return db
      .query(sql, fields)
      .then((res) => res)
      .catch((e) => console.log(e));
  },
};

module.exports = PostModel;
