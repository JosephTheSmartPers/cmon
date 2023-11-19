const Discord = require('discord.js');
const https = require('https');

module.exports = {
    name: 'cat',
    aliases: [],
    cooldown: 0,
    description: 'Sends a cute cat',
    usage: "cat",
    async execute(message, args, cmd, client, Discord){
        let msg = await message.channel.send(`Searching the internet for cats <a:loading:1026905223031173150>`)

        let url = "https://api.thecatapi.com/v1/images/search?"
        let data = ""

        await https.get(url, (resp) => {
            resp.on('data', (chunk) =>{
                data += chunk
            })
            resp.on('end', async () => {
                data = await JSON.parse(data)
                const embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setImage(data[0].url)
                    .setTitle("Meow🐈.")
                msg.edit({content: "", embeds: [embed]});
            })
        })
            }
        }