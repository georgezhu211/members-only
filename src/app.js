const express = require("express");
const layouts = require("express-ejs-layouts");
const configurePassport = require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const path = require("node:path");
const Store = require("connect-pg-simple")(session);
const db = require("./config/db");

const homeRoutes = require("./features/home/routes");
const authRoutes = require("./features/auth/routes");
const messageRoutes = require("./features/messages/routes");
const userRoutes = require("./features/users/routes");

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
  }),
);
app.use(passport.session());
configurePassport(passport);

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const message = err.statusCode ? err.message : "Internal server error";
  res.status(err.statusCode || 500).send(message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
