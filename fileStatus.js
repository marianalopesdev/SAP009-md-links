let https = require("https");
const fs = require("fs");

module.exports = function printMsg() {
  const file = process.argv[2];

  fs.readFile(file, function (err, contents) {
    if (err) {
      return console.log(err);
    }

    console.log(`The file name entered at the prompt is ${file}`);
  });
};
