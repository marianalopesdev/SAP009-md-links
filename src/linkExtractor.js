const Table = require("cli-table");
const errorHandling = require("./errorHandling");
//se eu usar a flag, posso montar as 3 table no link extractor
//o validate pode funcionar aqui table//inclusive faz mais sentido
//o stats tb
//faz bem mais sentido
//o if else ficaria aquit b
//retornaria o obj links validados, stats de links e etc

//momento2
//criei um objeto, jogeui ele na tabela
//tudo ok

//continuar daí
//no momento filestatus nao tah fazedno if
//trocar nomes variaveis



module.exports = function linkExtractor(fileContents, flag) {
  const httpLinksRegex = /(https?:\/\/\S+(?=\b))/gm;
  const linkTextRegex = /\[(.*)\]/gm;
  const links = fileContents.toString().match(httpLinksRegex);
  const linkTexts = fileContents.toString().match(linkTextRegex);
  const linkTextsWithoutBrackets = linkTexts.map((linkText) =>
    linkText.replace(/\[|\]/g, "")
  );

 // console.log(links);
  if (links === null) {
    const error = new Error('No links in the file');
    error.code = "NO_LINKS";
    return errorHandling(error.code);
  }

  let table = new Table({
    head: ["Link", "Text", "FilePath"],
    colWidths: [50, 40, 50],
  });

  for (let i = 0; i <= links.length - 1; i++) {
   // table.push([links[i], linkTextsWithoutBrackets[i], "filePath"]);
   const  obj = {
      link: links[i],
      text: linkTextsWithoutBrackets[i], 
      path: 'path'
    };
    table.push([obj.link, obj.text, obj.path]);
   console.log(obj);
 
  }
  console.log(table.toString());
  return table;


  
};
