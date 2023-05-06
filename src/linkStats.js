const chalk = require("chalk");
const validateLink = require("./validateLink");
let https = require("https");


module.exports = function linkStats(links, flag) {
  let verifiedLinks = links.length;
  let uniqueLinks = [...new Set(links)];
  console.log("Total links: " + verifiedLinks);
  console.log("Unique links: " + uniqueLinks.length);
  let counter = 0;
  // for (let i = 0; i <= uniqueLinks.length - 1; i++) {
   
  //   https.get(links[i], (response) => {
  //     response.setEncoding("utf8");
  //     console.log(response.statusMessage);
  //     response.on("error", reject);
  //     if (statusMessage !== 'OK'){
  //       counter ++;
  //       console.log(counter);
  //     }
     

  //  //  if(response.statusCode) 
  //   //   const httpStatusMessage = showHttpStatusMessages(response.statusCode);
  //   //   table.push([links[i], httpStatusMessage, "me loco"]);
  //   //  // console.log('dssssff');
  //   //   counter++;
  //   //   if (counter === links.length - 1) {z
  //   //   //  console.log('dff');
  //   //     resolve(table.toString());
  //   //   }
  //   });
  // }
 // console.log(counter);
// });
//  // return { uniqueLinks };
 };
