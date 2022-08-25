import * as cheerio from "cheerio";
import express from "express";
import axios from "axios";
const PORT = 3000;
import exphbs from "express-handlebars";
//import { engine } from "express-handlebars";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// need to figure out why express handlebars is not working on import
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Make public a static folder
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});
/////////
// getting an error failed to lookup main in views? Need to fix folder structure
let url = "https://www.barnesandnoble.com/b/viz-media/_/N-1p70";
// need to look into options for DB would rather not use mongo or SQL
// need to work to clean up what I scrape once I can get it on the page
axios(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    //console.log($);
    $(".product-shelf-title").each(function (i, element) {
      const result = {};
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      console.log(result);
    });
  })
  .catch((error) => {
    console.error(error);
  });
