const linkStats = require("./linkStats");
const fileReader = require("./fileReader");

const errorHandling = require("./errorHandling");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const Table = require("cli-table");
const linkExtractor = require("./linkExtractor");

module.exports = function mdLinks(typedPath, option) {
  const opt = option;
  const filePath = typedPath;
  const dirName = path.dirname(filePath);
  const fileExtension = path.extname(filePath);
  const fileName = path.basename(filePath);
  console.log(opt);
  const pato = path.resolve(dirName, fileName);
  console.log("caminnho-mdlinkjs " + pato);

  if (!opt.validate && !opt.stats) {
    fileReader(filePath)
      .then((fileContents) => {
        console.log("chamada");
        //console.log(fileContents);
        linkExtractor(fileContents);
      })
      .catch((error) => {
        // const errorMessage = error.message;
        console.log(error);
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
    console.log("opt zero");

    //O ENCADEAMENTO ESTÁ ERRADO - NAO PODE VALIDAR LINKS DENTRO DO LINK EXTRACTOR
    // DEVOLVER RESULTADO E USAR O THEN
    //CHAMAR VALIDATELINKS
  } else if (opt.validate && !opt.stats) {
    console.log("opt validate");
    fileReader(filePath)
      .then((fileContents) => {
        console.log("chamada");
        //console.log(fileContents);
        linkExtractor(fileContents);
      })
      .catch((error) => {
        // const errorMessage = error.message;
        console.log(error);
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
  }
};
