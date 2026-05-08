const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const userRepository = require("../features/users/repository");

const verify = async (username, password, done) => {
  try {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

function configurePassport(passport) {
  passport.use(new LocalStrategy(verify));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userRepository.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = configurePassport;
