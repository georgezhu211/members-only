const userRepository = require("../users/repository");
const bcrypt = require("bcryptjs");

exports.createUser = async ({ username, password, firstName, lastName }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.create({
    username,
    hashedPassword,
    firstName,
    lastName,
  });
  return user;
};
