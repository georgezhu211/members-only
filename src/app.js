const express = require("express");
const layouts = require("express-ejs-layouts");
const configurePassport = require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const path = require("node:path");

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
configurePassport(passport);

// Routes
app.get("/", (req, res) => res.render("home"));

app.use("/auth", authRoutes);

app.listen(3000);
