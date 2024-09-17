const Discord = require('discord.js');
const https = require('https');

const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'covid',
    aliases: ['corona', 'covid19'],
    cooldown: 5,
    description: "See covid stats by a smiple command",
    usage: "covid <country/all>",   
    async execute(message, args, cmd, client, Discord){
        
let countries = args.join(" ");

const noArgs = new EmbedBuilder()
.setTitle('Missing args!')
.setColor(0XFF0000)
.setDescription('Incorrect format, do it like this: **-covid <country> or -covid all**')
.setTimestamp()

if(!args[0]) return message.channel.send({embeds: [noArgs]})
if(args[0] === "all"){
    https.get('https://covid19.mathdro.id/api', (resp) => {
        
    let data = ""
    resp.on('data', (chunk) =>{
        data += chunk
    })
    resp.on('end', () => {
        data = JSON.parse(data)
        console.log(data)
            let confirmed = data.confirmed.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()
            let recovered = (data.confirmed.value - data.deaths.value).toLocaleString()
            const embed = new EmbedBuilder()
            .setImage(data.image)
            .setTitle('Worldwide🌐 covid19 stats')
            .addFields(
                {name: `Confirmed cases🧪`, value: confirmed},
                {name: `Recovered people🩹`, value: recovered},
                {name: `Passed away people⚰️`, value: deaths}
            )

            message.channel.send({embeds: [embed]});
      });      
        
    })

        } else {
                https.get(`https://covid19.mathdro.id/api/countries/${countries}`, (resp) => {
                    
                let data = ""
                resp.on('data', (chunk) =>{
                    data += chunk
                })
                resp.on('end', () => {
                    data = JSON.parse(data)

                        let confirmed = data.confirmed.value.toLocaleString()
                        let deaths = data.deaths.value.toLocaleString()
                        let recovered = (data.confirmed.value - data.deaths.value).toLocaleString()

                        const embed = new EmbedBuilder()
                        .setTitle(`${countries} covid19 stats`)
                        .addFields(
                            {name: `Confirmed cases🧪`, value: confirmed},
                            {name: `Recovered people🩹`, value: recovered},
                            {name: `Passed away people⚰️`, value: deaths}
                        )
                        .setImage(data.image)
            
                        message.channel.send({embeds: [embed]});
                  });      
                    
                })
    }
    }
}