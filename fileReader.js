
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const Table = require("cli-table");


module.exports = function fileReader(filePath) {
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      console.log('readfile promise')
      const dirName = path.dirname(filePath);
      const fileExtension = path.extname(filePath);
      const fileName = path.basename(filePath);
      const pato = path.resolve(dirName, fileName);
      console.log("caminho - readfilesjs " + pato);
      
      fs.readFile(file, (err, fileContents) => {
        console.log("file " + fileExtension);
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

  console.log("fim-readfiles");

  return readFile(filePath);
};
