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

  function readFiles(filePath) {
    console.log('bbbb');
    fileReader(filePath)
      .then((fileContents) => {
        getSpecificContent(fileContents, fileName);
      })
      .catch((error) => {
        console.log(error);
        if (error === "EISDIR") {
          console.log('aaaa');
          dirReader(filePath)
            .then((dirContent) => {
              dirContent.forEach((element) => {
                console.log(dirContent);
                const nestedPath = filePath + "/" + element;
               console.log(nestedPath);
                readFiles(nestedPath); 
              });
            })
            .catch((error) => {
              const errorCode = error;
              errorHandling(errorCode);
            });
        } else {
          const errorCode = error;
          errorHandling(errorCode);
        }
      });
  }
  
  readFiles(filePath);

};
