const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const { engine } = require("express-handlebars");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/manga";
// figure out the buffering it seems to want model before connection not sure if DB is even connected

require("./models");
const routes = require("./controller/dbControl.js");
app.use(routes);
// need to figure out the routes issue might need to rename a file to controller to help keep things semi organized
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
