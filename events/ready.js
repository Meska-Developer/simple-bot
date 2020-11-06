const moment = require("moment");

module.exports = async (client) => {
  const log = message => {
    console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")} - ${message}`);
  };
  log("[ DISCORD ] Logged in as Meska#0001");
};
