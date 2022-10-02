var Scraper = require('images-scraper');

 const google = new Scraper({
    puppeteer: {
        headless: true,
      }
    })
module.exports = {
    name: 'image',
    cooldown: 5,
    aliases: ['search', 'find'],
    description: 'Search any image',
    usage: "image <what you wanna search>",
    async execute(message, args, cmd, client, Discord){
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Ooop, you didnt enter a meme name, sad.');

        const image_results = await google.scrape(image_query, 1);

        const memeEmbed = new Discord.MessageEmbed()
        .setColor('#0eedff')
        .setTitle(`Here is: *${image_query}*🖼️`)
      .setImage(image_results[0].url)
             const channel = client.channels.cache.find(channel => channel.name === '💻public-development')
        message.channel.send({embeds: [memeEmbed]});
       

    }
} 