exports.run = (client, message) => {
  let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }

  const avatarWEBP = user.displayAvatarURL({
    format: "webp",
    dynamic: true,
    size: 4096
  });
  const avatarPNG = user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 4096
  });
  const avatarJPG = user.displayAvatarURL({
    format: "jpg",
    dynamic: true,
    size: 4096
  });

  message.channel.startTyping()
  setTimeout(() => {
    message.channel.stopTyping()
    message.channel.send({
      embed: {
        author: {
          name: user.tag
        },
        description: `[\`WEBP\`](${avatarWEBP})・[\`PNG\`](${avatarPNG})・[\`JPG\`](${avatarJPG})`,
        image: {
          url: avatarPNG
        },
        footer: {
          text: "Meska",
          icon_url: client.user.avatarURL({ format: "png" })
        },
        timestamp: Date.now()
      }
  })
}, 3000)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "profilfotorafı", "profil-fotorafı", "pf", /*tr_TR*/
    "profilepicture", "profile-picture", "pp" /*en_US*/
],
  permLevel: 0
};

exports.help = {
  name: "avatar",
  description: "Belirtilen Kişinin veya Komutu Yazan Kişinin Avatarını Atar.",
  usage: "prefix + avatar || avatar @user"
};
