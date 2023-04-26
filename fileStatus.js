
const linkStats = require("./linkStats");
const validateLinks = require("./validateLink");
const errorHandling = require("./errorHandling");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

module.exports = function mdLinks(typedPath, option) {
  const opt = option;
  console.log(opt);

  const filePath = typedPath;
  const dirName = path.dirname(filePath);
  const fileExtension = path.extname(filePath);
  const fileName = path.basename(filePath);

  console.log("dirpath " + dirName);
  console.log("fileName " + fileName);
  console.log("filextension " + fileExtension);
  
  const readDir = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(filePath, (err, dirContent) => {
        if (err) {
          reject(err);
        }
        resolve(dirContent);
      });
    });
  };

  console.log(chalk.blue("Hello world!"));

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, fileContents) => {
        if (err) {
          reject(err);
        }
        resolve(fileContents);
      });
    });
  };

  var Table = require('cli-table');

  const extractedLinks = (fileContents) => {
    const httpLinksRegex = /(https?:\/\/\S+(?=\b))/gm;
    const linkTextRegex = /\[(.*)\]/gm;
    const links = fileContents.toString().match(httpLinksRegex);
    const linkTexts = fileContents.toString().match(linkTextRegex);
    const linkTextsWithoutBrackets = linkTexts.map((linkText) =>
      linkText.replace(/\[|\]/g, "")
    );
    let table = new Table({
      head: ['Link', 'Text', 'FilePath']
    , colWidths: [50, 40, 50]
  });
  
  // table is an Array, so you can `push`, `unshift`, `splice` and friends
 
    for (let i = 0; i <= links.length - 1; i++) {
      // console.log(
      //   `Link: ${links[i]} - Text: ${linkTextsWithoutBrackets[i]} - File Path: ${process.argv[2]}`
      // );
      table.push(
        [links[i], linkTextsWithoutBrackets[i], process.argv[2]]
      , 
    );      
    }
    console.log(table.toString());
    console.log(`The file ${filePath} contains ${links.length - 1} links.`);
  };

  //COMPORTAMENTO
  //SE  EU DIGITO SÓ O DIR, LISTA OS DIR DEPOIS DO ERRO
  //SE EU DIGITO O NOME DO FILE ERRADO, SÓ APARECE O ERRO - UNDEFINED O DIR  //usar a info de dir q tenho lá em cima
  //SE EU DIGITO O FILE CERTO, MOSTRA OS LINKS
  readFile(filePath)
    .then((fileContents) => {
      extractedLinks(fileContents);
    })
    .catch((error) => {
     const errorMessage = error.message;
    // console.log(errorMessage);
      errorHandling(error.code);
      readDir(filePath)
        .then((dirContent) => {
          console.log(dirContent);
        })
        .catch((error) => {
           const errorMessage = error.message;
         //  console.log(errorMessage);
          errorHandling(error.code);
        });
    });
};
