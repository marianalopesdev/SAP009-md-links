const linkStats = require("./linkStats");
const fileReader = require("./fileReader");
const errorHandling = require("./errorHandling");
const linkExtractor = require("./linkExtractor");
const validateLinks = require("./validateLink");
const chalk = require("chalk");
const path = require("path");
const { table } = require("console");

module.exports = function mdLinks(typedPath, option) {
  const {validate, stats} = option;
  const filePath = typedPath;
  const fileName = path.basename(filePath);


const lala = (fileContents) => {

  

//  console.log(obj);
  if (!validate && !stats) {
    const {obj} = linkExtractor(fileContents);
  } 
  else if (validate && !stats) {
    console.log('bozo preso')
    const {obj} = linkExtractor(fileContents, validate);
  }

}



// if (!opt.validate && !opt.stats) {
    fileReader(filePath)
      .then((fileContents) => {
        lala(fileContents);
        // let { table } = linkExtractor(fileContents);
        // console.log(`The file ${fileName} contains ${table.length - 1} links.`);
        // console.log(table.toString());
      })
      .catch((error) => {
        const error1 = new Error('hshs');
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
