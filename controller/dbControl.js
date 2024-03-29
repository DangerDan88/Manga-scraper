const cheerio = require("cheerio");
const express = require("express");
const app = express();
const axios = require("axios");
const db = require("../models/index");
const path = require("path");

app.use(express.static("public"));

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
      const result = [];
      // This pulls in the title and link for the books we are scraping
      title = $(this).children("a").text();
      link = $(this).children("a").attr("href");
      result.push({
        title,
        link,
      });
      /// need to check for dupes here when inserting into DB

      db.Manga.insertMany(result)
        .then(function (dbBook) {
          // View the added result in the console
          // console.log(dbBook);
          // this does seem to loop the objects right now need to see if we can display to page
          for (let i = 0; i < dbBook.length; i++) {
            //   console.log(dbBook[i]);
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
      result.forEach(function (books) {
        Object.entries(result).forEach(([key, value]) => {
          // console.log(`${key}:  ${value}`);
          while (true) {
            for (let i = 0; i < result.length; i++) {
              console.log(result[3]);
              // this does pull out on result so I can try and destructure it but many tests have left duplicates in my DB need to get those out
              // or write a function that deletes any duplicates.
            }
          }
        });
        // console.log(result._id);
      });
      res.render("home", { books: result });
      // how do we format the json so we can render the book titles easier?
      // this renders the data to the page but just the blob of info need to see how to style it when pulling
      /// need to create a way to clear database as well once we get the info on the page how we want so we do not overload the page
      // this works to send one book need to it to look nicer when displaying
    })
    .catch(function (err) {
      //res.json(err);
    });
});

module.exports = app;
/// do I need to use handlebars?? or can I render with normal js?
