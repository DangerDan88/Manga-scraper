import mongoose from "mongoose";
import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();
import { engine } from "express-handlebars";
import routes from "./controller/dbControl.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/manga";

mongoose.connect(MONGODB_URI);
// need to figure out the routes issue might need to rename a file to controller to help keep things semi organized
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(routes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
// got the routes to work and import need to figure out why insert many is breaking the scrape function
