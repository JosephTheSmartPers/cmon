module.exports = {
    permissions: [],
    name: 'reload',
    aliases: ['rl'],
    cooldown: 0,
        description: "Make da bot reload a command",
   async execute(message, args, cmd, client, Discord) {
    
        if(message.author.id !== '483519738727759873') return message.reply('**Error!** Barnibot entered an error while trying to run this command: YOU ARE A FRAUD M8!')
   
        if(!args[0]) return message.channel.send('You need to include the name of the command!');


let command = args[0].toLowerCase();
try {
  delete require.cache[require.resolve(`../commands/${command}.js`)]//Change the path depending on how are your folders located.
  client.commands.delete(command);
  const pull = require(`../commands/${command}.js`);
  client.commands.set(command, pull);
  const sEmbed = await new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) )
  .setColor('#ecee0d')
  .setTitle(`\`${command}\` was reloaded sucesfully<a:check:854289501148020747>`)
  
  return message.channel.send({embeds: [sEmbed]});
} catch (error) {
  return message.channel.send(`There was an error trying to reload **${command}**: \`${error.message}\``);
}
                                      
                                        
                                    

                                        
                           
                          
                   
            }  
    }




