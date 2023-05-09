const chalk = require("chalk");
module.exports = function showHttpStatusMessages(code) {
  if(code === 'ERR_TLS_CERT_ALTNAME_INVALID' ){
    code = 401; 
  }
  const codestatus = code;
  // console.log('codestatus');
  // console.log(codestatus);

  let messageStatus;
  switch (codestatus) {
    case 200:
        messageStatus = chalk.bgGreen("Status  OK - This site works fine!");
      break;
    case 301:
      messageStatus = chalk.bgMagenta("This site was moved permanently... only memories left...");
      break;
    case 400:
     messageStatus = (chalk.bgBlue(
        "Bad Request. The server cannot understand what you are saying. Look for a typo."
      ));
      break;
    case 401:
      // case 'ERR_TLS_CERT_ALTNAME_INVALID':
        messageStatus = (chalk.bgBlue(
        "Unauthorized. Get an authorization next time."
      ));
      break;
    case 403:
      messageStatus = (chalk.bgRed("This site is forbidden for you!"));
      break;
    case 404 :
     
      messageStatus = (chalk.bgBlue("This site could not be found... "));
      break;
    case 405:
        messageStatus = (chalk.bgRed(
        "Method Not Allowed. Like MC Hammer once said: Can't touch this. Not using this request method."
      ));
      break;
    case 500:
        messageStatus = (chalk.bgYellow(
        "Internal Server Error. The server said: The problem is me, not you."
      ));
      break;
    case 503:
        messageStatus = (chalk.bgYellow(
        "Service Unavailable: The server can't do what you want due to maintenance or overload."
      ));
      break;
    default:
      console.log("Unknown error: " + statusCode);
  }

  return {messageStatus, codestatus};
};
