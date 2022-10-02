const fetch = import('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: 'covid',
    aliases: ['corona', 'covid19'],
    cooldown: 30,
    permissions: [],
    description: "See covid stats by a smiple command",
    usage: "covid <country/all>",
    async execute(message, args, cmd, client, Discord){
let countries = args.join(" ");

const noArgs = new Discord.MessageEmbed()
.setTitle('Missing args!')
.setColor(0XFF0000)
.setDescription('Incorrect format, do it like this: **-covid <country> or -covid all**')
.setTimestamp()

if(!args[0]) return message.channel.send({embeds: [noArgs]})
if(args[0] === "all"){
fetch('https://covid19.mathdro.id/api')
        .then(response => response.json())
        .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()

            const embed = new Discord.MessageEmbed()
            .setTitle('Worldwide🌐 covid19 stats')
            .addField(`Confirmed cases🧪`, confirmed)
            .addField(`Recovered people🩹`, recovered)
            .addField(`Passed away people⚰️`, deaths)

            message.channel.send({embeds: [embed]});
        })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then(response => response.json())
        .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()

            const embed = new Discord.MessageEmbed()
            .setTitle(`${countries} covid19 stats`)
            .addField(`Confirmed cases🧪:`, `${confirmed}`)
            .addField(`Recovered people🩹:`, `${recovered}`)
            .addField(`Passed away people⚰️`, `${deaths}`)

            message.channel.send({embeds: [embed]});
        }).catch(e => {
            return message.reply('Invalid country m8:x:.')
        
        })
    }
    }
}