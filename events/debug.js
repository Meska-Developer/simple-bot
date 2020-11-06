const chalk = require("chalk");
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

module.exports = e => {
    console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
  };
