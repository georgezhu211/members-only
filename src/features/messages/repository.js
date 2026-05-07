const db = require("../../config/db");

exports.findAll = async () => {
  const { rows } = await db.query("SELECT * FROM messages",);
  return rows;
};

exports.create = async ({ userId, title, content }) => {
  await db.query(
    "INSERT INTO messages (user_id, title, content) VALUES ($1, $2, $3)",
    [userId, title, content]
  );
};
