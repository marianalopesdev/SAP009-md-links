const chalk = require("chalk");
module.exports = function errorHandling(errorCode) {
    const codestatus = errorCode;
  //  console.log('sd'+errorCode);
    let messageStatus;
    switch (codestatus) {
      case 'ENOENT':
          messageStatus = console.log(chalk.red("No such file or directory. Check the path or filename and try again."));
        break;
        case 'EISDIR':
          messageStatus = console.log(chalk.red("Illegal operation on a directory, you are trying to 'read' a directory as a file."));
        break;
        case 'EACCES':
          messageStatus = console.log(chalk.red("Permission denied. You can't do this to this file."));
        break;I
        case 'ENOTDIR':
          messageStatus = console.log(chalk.red("Not a directory."));
        break;
      
      default:
        console.log("Unknown error: " + errorCode);
    }
  
    return messageStatus;
  };
  

   