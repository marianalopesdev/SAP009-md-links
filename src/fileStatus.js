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
  const fileName = path.basename(filePath);
  const { validate, stats } = option;
  console.log("wait a second...");

  const getSpecificContent = (fileContents, element) => {
     console.log(element);
    linkExtractor(fileContents).then((links) => {
      // console.log("links");
const a = element;
      // console.log(links);
      console.log(`The file ${a} has ${links.length} links.`);
      const dataLinks = links;
      const onlyLinksArray = dataLinks.map((link) => link.link);

      if (!validate && !stats) {
        prinTable(dataLinks, filePath, "simple");
      } else if (validate && !stats) {
        validateLinks(onlyLinksArray).then((validatedLinks) => {
          console.log(validatedLinks);
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
    });
  };

  fileReader(filePath)
    .then((fileContents) => {
      // console.log(" do filereader em filestatus");
      // console.log(filePath);
      getSpecificContent(fileContents, fileName);
    })
    .catch((error) => {
      if ((error.code = "EISDIR")) {
        console.log("eisdir");

        dirReader(filePath)
          .then((dirContent) => {
            // console.log(" dentro do dirReader dentro do filereader");
            // console.log(dirContent);
            // console.log(" dfilepath do direreader");
            // console.log(filePath);
            dirContent.forEach((element) => {
              // console.log("element do foreach");
              // console.log(element);

              fileReader(filePath + "/" + element)
              .then((fileContent) => {
                // console.log("links");
                // console.log(fileContent.toString());
                getSpecificContent(fileContent, element);
              })
              .catch((error) => {
                //console.log(error);
                const errorCode = error;
                errorHandling(errorCode);
              });
              console.log("a");
            });
            // console.log(fileContents);
          })
          .catch((error) => {
            //console.log(error);
            const errorCode = error;
            errorHandling(errorCode);
          });
        return;
      }
    });
};
