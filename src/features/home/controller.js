const messageRepository = require("../messages/repository");

exports.index = async (req, res) => {
  const messages = await messageRepository.findAll();
  res.render("home", { messages });
};
