let https = require("https");
const showHttpStatusMessages = require("./httpStatusMessages");
module.exports = function validateLinks(links) {
    for (let i = 0; i <= links.length - 1; i++) {
      
        let link = links[i];
        // console.log([i] +" "+ link);
  
        https.get(link, (response) => {
          response.setEncoding("utf8");
          response.on("error", console.error);
          const httpStatusMessage = showHttpStatusMessages(response.statusCode);
  
          
          console.log(`Link: ${link} - ${httpStatusMessage}`);
        });
      }    
    
    }