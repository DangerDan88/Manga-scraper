//import axios from "axios";
//import * as cheerio from "cheerio";
const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}/`);
});
