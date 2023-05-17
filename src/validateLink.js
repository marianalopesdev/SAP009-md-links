const https = require("https");
const showHttpStatusMessages = require("./httpStatusMessages");

module.exports = function validateLinks(links) {
  const linksResult = [];

  return Promise.all(
    links.map(
      (link) =>
        new Promise((resolve, reject) => {
          const linkObject = {
            link: link,
            status: "",
            text: "",
            path: "",
          };
          https
            .get(link, (response) => {
              response.setEncoding("utf8");
              const { messageStatus, statusCode } = showHttpStatusMessages(
                response.statusCode
              );
              linkObject.status = messageStatus;
              linkObject.text = statusCode;
              linksResult.push(linkObject);
              resolve();
            })
            .on("error", (error) => {
              if (
                error.code === "ERR_TLS_CERT_ALTNAME_INVALID" ||
                error.code === "ENOTFOUND"
              ) {
                const { messageStatus, statusCode } = showHttpStatusMessages(
                  error.code
                );
                linkObject.status = messageStatus;
                linkObject.text = statusCode;
                linksResult.push(linkObject);
                resolve();
              } else {
                reject(error);
              }
            });
        })
    )
  ).then(() => linksResult);
};
