const fetch = require("node-fetch");

module.exports = function linkExtractor(links) {
  let verifiedLinks = links.length;
  let uniqueLinks = [...new Set(links)];
  let uniqueLinksLength = uniqueLinks.length;
  let brokenLinks = 0;

  return Promise.all(
    uniqueLinks.map((link) =>
      fetch(link)
        .then((response) => {
          const linkObject = {
            link,
            status: response.status,
            ok: response.ok,
          };
        })
        .catch((error) => {
          brokenLinks++;

          // console.log({
          //   link,
          //   ok: false,
          //   status: showHttpStatusMessages(error.code),
          // });
        })
    )
  ).then(() => {
    return { brokenLinks, uniqueLinksLength, verifiedLinks };
  });
};

