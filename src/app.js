const express = require("express");
const layouts = require("express-ejs-layouts");
const configurePassport = require("./config/passport");
const passport = require("passport");
const path = require("node:path");

const authRoutes = require("./features/auth/routes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.urlencoded({ extended: false }));

configurePassport(passport);

app.get("/", (req, res) => res.render("home"));

app.use("/auth", authRoutes);

app.listen(3000);
