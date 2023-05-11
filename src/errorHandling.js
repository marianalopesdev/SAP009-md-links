const chalk = require("chalk");
module.exports = function errorHandling(errorCode) {
    const codestatus = errorCode;
  //  console.log('sd'+errorCode);
    let messageStatus;
    switch (codestatus) {
      case 'NO_LINKS':
          messageStatus = console.log(chalk.bgRed.white("There is no link in the selected file.\n"));
        break;
      case 'INVALID_EXTENSION':
        console.log(chalk.bgRed.whiteBright("Sorry. Only files with the .md extension can be analyzed.\n"));

        break;
      case 'ENOENT':
          messageStatus = console.log(chalk.bgRed.whiteBright("No such file or directory. Check the path or filename and try again.\n"));
        break;
        case 'EISDIR':
          messageStatus = console.log(chalk.bgRed.whiteBright("Illegal operation on a directory, you are trying to 'read' a directory as a file.\n"));
        break;
        case 'EACCES':
          messageStatus = console.log(chalk.bgRed.whiteBright("Permission denied. You can't do this to this file.\n"));
        break;I
        case 'ENOTDIR':
          messageStatus = console.log(chalk.bgRed.whiteBright("Not a directory.\n"));
        break;
      
      default:
        console.log("Unknown error: " + errorCode);
    }
  };
  
