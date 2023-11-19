const GuildModel = require("../models/guildSchema");
const profileModel = require("../models/profileSchema");
module.exports = async (Discord, client, message) => {
  if (message.author.id == client.id) return;
  let user = await profileModel.findOne({
    userID: message.author.id.toString(),
  });
  if (!user) {
    let profile = await profileModel.create({
      userID: message.author.id.toString(),
      moniy: 1000,
      banker: 0,
      xp: 0,
      level: 0,
      drugs: 0,
      guitar: 0,
      broom: 0,
      tomato: 0,
      handgun: 0,
      creditcard: 0,
      warnings: 0,
      house: "",
      worked: Date.now() - 6000000,
      daily: Date.now(),
      passowrd: "",
      login: Date.now() - 600000,
    });
    profile.save();
  }
  if (user && !user.password) {
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $set: {
          password: "",
          login: Date.now() - 600000,
        },
      }
    );
  }
  const command = message.content.slice("-");
  const args = message.content.slice("-".length).split(/ +/);
  if (message.channel.id == "959441858721894420") {
    let staffrole = await message.guild.roles.cache.get("775971844221960222");
    let timeout = 0;
    console.log(await staffrole.name);
    if (message.author.bot) return;
    if (command[0] != "-") return;
    if (args[0] != "login") return;
    console.log(args[1] + "\n" + user.password);
    if (args[2] > 60)
      return message.reply("Hey thats too big of a login session.");
    if (!args[2]) {
      timeout = 15;
    } else timeout = args[2];
    if (user.password != args[1]) return message.reply("Incorrect password!");
    try {
      message.guild.members.cache.get(message.author.id).roles.add(staffrole);
    } catch (err) {
      message.channel.send("I don't have permissions to add roles!");
    }
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $set: {
          login: Date.now() + timeout * 1000 * 60,
        },
      }
    );
    const replything = new Discord.EmbedBuilder()
      .setColor("Green")
      .setDescription(`**<@!${message.author.id}> logged in!**`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields({
        name: "Time untill logout",
        value: `\`${timeout} minutes\``,
      })
      .setTimestamp()
      .setFooter({ text: `ID: ${message.author.id}` });
    message.channel.send({ embeds: [replything] });
    setTimeout(async () => {
      try {
        await message.delete();
      } catch (err) {}
    }, 10000);
  }

  if (!message.content.startsWith("-")) return;

  if (args[0] == "setpass") {
    if (user.password == "") {
      if (message.guild)
        return message.reply("You can only set your password in a DM channel!");
      if (!args[1])
        return message.reply("You have to set your password to something!");
      let pass = "";
      pass = args[1].toString();
      console.log(pass.length);
      if (10 > pass.length)
        return message.reply(
          "Your password is too short, it has to be atleast 10 characters long!"
        );
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            password: args[1],
          },
        }
      );
      const sent = await message.channel.send(
        `Password succesfully set to \`${args[1]}\` \nDeleting message in 10...`
      );
      let i = 10;
      let timething = await setInterval(async () => {
        i--;
        await sent.edit(
          `Password succesfully set to \`${
            args[1]
          }\` \nDeleting message in ${i.toString()}...`
        );
        if (i == 0) {
          clearInterval(timething);
          await sent.delete();
        }
      }, 1000);
    } else if (user.password !== "" && user.password !== null) {
      if (message.guild)
        return message.reply("You can only set your password in a DM channel!");
      if (!args[1])
        return message.reply("You have to set your password to something!");
      let pass = "";
      if (!args[2])
        return message.reply(
          "You have to give your previous password to set a new one!"
        );
      let saidpass = args[2];
      if (user.password !== saidpass)
        return message.reply(`\`${saidpass}\` is not your previous password!`);
      pass = args[1].toString();
      console.log(pass.length);
      if (10 > pass.length)
        return message.reply(
          "Your password is too short, it has to be atleast 10 characters long!"
        );
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            password: args[1],
          },
        }
      );
      const sent = await message.channel.send(
        `Password succesfully set to \`${args[1]}\` \nDeleting message in 10...`
      );
      let i = 10;
      let timething = await setInterval(async () => {
        i--;
        await sent.edit(
          `Password succesfully set to \`${
            args[1]
          }\` \nDeleting message in ${i.toString()}...`
        );
        if (i == 0) {
          clearInterval(timething);
          await sent.delete();
        }
      }, 1000);
    }
  }
  /*const logEmbed = new Discord.MessageEmbed()
       .setColor('#e3b938')
        .setDescription(`**<@!${member.id}> left the server📤**`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true}))
        .addField("Joined At:clock1::", `${member.joinedAt}`)
        .setTimestamp()
        .setFooter(`ID: ${member.id}`)
       logs.send({embeds: [logEmbed]})   */
};
