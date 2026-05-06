const db = require("../config/db");
const LocalStrategy = require("passport-local").Strategy;

const verify = async (username, password, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (user.password !== password) {
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
}

module.exports = configurePassport;
