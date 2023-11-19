const message = require("../guild/messageCreate");
const translate = require("translate");
const Discord = require("discord.js");
const offline = require("../../mpassword/offline");
const util = require("minecraft-server-util");

const guildId = "826787118104838184";
const WOKCommands = require("wokcommands");

const songThing = require("../../handlers/songhandler");

module.exports = async (Discord, client, message) => {
  let channel = await client.channels.cache.find(
    (channel) => channel.id == "957553977896095764"
  );
  fetch("https://ntfy.sh/BarniBot", {
    method: "POST",
    headers: { Title: "BarniBot online", Tags: "white_check_mark" },
    body: "Lets go",
  });
  console.log(`BarniBot is online`);
  client.user.setActivity(`-help | ${client.guilds.cache.size} servers`, {
    type: "LISTENING",
  });
  offline(Discord, client);
  //songThing(Discord, client);
};
