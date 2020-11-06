const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

require("./util/eventLoader.js")(client);
require("dotenv").config();

const log = message => {
  console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")} - ${message}`);
};

fs.readdir("./commands/", (err, files, dir) => {
  if(err) console.error(err);
  for (const file of files) {
    let props = require(`./commands/${file}`);
    log(`[ COMMAND ] ${props.help.name} loaded!`);
    client.commands.set(props.help.name, props);
    for (const alias of props.conf.aliases) {
      client.aliases.set(alias, props.help.name);
    }
  }
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      for (const { cmd, alias } of cmd.conf.aliases) {
        if(cmd === command) client.aliases.delete(alias);
      }
      client.commands.set(command, cmd);
      for (const alias of cmd.conf.aliases) {
        client.aliases.set(alias, cmd.help.name);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if(cmd === command) client.aliases.delete(cmd, alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
    return;
  }
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("MANAGE_WEBHOOKS")) permlvl = 2;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 4;
  if(message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 5;
  if(message.member.hasPermission("MANAGE_ROLES")) permlvl = 6;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 7;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 8;
  if(message.author.id === process.env.DISCORD_AUTHOR_ID) permlvl = 31;//author
};

client.on("message", msg => {
  if(msg.content.toLowerCase() === "ping") {
    msg.reply(`Pong! **${client.ws.ping}ms**`);
    log(`[ PING ]    Pong! ${client.ws.ping}ms`)
  }
});

client.login(process.env.DISCORD_TOKEN).then(
    function() {
      log("[ DISCORD ] Token doğru bir şekilde çalışıyor.");
    },
    function(err) {
      log("[ DISCORD ] Token'de bir hata oluştu: " + err);
      setInterval(function() {
        process.exit(0);
      }, 20000);
    }
  );