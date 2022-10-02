    module.exports = {
        name: 'adminscan',
        aliases: ['ascan', 'scan'],
        cooldown: 0,
        permissions: [],
        description: "See if a person is admin or not",
        usage: "adminscan <@person>",
        execute(message, args, cmd, client, Discord){
            const member = message.mentions.users.first();
            if(member){
                const memberTarger = message.guild.members.cache.get(member.id);
            if(memberTarger.permissions.has("ADMINISTRATOR"))
                message.channel.send(`<@${memberTarger.id}> is a true admin👑.`);
                else{
                    message.channel.send(`<@${member.id}> aint no admin my man🛑`)
                }
            }else{
                message.channel.send('No person specified🔭.');
            }
        }
    }
    