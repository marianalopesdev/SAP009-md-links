let https = require("https");
const Table = require("cli-table");
const showHttpStatusMessages = require("./httpStatusMessages");

module.exports = function validateLinks(links) {
  return new Promise((resolve, reject) => {
    let table = new Table({
      head: ["Link", "HTTP Status"],
      colWidths: [50, 60, 50],
    });

    let counter = 0;
    let brokenLinks = 0;

    for (let i = 0; i <= links.length - 1; i++) {
      https.get(links[i], (response) => {
        response.setEncoding("utf8");
        response.on("error", reject);

        if (response.statusMessage !== "OK" && response.statusMessage !== "") {
          brokenLinks += 1;
        }
        const httpStatusMessage = showHttpStatusMessages(response.statusCode);
        table.push([links[i], httpStatusMessage, "me loco"]);

        counter++;
        if (counter === links.length - 1) {
          resolve(brokenLinks);
        }
      });
    }
  });
};
