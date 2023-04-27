const chalk = require("chalk");
let https = require("https");
const fs = require("fs");
const Table = require("cli-table");
const validateLinks = require("./validateLink");

module.exports = function linkExtractor(fileContents) {
 

    const httpLinksRegex = /(https?:\/\/\S+(?=\b))/gm;
    const linkTextRegex = /\[(.*)\]/gm;
    const links = fileContents.toString().match(httpLinksRegex);
 //   console.log(links);
    const linkTexts = fileContents.toString().match(linkTextRegex);
 //   console.log(linkTexts);
    const linkTextsWithoutBrackets = linkTexts.map((linkText) =>
      linkText.replace(/\[|\]/g, "")
    );
//    console.log(linkTextsWithoutBrackets);

    let table = new Table({
      head: ["Link", "Text", "FilePath"],
      colWidths: [50, 40, 50],
    });

    for (let i = 0; i <= links.length - 1; i++) {
      table.push([links[i], linkTextsWithoutBrackets[i], 'filePath']);
    }
   console.log(table.toString());
    console.log(`The file contains ${links.length - 1} links.`);
    validateLinks(links);
  
};
