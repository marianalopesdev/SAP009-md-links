const chalk = require("chalk");
const Table = require("cli-table");

module.exports = function prinTable(obj, path, type) {
  const linksObject = obj;
  const tableType = type;

  let table = new Table();
  if (tableType === "validated") {
    table.options.colWidths = [50, 60, 15, 50];
    table.push(["Link", "HttpMessage", "StatusCode", "File Path"]);
    for (let i = 0; i <= obj.length - 1; i++) {
      table.push([
        linksObject[i].link,
        linksObject[i].status,
        linksObject[i].text,
        path,
      ]);
    }
  } else if (tableType === "simple") {
    table.options.colWidths = [50, 60, 50];
    table.push(["Link", "Text", "File Path"]);
    for (let i = 0; i <= obj.length - 1; i++) {
      table.push([linksObject[i].link, linksObject[i].text, path]);
    }
  } else if (tableType === "stats") {
    table.options.colWidths = [15, 15];
    table.push(["All links", "Unique Links"]);
    table.push([linksObject.verifiedLinks, linksObject.uniqueLinksLength]);
  } else {
    table.options.colWidths = [15, 15, 15];
    table.push(["All links", "Unique Links", "Broken Links"]);
    table.push([
      linksObject.verifiedLinks,
      linksObject.uniqueLinksLength,
      linksObject.brokenLinks,
    ]);
  }
  console.log(table.toString());
};
