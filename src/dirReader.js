const fs = require("fs");
const path = require("path");
const errorHandling = require("./errorHandling");

module.exports = function dirReader(filePath) {
  return new Promise((resolve, reject) => {
   
    fs.readdir(filePath, (err, fileContents) => {
      if (err) {
     //   console.log(err);
    }
        
          console.log('eisdir');
         // console.log(fileContents);
          
       
       
    
     
      resolve(fileContents);
     // console.log(fileContents.toString());
    });
  });
};
