const util = require('minecraft-server-util');
module.exports = {
    name: 'minecraft',
    cooldown: 30,
    aliases: ['mc', 'checkserver', 'serverstatus'],
    description: 'Logs if your minecraft server is on or not.',
    usage: 'mc <server.ip> <port>',
    execute(message, args, cmd, client, Discord){
        if(!args[0]) return message.reply('you have to enter a **valid** ip, or dis aint working.');
        if(!args[1]) return message.reply(' please specify the port (default is **25565**)');

        util.status(args[0], {port: parseInt(args[1])}).then((response) =>{
            console.log(response);
                 const embed = new Discord.MessageEmbed()
            .setColor('#4ce100')
            .setTitle('Minecraft server status')
            .addFields(
            {name: 'Server IP📋', value: response.host},
            {name: 'Online players🟢', value: response.onlinePlayers},
            {name: 'Max Players👥', value: response.maxPlayers},
            {name: 'Version🆚', value: response.version},
            {name: 'Description📖', value: response.description}
                    )
      
        
            message.channel.send({embeds: [embed]});
            })
        .catch ((error) =>{
            message.channel.send(`❗There was an error finding ${args[0]}❗`);
            throw error;
        })
    }
}