const linkStats = require("./linkStats");
const fileReader = require("./fileReader");
const errorHandling = require("./errorHandling");
const linkExtractor = require("./linkExtractor");
const validateLinks = require("./validateLink");
const prinTable = require("./printTable");
const path = require("path");
const Table = require("cli-table");

module.exports = function mdLinks(typedPath, option) {
  const filePath = typedPath;
//  console.log(typedPath);
  const fileName = path.basename(filePath);
  const { validate, stats } = option;
  console.log("wait a second...");

  const getSpecificContent = (fileContents) => {
    console.log(fileContents);
    linkExtractor(fileContents).then((links) => {
    //  console.log(links);
      const dataLinks = links;
      const onlyLinksArray = dataLinks.map((link) => link.link);

      if (!validate && !stats) {
        prinTable(dataLinks, filePath, "simple");
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
    });
  };

  fileReader(filePath)
    .then((fileContents) => {
      getSpecificContent(fileContents);
      console.log(fileContents);
      // let { table } = linkExtractor(fileContents);
      // console.log(`The file ${fileName} contains ${table.length - 1} links.`);
      // console.log(table.toString());
    })
    .catch((error) => {
     //
     const errorCode = error;
     errorHandling(errorCode);
      // const error1 = new Error("hshs");
      // error1.code = "NO_LINKS";
      // errorHandling(error1.code);
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

  // if ("validate" in option && !("stats" in option)) {

  //   //console.log(links);
  //   // let table = new Table({
  //   //   head: ["Link", "Text", "FilePath"],
  //   //   colWidths: [50, 40, 50],
  //   // });
  //   // validateLinks(links)
  //   //   .then((table) => {
  //   //     console.log('val')
  //   // console.log(table);
  //   //  //   console.log(tablea);

  //   //   })
  //   //   .catch((error) => {
  //   //     reject(error);
  //   //   });
  // } else {
  //   //console.log(result);
  //  // linkExtractor(fileContents);
  // }

  // if (!opt.validate && !opt.stats) {

  // } else if (opt.validate && !opt.stats) {
  //   fileReader(filePath)
  //     .then((fileContents) => {
  //       let { links } = linkExtractor(fileContents);
  //       validateLinks(links)
  //         .then((table) => {
  //           console.log(table.toString());
  //         })
  //         .catch((error) => {
  //           errorHandling(error.code);
  //         });
  //     })
  //     .catch((error) => {
  //       errorHandling(error.code);
  //     });
  // } else if (!opt.validate && opt.stats) {
  //   fileReader(filePath)
  //     .then((fileContents) => {
  //       let { links } = linkExtractor(fileContents);
  //       linkStats(links);
  //     })
  //     .catch((error) => {
  //       errorHandling(error.code);
  //     });
  // } else {
  //   fileReader(filePath)
  //     .then((fileContents) => {
  //       let { links } = linkExtractor(fileContents);
  //       let { uniqueLinks } = linkStats(links);
  //       let { brokenLsinks } = validateLinks(uniqueLinks).then((brokenLinks) => {

  //         console.log("Broken Links: " + brokenLsinks);
  //       });
  //     })
  //     .catch((error) => {
  //       errorHandling(error.code);
  //     });
  // }
};
