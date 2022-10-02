module.exports = {
    permissions: ["ADMINISTRATOR"],
    name: 'shutdown',
    aliases: [],
    cooldown: 0,
    description: "Make da bot go offline",
   async execute(message, args, cmd, client, Discord) {
        if(message.author.id !== '483519738727759873') return message.reply('**Error!** Barnibot entered an error while trying to run this command: YOU ARE A FRAUD M8!')
                    message.reply('The bot will now shut down.\n'
                            + 'Confirm with `yes` or deny with `no`.');

                    // First argument is a filter function - which is made of conditions
                    // m is a 'Message' object
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
                                
                                    // only accept messages by the user who sent the command
                                    // accept only 1 message, and return the promise after 30000ms = 30s

                                    // first (and, in this case, only) message of the collection
                                  
                                    if (collected.first().content.toLowerCase() == 'yes') {
                                        const sEmbed = new Discord.MessageEmbed()
                                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) )
                                        .setColor('#ff0000')
                                        .setTitle('Shutting down...')
                                        .setFooter('🛑')
                                        message.channel.send({embeds: [sEmbed]}).then(process.exit);
                                            
                                        
                                    }

                                    else
                                            message.reply('Operation canceled.');      
                            }).catch(() => {
                                    message.reply('No answer after 30 seconds, operation canceled.');
                            });
                   
            }  
    }

