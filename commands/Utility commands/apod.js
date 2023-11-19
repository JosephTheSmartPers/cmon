const guildModel = require('../../models/guildSchema')
module.exports = {
    name: "apod",
    description: "Astrology Picture of the day",
    cooldown: 0,
    usage: "apod",

    async execute(message, args, cmd, client, Discord) {

               let url = "https://api.nasa.gov/planetary/apod?api_key=5tSZHL8HvM27ftFM7cCTunI1eh9RrxV6lpf6hfF1"

               const msg = await message.channel.send(`Searching the for the APOD <a:loading:1026905223031173150>`)

               fetch(url)
               .then(response => {
                   // indicates whether the response is successful (status code 200-299) or not
                   if (!response.ok) {
                   throw new Error(`Request failed with status ${reponse.status}`)
                   }
                   return response.json()
               })
               .then(data => {
                   let embed = new Discord.EmbedBuilder()
                       .setTitle(data.title)
                       .setDescription(data.explanation)
                       .setFooter({text: data.date})
                       .setImage(data.hdurl)
                       .setColor("Purple")
                  msg.edit({content:"", embeds: [embed]})
               })

    }
}