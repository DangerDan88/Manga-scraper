import * as cheerio from "cheerio";
import express from "express";
import axios from "axios";
const PORT = 3000;
const app = express();
import { engine } from "express-handlebars";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
// need to figure out why express handlebars is not working on import
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
let books = [
  {
    book: "chainsawman",
  },
  {
    book: "classroom of the elite",
  },
];
app.get("/", (req, res) => {
  //Serves the body of the page aka "home.handlebars to the container //aka ""main.handlebars"
  // seems we need to send the data over in an object then loop those to get these to render got normal array object to render items
  res.render("home", books[0]);
});

// url we are scraping is here
let url = "https://www.barnesandnoble.com/b/viz-media/_/N-1p70";
// need to look into options for DB would rather not use mongo or SQL
// need to work to clean up what I scrape once I can get it on the page
axios(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    //console.log($);
    $(".product-shelf-title").each(function (i, element) {
      const result = [];
      // This pulls in the title and link for the books we are scraping
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      // books.push(result);
      //console.log(books);
      // console.log(result);
    });
  })
  .catch((error) => {
    console.error(error);
  });
