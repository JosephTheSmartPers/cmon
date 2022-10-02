const message = require("../events/guild/message");

const util = require('minecraft-server-util');

const Discord = require('discord.js');

module.exports = async (message, client, Discord, id, text) =>{
    const guild = client.guilds.cache.get('765863431504134154');
    console.log('Sending server log');

  /*  const channel = client.channels.cache.find(channel => channel.name === 'teszt-szerverlog')
    channel.messages.fetch({limit: 1}).then(messages =>{
    channel.bulkDelete(messages);
    }); */

   
    

    

       
            
              
              

    setInterval(() =>{
        util.status('akgcore.exaroton.me', {port: parseInt('25565')}).then((response) =>{
       
            
        const embed = new Discord.MessageEmbed()
        .setColor('#4ce100')
        .setTitle('Minecraft server status')
        .addFields(
        {name: 'Server IP', value: response.host},
        {name: 'Online players', value: response.onlinePlayers},
        {name: 'Max Players', value: response.maxPlayers},
        {name: 'Version', value: response.version}
 
        )
        .setTimestamp();
            
firstMessage(client, '841748654204125184', embed)
        }),
          console.log('E')
        
    }, 999999);



}

