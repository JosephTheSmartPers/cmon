const ms = require('ms');
module.exports = {
    name: 'selfdestruct',
    aliases: ["sf"],
    cooldown: 0,
    permisssions: [],
    description: "Send a message and delete it after a certain amount of time.",
    usage: "sf <time> <text>",
    async execute(message, args, cmd, client, Discord){
        const delnum = args[0] * 1000;
        if(!args[0]) return message.reply('⏰Please specify the amount of time you want your message to be visible!')
        if(args[1], message){
            await message.channel.send('Message deleted here, A message has been deleted here due to a selfdestruct command!')
            await message.channel.messages.fetch({limit: '2'}).then(async messages =>{
                await message.channel.bulkDelete(messages);
            });

            const string = args.slice(1).join(" ")
      
            await message.channel.send(`**${message.author.username}:** ${string.replace("-a","")} \n*(deleted in ${args[0]} seconds)* `).then((msg) => {
                setTimeout(async () => {
                            await message.channel.send('Message deleted here, A message has been deleted here due to a selfdestruct command!')
                            await message.channel.messages.fetch({limit: '2'}).then(async messages =>{
                                await message.channel.bulkDelete(messages);
                            });
                }, delnum);
            })
            
        }
    }
}
