const db = require("../config/db");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const verify = async (username, password, done) => {
  try {
    const {
      rows: [user],
    } = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);

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
      const {
        rows: [user],
      } = await db.query("SELECT * FROM users WHERE id = $1", [id]);

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = configurePassport;
