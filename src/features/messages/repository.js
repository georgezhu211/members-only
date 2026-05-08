const db = require("../../config/db");

exports.findAll = async () => {
  const { rows } = await db.query("SELECT * FROM messages");
  return rows;
};

exports.findById = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM messages WHERE messages.id = $1",
    [id]
  );
  return rows[0];
};

exports.create = async ({ userId, title, content }) => {
  await db.query(
    "INSERT INTO messages (user_id, title, content) VALUES ($1, $2, $3)",
    [userId, title, content]
  );
};
