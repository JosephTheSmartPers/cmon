const { MessageEmbed } = require('discord.js');
var ping = require('ping');

module.exports = {
  name: 'ping',
  aliases: [],
  cooldown: [0],
  description: 'Get bot ping.',
  usage: 'ping',
  async execute(message, args, cmd, client, Discord) {
var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];
        let messagePing = await Date.now();


        let now = ""
       async function seeping(){
        await hosts.forEach(async function(host){
            let thing = ""
            await ping.sys.probe(host, async function(isAlive){
                var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                thing += msg
            });
            return thing
        });

    }

    let endMessagePing = ""
   let msg = await message.channel.send(`Loading <a:loading:1026905223031173150>`)
    now = Date.now() - messagePing;

    messagePing = await Date.now();
        await seeping().then(async ()=>{
            endMessagePing = Date.now() - messagePing;
        })

        const embed = new Discord.EmbedBuilder() // build message embed
        .setDescription(
          `
          Database ping data:
          - Fetch ping🔍: \`${(endMessagePing)}ms\`
          - Message ping💬: \`${(now)}ms\`
          - Average ping📈: \`${(now + endMessagePing) / 2}ms\`
        `
        )
        .setColor('Green')
        .setTimestamp();
        msg.edit({content: "", embeds: [embed]})
  },
};

