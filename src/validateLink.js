const https = require("https");
const showHttpStatusMessages = require("./httpStatusMessages");

module.exports = function validateLinks(links) {
  const linksResult = [];

  return Promise.all(
    links.map((link) =>
      new Promise((resolve, reject) => {
        const obj = {
          link: link,
          status: "",
          text: "",
          path: "path",
        };

        https.get(link, (response) => {
          response.setEncoding("utf8");
          const { messageStatus, codestatus } = showHttpStatusMessages(
            response.statusCode
          );

          obj.status = messageStatus;
          obj.text = codestatus;

          linksResult.push(obj);
          resolve();
        }).on("error", (error) => {
          if (
            error.code === "ERR_TLS_CERT_ALTNAME_INVALID" ||
            error.code === "ENOTFOUND"
          ) {
            const { messageStatus, codestatus } = showHttpStatusMessages(
              error.code
            );
            const statusCode = codestatus;

            obj.status = messageStatus;
            obj.text = statusCode;

            linksResult.push(obj);
            resolve();
          } else {
            reject(error);
          }
        });
      })
    )
  ).then(() => linksResult);
};
