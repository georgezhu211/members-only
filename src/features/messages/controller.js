const messageRepository = require("./repository");

exports.index = async (req, res) => {
  const messages = await messageRepository.findAll();
  res.render("messages/index", { messages });
};

exports.new = async (req, res) => {
  res.render("messages/new");
};

exports.create = async (req, res) => {
  const { title, content } = req.body;
  await messageRepository.create({ userId: req.user.id, title, content });
  res.redirect("/");
};
