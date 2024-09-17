const facts = require('imageapi.js');
Discord = require("discord.js");
var urban = require('urban')
var axios = require("axios").default;
const cmc_api = require("cmc-info");
const cmc = new cmc_api("0a67057b-76e0-424f-80a8-526d61e76856");
const isEmptyObject = (obj) => Object.keys(obj).length === 0;
module.exports = {
  name: 'test2',
  aliases: [],
  cooldown: 0,
  description: "Make an embed.",
  async execute(message,args, cmd, client, Discord) {
    let cc = args.slice(0).join(' ');
// program to convert date to number
// create date
/*const d1 = new Date();
console.log(d1);

// converting to number
const result = d1.getTime();
console.log(result); */


if (!cc) {
  const noArgs = new Discord.MessageEmbed()
    .setTitle('Missing arguments')
    .setColor('RANDOM')
    .setDescription(
      'You are missing some args (ex: -crypto bitcoin || -covid dogecoin)',
    )
    .setTimestamp(new Date().getTime());

  return message.channel.send(noArgs);
}

const response = await fetch(
  `https://api.coingecko.com/api/v3/simple/price?ids=${cc}&vs_currencies=usd%2Ceur%2Cgbp`
);
const data = await response.json();

if (isEmptyObject(data)) {
  return message.channel.send(
    `No returned data from the API. Are you sure "${cc}" is a valid id?`,
  );
}

let usdprice = data[cc].usd;
let europrice = data[cc].eur;
let gbpprice = data[cc].gbp;

const embed = new Discord.MessageEmbed()
  .setTitle(`**Current price of ${cc}:**`)
  .setDescription('This data might be inaccurate.')
  .setColor('RANDOM')
  .setTimestamp(new Date().getTime())
  .addField('**USD:**', usdprice, true)
  .addField('**EURO:**', europrice, true)
  .addField('**GBP:**', gbpprice, true);

message.channel.send(embed);

  }
}