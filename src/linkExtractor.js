const Table = require("cli-table");
const errorHandling = require("./errorHandling");

module.exports = function linkExtractor(fileContents, flag) {
  const httpLinksRegex = /(https?:\/\/\S+(?=\b))/gm;
  const linkTextRegex = /\[(.*)\]/gm;
  const links = fileContents.toString().match(httpLinksRegex);
  const linkTexts = fileContents.toString().match(linkTextRegex);
  const linkTextsWithoutBrackets = linkTexts.map((linkText) =>
    linkText.replace(/\[|\]/g, "")
  );

  if (links === null) {
    const error = new Error();
    error.code = "NO_LINKS";
    return errorHandling(error.code);
  }

  let table = new Table({
    head: ["Link", "Text", "FilePath"],
    colWidths: [50, 40, 50],
  });

  for (let i = 0; i <= links.length - 1; i++) {
    table.push([links[i], linkTextsWithoutBrackets[i], "filePath"]);
  }

  return { links, linkTextsWithoutBrackets, table };
};
