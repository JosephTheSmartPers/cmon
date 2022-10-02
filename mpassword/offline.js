const GuildModel = require('../models/guildSchema')
const profileModel = require('../models/profileSchema')
module.exports = async (Discord, client) => {
    const guild = client.guilds.cache.get('765863431504134154');
    let role = guild.roles.cache.get("775971844221960222")
    let channel = guild.channels.cache.get("959441858721894420")
    console.log(role.name)
    setInterval(() => {
        
   guild.members.cache.forEach(async user => {
       try{
        let timeout = 0
        let userdata = await profileModel.findOne({ userID: user.id});
        if(!userdata) return
        if(!user.roles.cache.get(role.id)) return
        if(userdata.password == "") return
        if(timeout - (Date.now() - userdata.login) > 0) return
        
        user.roles.remove(role)
        const replything = new Discord.MessageEmbed()
        .setColor('GREEN')
         .setDescription(`**<@!${user.id}> has been logged out!**`)
         .setThumbnail(user.user.displayAvatarURL({ dynamic: true}))
         .setTimestamp()
         .setFooter(`User ID: ${user.id}`)
         channel.send({embeds: [replything]})
       }catch(err){}
    })
}, 10*1000);
    
}