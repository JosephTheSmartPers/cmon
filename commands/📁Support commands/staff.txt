module.exports = {
    name: 'staff',
    cooldown: 60,
    permissions: [],
    aliases: ['admin', 'mods'],
    description: "Tag staff with this command.",
    usage: "staff",
    execute(message,args, cmd, client, Discord){
        const addrolething = "none"
              const staffrole = message.guild.roles.cache.find(role => role.name === addrolething);
              if(staffrole == undefined) return message.reply('Sadly, the mods havent set up this command yet.')
                      message.channel.send(`A man has fallen in lego city ${staffrole} please help❗`);
    }

}