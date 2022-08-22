import axios from "axios";
import * as cheerio from "cheerio";
// cross scripting error when trying to pull from barnes and noble?
const url = "https://www.nfl.com/stats/player-stats/category/rushing/2020";
axios(url)
  .then((response) => {
    const data = response.data;
    const $ = cheerio.load(data);
    console.log(data);
  })
  .catch(console.error);
console.log("linked");
