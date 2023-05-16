const fs = require("fs");
const path = require("path");
const errorHandling = require("./errorHandling");


module.exports = function fileReader(filePath) {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(filePath);
   // console.log(filePath);

    fs.readFile(filePath, (err, fileContents) => {
      console.log('readfile');
      console.log(filePath);
      if (err) {
        console.log(err.code);
        return reject(err.code);
        
      }
      if (fileExtension !== ".md") {
        const error = new Error("Arquivo não tem a extensão .md");
        error.code = "INVALID_EXTENSION";
        console.log(path.basename(filePath))
        return reject(error.code);
      }
      resolve(fileContents);
     // console.log(fileContents.toString());
    });
  });
};

