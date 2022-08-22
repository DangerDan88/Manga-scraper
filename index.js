import axios from "axios";
import * as cheerio from "cheerio";
// had to switch to node for no Cors error got data to come thru need to try it on book sites
const url = "https://www.nfl.com/stats/player-stats/";
axios(url)
  .then((response) => {
    const data = response.data;
    const $ = cheerio.load(data);
    let test = $`(<p>  </p>)`;
    test.innerHtml = data;
    console.log(data);
  })
  .catch(console.error);
console.log("linked");
