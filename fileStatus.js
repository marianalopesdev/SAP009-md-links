const showHttpStatusMessages = require("./httpStatusMessages");
const chalk = require("chalk");
let https = require("https");
const fs = require("fs");

module.exports = function printMsg() {
  const file = process.argv[2];

  console.log(chalk.blue("Hello world!"));

  fs.readFile(file, function (err, contents) {
    if (err) {
      return console.log(err);
    }

    const linksRegex = /(https?:\/\/\S+(?=\b))/g;

    const links = contents.toString().match(linksRegex);
    for (let i = 0; i <= links.length - 1; i++) {
      let link = links[i];
      // console.log([i] +" "+ link);

      https.get(link, (response) => {
        response.setEncoding("utf8");
        response.on("error", console.error);
        const httpStatusMessage = showHttpStatusMessages(response.statusCode);

        console.log(`Link: ${link} - ${httpStatusMessage}`);
      });
    }

    console.log(`O arquivo ${file} contém ${links.length - 1}links.`);
  });
};
