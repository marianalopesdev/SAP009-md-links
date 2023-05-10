const fs = require("fs");
const path = require("path");
const errorHandling = require("./errorHandling");

module.exports = function fileReader(filePath) {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(filePath);

    fs.readFile(filePath, (err, fileContents) => {
      if (err) {
        reject(err.code);
      }
      if (fileExtension !== ".md") {
        const error = new Error("Arquivo não tem a extensão .md");
        error.code = "INVALID_EXTENSION";
        reject(error.code);
      }
      resolve(fileContents.toString());
    });
  });
};
