const db = require("../../config/db");

exports.create = async ({ userId, title, content }) => {
  await db.query(
    "INSERT INTO messages (user_id, title, content) VALUES ($1, $2, $3)",
    [userId, title, content]
  );
};
