let https = require("https");
const fs = require("fs");

module.exports = function printMsg() {
  const file = process.argv[2];

  fs.readFile(file, function (err, contents) {
    if (err) {
      return console.log(err);
    }

    const linksRegex = /(https?:\/\/\S+(?=\b))/g;

    const links = contents.toString().match(linksRegex);
  
    for (let i = 0; i <= links.length - 1; i++) {
      
      let link = links[i];
      // console.log([i] +" "+ link);

      https.get(link, (response) => {
        response.setEncoding("utf8");
        response.on("error", console.error);
      

        
        console.log(`Link: ${link} - ${response.statusCode}`);
      });
    }   

    console.log(`The file name entered at the prompt is ${file}`);
  });
};
