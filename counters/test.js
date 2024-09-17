const util = require('minecraft-server-util');

const Discord = require('discord.js');
  
  module.exports = async (client, id, text, reactions = []) => {

    const channel = client.channels.cache.find(channel => channel.name === 'server-status')

    channel.messages.fetch().then((messages) => {
      if (messages.size === 0) {
        // Send a new message
        channel.send(text).then((message) => {
       
        })

        


      }else{


        // Edit the existing message
        for (const message of messages)  {
          util.status('akgcore.exaroton.me', {port: parseInt('25565')}).then((response) =>{
           
                     message[1].edit(text)
                     

 
                          
                /*   const embed = new Discord.MessageEmbed()
                   .setColor('#4ce100')
                   .setTitle('Minecraft server status')
                   .addFields(
                   {name: 'Server IP', value: response.host},
                   {name: 'Online players', value: response.onlinePlayers},
                   {name: 'Max Players', value: response.maxPlayers},
                   {name: 'Version', value: response.version}
                   )  */
                   
         
          
                   })
        }
    
      }
 
    })

  }

