const fs = require("fs");
const path = require("path");
const errorHandling = require("./errorHandling");


module.exports = function fileReader(filePath) {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(filePath);
    console.log(filePath);

    fs.readFile(filePath, (err, fileContents) => {
      console.log('readfile');
      console.log(filePath);
      if (err) {
        reject(err.code);
        // if ((err.code = "EISDIR")) {
        //   console.log("eisdir");

        //   dirReader(filePath)
        //     .then((fileContents) => {
        //       //  getSpecificContent(fileContents);
        //       console.log(fileContents);
        //     })
        //     .catch((error) => {
        //       //
        //       const errorCode = error;
        //       errorHandling(errorCode);
        //     });
        //     return;
        // }
      }
      if (fileExtension !== ".md") {
        const error = new Error("Arquivo não tem a extensão .md");
        error.code = "INVALID_EXTENSION";
        return reject(error.code);
      }
      resolve(fileContents);
     // console.log(fileContents.toString());
    });
  });
};
