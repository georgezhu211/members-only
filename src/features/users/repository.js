const db = require("../../config/db");

exports.create = async ({ username, hashedPassword }) => {
  const { rows } = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );

  return rows[0];
};
