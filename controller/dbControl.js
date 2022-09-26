const cheerio = require("cheerio");
const express = require("express");
const app = express();
const axios = require("axios");
const db = require("../models/index");

// re did it to not use Es6 imports was giving me huge trouble with the mongoose imports now I have insert is not a function error seems to have same error here
app.get("/", (req, res) => {
  //Serves the body of the page aka "home.handlebars to the container //aka ""main.handlebars"
  // seems we need to send the data over in an object then loop those to get these to render got normal array object to render items
  res.render("home");
});

// url we are scraping is here
app.get("/scrape", (req, res) => {
  let url =
    "https://www.barnesandnoble.com/b/viz-media/_/N-1p70?Ns=P_Publication_Date%7C1";

  axios(url).then((response) => {
    const $ = cheerio.load(response.data);
    // console.log($);
    $(".product-shelf-title").each(function (i, element) {
      const result = {};
      // This pulls in the title and link for the books we are scraping
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      db.Manga.insertMany(result)
        .then(function (dbBook) {
          // View the added result in the console
          // console.log(dbBook);
          // this does seem to loop the objects right now need to see if we can display to page
          for (let i = 0; i < dbBook.length; i++) {
            console.log(dbBook[i]);
          }
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    res.redirect("/");
  });
});

app.get("/books", function (req, res) {
  // Grab every document in the Books collection
  db.Manga.find({})
    .then(function (result) {
      // If we were able to successfully find books, send them back to the client
      // console.log(result);
      // result.forEach((books) => console.log(books.title));
      result.forEach(function (books) {
        console.log(books.title);
      });
      res.render("home", { books: result.title });
      // this loops thru array and displays each object now need to display to page after the loop
      // this works to send one book need to it to look nicer when displaying
    })
    .catch(function (err) {
      // res.json(err);
    });
});

module.exports = app;
