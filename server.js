import mongoose from "mongoose";
import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();
import { engine } from "express-handlebars";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/manga";

mongoose.connect(MONGODB_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// need to figure out why express handlebars is not working on import
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
