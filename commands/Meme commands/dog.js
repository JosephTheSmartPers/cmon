const Discord = require('discord.js');
const https = require('https');

module.exports = {
    name: 'dog',
    aliases: [],
    cooldown: 0,
    description: 'Sends random joke',
    usage: "dog",
    async execute(message, args, cmd, client, Discord){
        let msg = await message.channel.send(`Searching the internet for cats <a:loading:1026905223031173150>`)

        let url = "https://dog.ceo/api/breeds/image/random"
        let data = ""

        await https.get(url, (resp) => {
            resp.on('data', (chunk) =>{
                data += chunk
            })
            resp.on('end', async () => {
                data = await JSON.parse(data)
                const embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setImage(data.message)
                    .setTitle("Dog sound.")
                msg.edit({content: "", embeds: [embed]});
            })
        })
            }
        }