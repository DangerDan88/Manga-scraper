import * as cheerio from "cheerio";
import express from "express";
const app = express();
import axios from "axios";
import db from "../models/Books.js";
// this import seems to be giving me trouble the orginal way we exported from the models folder this import worked to get db in but insertmany breaks
console.log(db);

app.get("/", (req, res) => {
  //Serves the body of the page aka "home.handlebars to the container //aka ""main.handlebars"
  // seems we need to send the data over in an object then loop those to get these to render got normal array object to render items
  res.render("home");
});

// url we are scraping is here
app.get("/scrape", (req, res) => {
  let url = "https://www.barnesandnoble.com/b/viz-media/_/N-1p70";

  axios(url).then((response) => {
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
      db.Books.insertMany(result)
        .then(function (dbBook) {
          // View the added result in the console
          console.log(dbBook);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    res.redirect("/");
  });
});
/// Look at google book api to see how we pulled those books and images from the DB
export default app;
