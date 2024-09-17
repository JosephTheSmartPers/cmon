const Discord = require('discord.js');
const paginationEmbed = require('discord.js-pagination');
module.exports = {
    name: 'commands',
    aliases: ['cmd', 'admincommands', 'cmds'],
    cooldown: 0,
    description: "This command displays the admin commands.",
    usage: "-commands",
    execute(message, args, cmd, client, Discord){
        if(message.member.permissions.has('MANAGE_MESSAGES')){
                            const page1 = new Discord.MessageEmbed()
                .setColor('#ff9a00')
                .setTitle('This is the list of admin only commands.')
            
                .addFields(
                    {name: 'I am a bot coded by Barni', value: 'You are looking at the admin commands, please try to not show these to normal members.'},
                    {name: 'Commands', value: 'Here are da list of commands!'},
                    {name: '**-ban**', value: 'Thanos snap people out of the server.'},
                    {name: '**-embed**', value: 'This command sends the introduction of the bot.'},
                    {name: '**-kick**', value: 'Kick people outta here, really fun.'},
                    {name: '**-mute <@person> <amount of time>**', value: 'Mute someone, you dont have to specify the "<amount of time>"'},
                    {name: '**-react**', value: 'Make reaction roles.' },
                    {name: '**-role <@person> <role> **', value: '(**Give someone the role you wish with a simple command.'},
                    {name: '**-delwarn <@person>**', value: 'Delete all warning of a person.'},
                    {name: '**-warn <@person> <reason (optional)>**', value: 'Warn a person'}
                )
                const page2 = new Discord.MessageEmbed()
                .setColor('#ff9a00')
                .setTitle('This is the list of admin only commands.')
                          .addFields(
                    {name: '**-snap <amount of messages you wanna snap>**', value: 'Snap messages out of existence.'},
                    {name: '**-unmute <@person>**', value: 'Unmute someone, if you made timed unmute no need to.'},
                    {name: '**-adminscan <@person> **', value: 'Scan if someone has admin or not.'},
                    {name: '**-warn <@person>**', value: 'Warns someone 3 warns is max but you can change if you want.'},
                    {name: '**-warnings <@person>**', value: 'See how many warnings a person has.'},
                    {name: '**-delwarn <@person>**', value: 'Clear someone of all his warns.'},
                    {name: '**-pban <@person>**', value: 'Permanently ban someone from the server (DO NOT DELETE THE MESSAGE IT SENDS!)'},
                    {name: '**-dm <@person> <message>**', value: 'Dm someone from the group.'},
                    {name: '**-claim**', value: 'Claims a ticket, use this only when someone opens a ticket and you can claim it **<valid>**.'},
                    {name: '**-cembed <Title(one word)> <color in caps> <body>**', value: 'Create a custom embed.'},
                    {name: '**-warnings <@person>**', value: 'See warnings of a person.'}
       

                )
                const page3 = new Discord.MessageEmbed()
                .setColor('#ff9a00')
                .setTitle('This is the list of admin only commands.')
                          .addFields(
                    {name: '**-setprefix <new prefix>**', value: 'Set the prefix for the guild youre in.'},
                    {name: '**-swc <channel>**', value: 'Set the welcomechannel for the guild.'},
                    {name: '**-sbc <channel> **', value: 'Set the leaveschannel for the guild. (It can be the same as welcome)'},
                    {name: '**-sl <channel>**', value: 'Set the logs channel for the guild (It logs all commands there by Barnibot)'},
                    {name: '**-swm <message>**', value: 'Set the welcome message if you want to'},
                    {name: '**-swr <role>**', value: 'If someone joins your server they will get this role immediately.'},
                    {name: '**-userinfo <@user>', value: 'See some helpfull stuff about tagges user.'}

       

                )
                const pages = [
                    page1,
                    page2,
                    page3
                   
                ]
                const emoji = ["⬅️", "➡️"]
                const timeout = '600000'
                paginationEmbed(message, pages, emoji, timeout);      
         
                
            
        
        

        } else {
            message.channel.send('Sorry you must be a lower lifeform than admins.');
        }
    }

}



        

      
          
        
                                
                               

    
