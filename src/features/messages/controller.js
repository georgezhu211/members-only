const messageRepository = require("./repository");

exports.new = async (req, res) => {
  res.render("messages/new");
};

exports.create = async (req, res) => {
  const { title, content } = req.body;
  await messageRepository.create({ userId: req.user.id, title, content });
  res.redirect("/");
};
