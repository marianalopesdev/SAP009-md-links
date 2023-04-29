const fs = require("fs");
const path = require("path");

module.exports = function fileReader(filePath) {
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileExtension = path.extname(filePath);

      fs.readFile(file, (err, fileContents) => {
        if (err) {
          reject(err);
        }
        if (fileExtension !== ".md") {
          const error = new Error("Arquivo não tem a extensão .md");
          error.code = "INVALID_EXTENSION";
          reject(error);
        }
        resolve(fileContents);
      });
    });
  };

  return readFile(filePath);
};
