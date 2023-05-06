const Table = require("cli-table");
const errorHandling = require("./errorHandling");
const validateLink = require("./validateLink");
//se eu usar a flag, posso montar as 3 table no link extractor
//o validate pode chamar daqui
//table//inclusive faz mais sentido
//o stats tb
//faz bem mais sentido
//o if else ficaria aquit b
//retornaria o obj links validados, stats de links e etc

//momento2
//OKcriei um objeto, jogeui ele na tabela
//tudo ok

//continuar daí
//no momento filestatus nao tah fazedno if
//trocar nomes variaveis

//OKtraformar em promiseeeee
//vai solve erro no files with files
module.exports = function linkExtractor(fileContents, flag) {
  return new Promise((resolve, reject) => {
    const httpLinksRegex = /(https?:\/\/\S+(?=\b))/gm;
    const linkTextRegex = /\[(.*)\]/gm;
    const links = fileContents.toString().match(httpLinksRegex);
    if (links === null) {
      const error = new Error("No links in the file");
      error.code = "NO_LINKS";
      return errorHandling(error.code);
    }
    const linkTexts = fileContents.toString().match(linkTextRegex);
    console.log(links);
    resolve(links);

    const linkTextsWithoutBrackets = linkTexts.map((linkText) =>
      linkText.replace(/\[|\]/g, "")
    );

    //   console.log(flag);
    //   console.log(links)
    //   console.log('fregui');
    //   validateLink(links)
    //     .then((table) => {
    //   console.log(table);
    //    //   console.log(tablea);

    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });

    // else {
    //

    const linksResult = [];

    // links.map
    let table = new Table({
      head: ["Link", "HTTP Status"],
      colWidths: [50, 60, 50],
    });

    for (let i = 0; i <= links.length - 1; i++) {
      const obj = {
        link: links[i],
        text: linkTextsWithoutBrackets[i],
        path: "path",
      };
      table.push([obj.link, obj.text, obj.path]);
      linksResult.push([obj.link, obj.text, obj.path]);
     
     
      // }
    }

    if (flag === undefined) {
      console.log("oi5");    
     console.log(table.toString());
    } else {
    //  console.log(linksResult);
      //
      return links;
      //
    }
  });
};
