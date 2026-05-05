const userRepository = require("../users/repository");

exports.createUser = async ({ username, password }) => {
  const user = await userRepository.create({ username, password });
  return user;
};
