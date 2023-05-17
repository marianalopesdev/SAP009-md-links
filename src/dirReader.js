const fs = require("fs");
const path = require("path");
const errorHandling = require("./errorHandling");

module.exports = function dirReader(filePath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, fileContents) => {
      if (err) {
        reject(err);
      }

      // console.log('dentro de dirReader');
      //  console.log(filePath);
      // console.log(fileContents);

      resolve(fileContents);
    });
  });
};
