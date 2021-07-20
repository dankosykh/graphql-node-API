

const models = (table) => {

  const CREATE_FIELDS = table === 'users'
    ? 'username, email, salt, password_hash'
    : 'user_id, message'

  // findAll: (fields) => {
  // },
  // fimdOne: (fields) => {},
  createNewUser: (fields) => {
    let sql = `
      INSERT INTO
        users('username, email, salt, password_hash')
      VALUES
        ($1, $2, $3, $4)
      `;

  },
  // editOne: (fields) => {},
  // deleteOne: (fields) => {},
}

module.exports = models;
