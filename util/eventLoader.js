const moment = require("moment");
const reqEvent = (event) => require(`../events/${event}`);

module.exports = client => {
  const log = message => {
    console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")} - ${message}`);
  };

/*client.on('debug', reqEvent('debug'));
log("[ EVENTS ] debug")*/
  client.on('error', reqEvent('error'));
log("[ EVENTS ]  error loaded!")
  client.on('message', reqEvent('message'));
log("[ EVENTS ]  message loaded!")
  client.on('ready', reqEvent('ready'));
log("[ EVENTS ]  ready loaded!")
  client.on('warn', reqEvent('warn'));
log("[ EVENTS ]  warn loaded!")
};
