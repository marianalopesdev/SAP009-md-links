let https = require("https");
const Table = require("cli-table");
const showHttpStatusMessages = require("./httpStatusMessages");

module.exports = function validateLinks(links) {
  return new Promise((resolve, reject) => {
    let table = new Table({
      head: ["Link", "HTTP Status"],
      colWidths: [50, 60, 50],
    });
    console.log(links.links);
    let counter = 0;
    let brokenLinks = 0;
    console.log('dssssff');
    for (let i = 0; i <= links.length - 1; i++) {
      https.get(links[i], (response) => {
        response.setEncoding("utf8");
        response.on("error", reject);
        console.log('dsssssssssssssssssssssff');
        const httpStatusMessage = showHttpStatusMessages(response.statusCode);
        table.push([links[i], httpStatusMessage, "me loco"]);
        console.log('dssssff');
        counter++;
        if (counter === links.length - 1) {
          console.log('dff');
          resolve(table.toString());
        }
      });
    }
  });
};
