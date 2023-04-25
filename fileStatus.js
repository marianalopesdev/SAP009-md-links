const linkStats = require("./linkStats");
const validateLinks = require("./validateLink");
const chalk = require("chalk");
const fs = require("fs");

module.exports = function mdLinks() {
  const file = process.argv[2];

  //MOSTRA TODOS OS ARQUIVOS DO DIRETÓRIO - AINDA NÃO ENTENDI SE VAI PRECISAR
  const dir = fs.readdir(file, (err, contents) => {
    if (err) {
      console.log(err);
    }    
    console.log(contents);
  });

  console.log(chalk.blue("Hello world!"));

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, contents) => {
        if (err) {
          reject(err);
        }
        resolve(contents);
      });
    });
  };

  const extractedLinks = (contents) => {
    const linksRegex = /(https?:\/\/\S+(?=\b))/gm;
    const linkTextRegex = /\[(.*)\]/gm;
    const links = contents.toString().match(linksRegex);
    const linkTexts = contents.toString().match(linkTextRegex);
    const linkTextsWithoutBrackets = linkTexts.map((linkText) =>
      linkText.replace(/\[|\]/g, "")
    );
    for (let i = 0; i <= links.length - 1; i++) {
      console.log(
        `Link: ${links[i]} - Text: ${linkTextsWithoutBrackets[i]} - File Path: ${process.argv[2]}`
      );
    }
    console.log(`The file ${file} contains ${links.length - 1} links.`);
  };

  readFile(file)
    .then((contents) => {
      extractedLinks(contents);
    })
    .catch((err) => {
      console.log(
        `The file ${file} can't be readed. Check the integrity of the file or the path you typed.`
      );
    });
};
