const db = require("../../config/db");

exports.create = async ({ username, password }) => {
  const { rows } = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password]
  );

  return rows[0];
};
