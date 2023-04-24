
const linkStats = require('./linkStats');
const validateLinks = require('./validateLink');
const chalk = require("chalk");
let https = require("https");
const fs = require("fs");

module.exports = function printMsg() {

  const file = process.argv[2];


  console.log(chalk.blue("Hello world!"));

  fs.readFile(file, function (err, contents) {
    if (err) {
      return console.log(err);
    }

    const linksRegex = /(https?:\/\/\S+(?=\b))/gm;
    const linkTextRegex = /\[(.*)\]/gm;

    const links = contents.toString().match(linksRegex);
    const linkTexts = contents.toString().match(linkTextRegex);
    const linkTextsWithoutBrackets = linkTexts.map(linkText => linkText.replace(/\[|\]/g, ''));
   
    for (let i = 0 ; i <= links.length - 1  ; i++){
      console.log(`Link: ${links[i]} - Text: ${linkTextsWithoutBrackets[i]} - File Path: ${process.argv[2]}`);
    }

  
  //  validateLinks(links);
    // const stats = linkStats(links);
    // console.log(stats);
   
       console.log(`The file ${file} contains ${links.length - 1} links.`);
     //  console.log(links);
  });
};
