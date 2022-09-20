const mongoose = require("mongoose");
const express = require("express");
const PORT = 3000;
const app = express();
const { engine } = require("express-handlebars");

mongoose.connect("mongodb://127.0.0.1/manga", {
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

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
