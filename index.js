import * as cheerio from "cheerio";
import express from "express";
import axios from "axios";
const PORT = 3000;

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
app.get("/", function (req, res) {
  res.send("Hello world!");
});

let url = "https://www.barnesandnoble.com/b/viz-media/_/N-1p70";
// might need to install express here not entirley sure yet
axios(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    console.log($);
    $(".product-shelf-title").each(function (i, element) {
      const result = {};
      result.title = $(this).children("a").text();
      // result.link = $(this).children("a").attr("href");
      console.log(result);
    });
  })
  .catch((error) => {
    console.error(error);
  });
// got some actual data to scrape need to clean up what scrapes then get it on page
