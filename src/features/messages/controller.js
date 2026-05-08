const messageRepository = require("./repository");
const NotFoundError = require("../../errors/NotFoundError");
const ForbiddenError = require("../../errors/ForbiddenError");
const { validationResult, matchedData } = require("express-validator");

exports.index = async (req, res) => {
  const messages = await messageRepository.findByUserId(req.user.id);
  res.render("messages/index", { messages });
};

exports.new = async (req, res) => {
  res.render("messages/new");
};

exports.create = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("messages/new", {
      errors: result.array(),
    });
  }

  const { title, content } = matchedData(req);
  await messageRepository.create({ userId: req.user.id, title, content });
  res.redirect("/messages");
};

exports.show = async (req, res) => {
  const message = await getMessageOrThrow(req.params.id);
  assertCanModifyMessage(req.user, message);

  res.render("messages/show", { message });
};

exports.edit = async (req, res) => {
  const message = await getMessageOrThrow(req.params.id);
  assertCanModifyMessage(req.user, message);

  res.render("messages/edit", { message });
};

exports.update = async (req, res) => {
  const message = await getMessageOrThrow(req.params.id);
  assertCanModifyMessage(req.user, message);

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("messages/edit", {
      errors: result.array(),
      message,
    });
  }

  const { title, content } = matchedData(req);
  await messageRepository.update(req.params.id, { title, content });
  res.redirect("/messages");
};

exports.delete = async (req, res) => {
  const message = await getMessageOrThrow(req.params.id);
  assertCanModifyMessage(req.user, message);

  await messageRepository.delete(req.params.id);
  res.redirect("/messages");
};

async function getMessageOrThrow(id) {
  const message = await messageRepository.findById(id);
  if (!message) throw new NotFoundError("Message not found");
  return message;
}

function assertCanModifyMessage(user, message) {
  if (user.is_admin) return;
  if (message.user_id !== user.id) throw new ForbiddenError();
}
