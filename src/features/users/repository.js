const db = require("../../config/db");

exports.create = async ({ username, hashedPassword, firstName, lastName }) => {
  const { rows } = await db.query(
    "INSERT INTO users (username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, hashedPassword, firstName, lastName]
  );

  return rows[0];
};

exports.findByUsername = async (username) => {
  const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows[0];
};

exports.findById = async (id) => {
  const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  return rows[0];
};

exports.joinTheClub = async (userId) => {
  await db.query("UPDATE users SET is_member = TRUE WHERE id = $1", [userId]);
};
