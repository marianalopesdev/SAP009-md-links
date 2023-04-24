const chalk = require("chalk");
let https = require("https");
const fs = require("fs");

module.exports = function linkStats(links) {
  let brokenLinks = 0;
  let verifiedLinks = 0;
  let uniqueLinks = 0;

  for (let i = 0; i <= links.length - 1; i++) {
    let link = links[i];

    // console.log([i] +" "+ link);

    https.get(link, (response) => {
      response.setEncoding("utf8");
      response.on("error", console.error);

      //  const httpStatusMessage = showHttpStatusMessages(response.statusCode);
      if (response.statusCode === 301) {
        brokenLinks += 1;
      } else if (response.statusCode === 200) {
        verifiedLinks += 1;
      } else {
        uniqueLinks += 1;
      }
      return console.log(
        `brok: ${brokenLinks} ver: ${verifiedLinks} uniq: ${uniqueLinks} `
      );
    });
  }
};
