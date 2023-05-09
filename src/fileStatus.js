const linkStats = require("./linkStats");
const fileReader = require("./fileReader");
const errorHandling = require("./errorHandling");
const linkExtractor = require("./linkExtractor");
const validateLinks = require("./validateLink");
const prinTable = require("./printTable");
const chalk = require("chalk");
const path = require("path");
const Table = require("cli-table");

module.exports = function mdLinks(typedPath, option) {
  const filePath = typedPath;
  const fileName = path.basename(filePath);
  const { validate, stats } = option;
  console.log(validate);

  const getSpecificContent = (fileContents) => {
    linkExtractor(fileContents).then((links) => {
      const coisas = links;
      const linksArray = coisas.map((obj) => obj.link);
        console.log(coisas);
      let simpleLinksTable = new Table({
        head: ["Link", "Text", "File Path"],
        colWidths: [50, 60, 50],
      });
      if (!("validate" in option) && !("stats" in option)) {
        console.log("no options selected");
       // console.log
        prinTable(links, simpleLinksTable, filePath);
  
      } else if ("validate" in option && !("stats" in option)) {
        validateLinks(linksArray).then((validatedLinks) => {
            console.log(validatedLinks);
          let validatedLinksTable = new Table({
            head: ["Link", "HttpMessage", "StatusCode", "File Path"],
            colWidths: [50, 60, 20, 50],
          });
         
          prinTable(validatedLinks, validatedLinksTable, filePath, "simple");
        });
      } else if (!("validate" in option) && "stats" in option) {
        linkStats(linksArray).then((statsarray) => {
          console.log("stasarray");
          console.log(statsarray.uniqueLinksLength);
          console.log(statsarray.verifiedLinks);
        });
      } else {
        linkStats(linksArray).then((statsarray) => {
          console.log("stasarray");
          console.log(statsarray);
          console.log(statsarray);
        });

        //ir até coisas, testar o status code com if e depois  chamar link stats ou só a resposta dele const a
        console.log("end of specific content");
      }
    });
  };

 

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
  fileReader(filePath)
    .then((fileContents) => {
      getSpecificContent(fileContents);
      // console.log(fileContents);
      // let { table } = linkExtractor(fileContents);
      // console.log(`The file ${fileName} contains ${table.length - 1} links.`);
      // console.log(table.toString());
    })
    .catch((error) => {
      console.log(error);
      const error1 = new Error("hshs");
      error1.code = "NO_LINKS";
      errorHandling(error1.code);
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
