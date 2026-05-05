const express = require("express");
const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello, world!"));

app.listen(3000);
