const messageRepository = require("./repository");
const NotFoundError = require("../../errors/NotFoundError");

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

exports.show = async (req, res) => {
  const message = await messageRepository.findById(req.params.id);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  res.render("messages/show", { message });
};

exports.edit = async (req, res) => {
  const message = await messageRepository.findById(req.params.id);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  res.render("messages/edit", { message });
};
