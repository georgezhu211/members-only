const db = require("../../config/db");

exports.create = async ({ username, hashedPassword, firstName, lastName }) => {
  const { rows } = await db.query(
    "INSERT INTO users (username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, hashedPassword, firstName, lastName]
  );

  return rows[0];
};
