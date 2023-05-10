const errorHandling = require("./errorHandling");

module.exports = function linkExtractor(fileContents) {
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
    const linkTextsWithoutBrackets = linkTexts.map((linkText) =>
      linkText.replace(/\[|\]/g, "")
    );

    const linksResult = [];
    for (let i = 0; i <= links.length - 1; i++) {
      const linkObject = {
        link: links[i],
        text: linkTextsWithoutBrackets[i],
      };
      linksResult.push(linkObject);
    }
    resolve(linksResult);
    return { links };
  });
};
