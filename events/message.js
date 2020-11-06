require('dotenv').config();

let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  let prefix = process.env.DISCORD_PREFIX
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if(!client.commands.get(command)) {
    message.channel.send("")
  }
    if (cmd) {
    if(cmd.conf.enabled === false) {
      if(!process.env.DISCORD_AUTHOR_ID.includes(message.authr.id) && !process.env.DISCORD_AUTHOR_ID.includes(message.author.id)) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 1) {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 2) {
      if(!message.member.hasPermission("MANAGE_WEBHOOKS")) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 3) {
      if(!message.member.hasPermission("KICK_MEMBERS")) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 4) {
      if(!message.member.hasPermission("BAN_MEMBERS")) {
        message.channel.send("")
	return
      }
    }
    if(cmd.conf.permLevel === 5) {
      if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 6) {
      if(!message.member.hasPermission("MANAGE_ROLES")) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 7) {
      if(!message.member.hasPermission("MANAGE_GUILD")) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 8) {
      if(!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send("")
        return
      }
    }
    if(cmd.conf.permLevel === 31) {
      if(!process.env.DISCORD_AUTHOR_ID.includes(message.author.id)) {
        message.channel.send("")
        return
      }
    }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
