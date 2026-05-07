const express = require("express");
const layouts = require("express-ejs-layouts");
const configurePassport = require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const path = require("node:path");
const Store = require("connect-pg-simple")(session);
const db = require("./config/db");

const authRoutes = require("./features/auth/routes");

const app = express();

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(layouts);
app.use(express.urlencoded({ extended: false }));

// Session
app.use(
  session({
    store: new Store({
      pool: db,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
configurePassport(passport);

// Routes
app.get("/", (req, res) => {
  const user = req.user;
  res.render("home", { user });
});

app.use("/auth", authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(3000);
