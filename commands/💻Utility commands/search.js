const cheerio = require('cheerio');
import('got');
const { stringify } = require('querystring');
const Discord = require("discord.js");
var urban = require('urban')

module.exports = {
    name: 'search',
    cooldown: 10,
    description: 'See a definition in the Urban dictionary',
    aliases: ["google"],
    permissions: [],
    usage: "search <word>",
    async execute(message,args, cmd, client, Discord) {
        const thing = args.join(" ")
        res = urban(thing);

res.first(function(json) {
    const embed = new Discord.MessageEmbed()
    .setTitle(`Results for *${thing}*`)
    .addField("Definition", json.definition)
    .addField("Example", json.example)
    .setFooter(`Published on ${json.written_on}`)
    .setColor("ORANGE")
    message.channel.send({embeds: [embed]})
});

}
}
