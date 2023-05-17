const linkStats = require("./linkStats");
const fileReader = require("./fileReader");
const errorHandling = require("./errorHandling");
const linkExtractor = require("./linkExtractor");
const validateLinks = require("./validateLink");
const prinTable = require("./printTable");
const dirReader = require("./dirReader");
const path = require("path");
const Table = require("cli-table");
const { readFile } = require("fs");

module.exports = function mdLinks(typedPath, option) {
  const filePath = typedPath;
  //  console.log(typedPath);

  const { validate, stats } = option;
  console.log("wait a second...");

  const getSpecificContent = (fileContents, fileLocation) => {
    linkExtractor(fileContents)
      .then((links) => {
        const file = path.basename(fileLocation);

        console.log(`The file ${file} has ${links.length} links.`);
        const dataLinks = links;
        const onlyLinksArray = dataLinks.map((link) => link.link);

        if (!validate && !stats) {
          prinTable(dataLinks, fileLocation, "simple");
        } else if (validate && !stats) {
          validateLinks(onlyLinksArray).then((validatedLinks) => {
            prinTable(validatedLinks, filePath, "validated");
          });
        } else if (!validate && stats) {
          linkStats(onlyLinksArray).then((statsObject) => {
            prinTable(statsObject, "", "stats");
          });
        } else {
          linkStats(onlyLinksArray).then((statsObject) => {
            prinTable(statsObject, "", "statsvalidated");
          });
        }
      })
      .catch((error) => {
        const errorCode = error;

        errorHandling(errorCode, fileLocation);
      });
  };

  function readFiles(filePath) {
    fileReader(filePath)
      .then((fileContents) => {
        getSpecificContent(fileContents, filePath);
      })
      .catch((error) => {
        if (error === "EISDIR") {
          dirReader(filePath)
            .then((dirContent) => {
              dirContent.forEach((element) => {
                const nestedPath = filePath + "/" + element;
                //  console.log(nestedPath);
                readFiles(nestedPath);
              });
            })
            .catch((error) => {
              const errorCode = error;
              errorHandling(errorCode);
            });
        } else {
          const errorCode = error;
          errorHandling(errorCode, path.basename(filePath));
        }
      });
  }

  readFiles(filePath);
};
