const util = require('minecraft-server-util');
module.exports = {
    name: 'minecraft',
    cooldown: 30,
    aliases: ['mc', 'checkserver', 'serverstatus'],
    description: 'Logs if your minecraft server is on or not.',
    usage: 'mc <server.ip> <port>',
    async execute(message, args, cmd, client, Discord){
        if(!args[0]) return message.reply('you have to enter a **valid** ip, or dis aint working.');
        if(!args[1]) return message.reply(' please specify the port (default is **25565**)');

        let msg = await message.channel.send(`Searching minecraft for \`${args[0]}\` <a:loading:1026905223031173150>`)

        util.status(args[0], parseInt[args[1]]).then((response) =>{
            console.log(response);
                 const embed = new Discord.EmbedBuilder()
            .setColor('#4ce100')
            .setTitle('Minecraft server status')
                .addFields(
                    {name: 'Server IP📋', value: `${args[0]}`},
                    {name: 'Online players🟢', value: `${response.players.online}`},
                    {name: 'Max Players👥', value: `${response.players.max}`},
                    {name: 'Version🆚', value: `${response.version.name}`},
                    {name: 'Description📖', value: `${response.motd.clean}`}
                )
      
        
            msg.edit({content: "",embeds: [embed]});
            })
        .catch ((error) =>{
            msg.edit(`❗There was an error finding ${args[0]}❗`);
            throw error;
        })
    }
}