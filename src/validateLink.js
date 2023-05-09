let https = require("https");
const Table = require("cli-table");
const showHttpStatusMessages = require("./httpStatusMessages");

module.exports = function validateLinks(links) {
  return new Promise((resolve, reject) => {
    // let table = new Table({
    //   head: ["Link", "HTTP Status", "HTTP Status Code", "Path"],
    //   colWidths: [50, 60, 50, 30],
    // });
    // console.log(links);
    let counter = 0;
    let brokenLinks = 0;
    //   console.log('dssssff');
    const linksResult = [];

    // links.map

    for (let i = 0; i <= links.length - 1; i++) {
      https.get(links[i], (response) => {
        response.setEncoding("utf8");
        response.on("error", reject);
        // console.log('dsssssssssssssssssssssff');
        const httpStatusMessage = showHttpStatusMessages(response.statusCode);
        const statusCode = response.statusCode;
       console.log(statusCode);
      
      //           if (statusCode !== 200){
      //  // console.log( 'dif');
      //   brokenLinks++;
      //   console.log(brokenLinks);
      //           }
        const obj = {
          link: links[i],
          status: httpStatusMessage,
          text: statusCode,
          path: "path",
        };
        //  table.push([obj.link, obj.text, obj.path]);
        linksResult.push(obj);

       // table.push([links[i], httpStatusMessage, statusCode, "me loco"]);
        // console.log('dssssff');
        counter++;
        if (counter === links.length) {
          //  console.log('dff');
          resolve(linksResult);
        }
      });
    }
  });
};
