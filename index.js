//import * as cheerio from "cheerio";
import http from "http";
const PORT = 3000;
import axios from "axios";

let url = "https://www.reddit.com/r/programming.json";

axios(url)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}/`);
});
