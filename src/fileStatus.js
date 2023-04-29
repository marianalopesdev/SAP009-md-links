const linkStats = require("./linkStats");
const fileReader = require("./fileReader");
const errorHandling = require("./errorHandling");
const linkExtractor = require("./linkExtractor");
const validateLinks = require("./validateLink");
const chalk = require("chalk");
const path = require("path");

module.exports = function mdLinks(typedPath, option) {
  const opt = option;
  const filePath = typedPath;
  const fileName = path.basename(filePath);

  if (!opt) {
    fileReader(filePath)
      .then((fileContents) => {
        let { table } = linkExtractor(fileContents);
        console.log(`The file ${fileName} contains ${table.length - 1} links.`);
        console.log(table.toString());
      })
      .catch((error) => {
        errorHandling(error.code);
        // readDir(filePath)
        //   .then((dirContent) => {
        //     console.log(dirContent);
        //   })
        //   .catch((error) => {
        //     const errorMessage = error.message;
        //     //  console.log(errorMessage);
        //     errorHandling(error.code);
        //   });
      });
  } else if (opt.validate && !opt.stats) {
    fileReader(filePath)
      .then((fileContents) => {
        let { links } = linkExtractor(fileContents);
        validateLinks(links)
          .then((table) => {
            console.log(table.toString());
          })
          .catch((error) => {
            errorHandling(error.code);
          });
      })
      .catch((error) => {
        errorHandling(error.code);
      });
  } else if (!opt.validate && opt.stats) {
    fileReader(filePath)
      .then((fileContents) => {
        let { links } = linkExtractor(fileContents);
        linkStats(links);
      })
      .catch((error) => {
        errorHandling(error.code);
      });
  } else {
    fileReader(filePath)
      .then((fileContents) => {
        let { links } = linkExtractor(fileContents);
        let { uniqueLinks } = linkStats(links);
        let { brokenLinks } = validateLinks(uniqueLinks).then((broken) => {
          
          console.log("Broken Links: " + broken);
        });
      })
      .catch((error) => {
        errorHandling(error.code);
      });
  }
};
