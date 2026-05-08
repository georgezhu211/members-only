const messageRepository = require("./repository");
const NotFoundError = require("../../errors/NotFoundError");
const ForbiddenError = require("../../errors/ForbiddenError");

exports.index = async (req, res) => {
  const messages = await messageRepository.findByUserId(req.user.id);
  res.render("messages/index", { messages });
};

exports.new = async (req, res) => {
  res.render("messages/new");
};

exports.create = async (req, res) => {
  const { title, content } = req.body;
  await messageRepository.create({ userId: req.user.id, title, content });
  res.redirect("/messages");
};

exports.show = async (req, res) => {
  const message = await getAuthorizedMessage(req.params.id, req.user.id);

  res.render("messages/show", { message });
};

exports.edit = async (req, res) => {
  const message = await getAuthorizedMessage(req.params.id, req.user.id);

  res.render("messages/edit", { message });
};

exports.update = async (req, res) => {
  await getAuthorizedMessage(req.params.id, req.user.id);

  const { title, content } = req.body;
  await messageRepository.update(req.params.id, { title, content });
  res.redirect("/messages");
};

exports.delete = async (req, res) => {
  await getAuthorizedMessage(req.params.id, req.user.id);

  await messageRepository.delete(req.params.id);
  res.redirect("/messages");
};

async function getAuthorizedMessage(messageId, userId) {
  const message = await messageRepository.findById(messageId);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  if (message.user_id !== userId) {
    throw new ForbiddenError("Access denied");
  }

  return message;
}
