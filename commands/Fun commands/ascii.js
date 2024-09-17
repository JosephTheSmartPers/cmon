const figlet = require('figlet');

module.exports = {
    name: "ascii",
    permissions: ["SPEAK"],
    description: "Converts text to ascii",
    aliases: ["nicetext"],
    usage: "ascii <text>f",
    cooldown: 0,
        async execute(message,args, cmd, client, Discord, profileData){
            if(!args[0]) return message.channel.send('Please provide some text');
    
            msg = args.join(" ");
    
            figlet.text(msg, function (err, data){
                if(err){
                    console.log('Something went wrong');
                    console.dir(err);
                }
                if(data.length > 30) return message.channel.send('Please provide text shorter than 30 characters')
    
                message.channel.send('```' + data + '```')
            })
        }
    }