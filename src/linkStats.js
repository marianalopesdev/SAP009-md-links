const chalk = require("chalk");
const validateLink = require("./validateLink");

module.exports = function linkStats(links) {
  let verifiedLinks = links.length;
  let uniqueLinks = [...new Set(links)];
  console.log("Total links: " + verifiedLinks);
  console.log("Unique links: " + uniqueLinks.length);
  return { uniqueLinks };
};
