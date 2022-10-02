const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, oldChannel, newChannel) => {
        let lc = await GuildModel.findOne({guildId: newChannel.guildId});
        if(!lc || !lc.logschannel) return
        const logs = newChannel.guild.channels.cache.find(channel => channel.name === lc.logschannel)
        if(lc.logschannel === null || lc.logschannel == "" || !lc.logschannel) return
        if(newChannel.parentId !== oldChannel.parentId){
            let oldc = "None"
            let newc = "None"
            if(oldChannel.parent){
                oldc = oldChannel.parent.name
            }
            if(newChannel.parent){
                newc = newChannel.parent.name
            } 
            const logEmbed = new Discord.EmbedBuilder()
            .setColor('#e3b938')
            .setDescription(`**<#${newChannel.id}>'s category has been updated.⚒️**`)
            .addFields(
                {name: "Old Category:", value: `${oldc}`},
                {name: "New Category:", value: `${newc}`},
                {name: "💳ID:", value: `${newChannel.id}`}
                )
            .setTimestamp();
                logs.send({embeds: [logEmbed]})
        }

        if(newChannel.name !== oldChannel.name){
            const logEmbed = new Discord.EmbedBuilder()
            .setColor('#e3b938')
            .setDescription(`**<#${newChannel.id}>'s name has been updated.⚒️**`)
            .addFields(
                {name: "Old Name:", value: oldChannel.name},
                {name: "New Name:", value: `${newChannel.name}`},
                {name: "💳ID:", value: `${newChannel.id}`}
                )
            .setTimestamp();
                logs.send({embeds: [logEmbed]})
            } 

            if(newChannel.type !== oldChannel.type){
            const logEmbed = new Discord.EmbedBuilder()
            .setColor('#e3b938')
            .setDescription(`**<#${newChannel.id}>'s type has been updated.⚒️**`)
            .addFields(
                {name: "Old Type:", value: `${oldChannel.type}`},
                {name: "New Type:", value: `${newChannel.type}`},
                {name: "💳ID:", value: `${newChannel.id}`}
                )
            .setTimestamp();
                logs.send({embeds: [logEmbed]})
                } 

                if(newChannel.topic !== oldChannel.topic){
                const logEmbed = new Discord.EmbedBuilder()
                .setColor('#e3b938')
                .setDescription(`**<#${newChannel.id}>'s topic has been updated.📜**`)
                .addFields(
                    {name: "Old Topic:", value: `${oldChannel.topic}`},
                    {name: "New Topic:", value: `${newChannel.topic}`},
                    {name: "💳ID:", value: `${newChannel.id}`}
                    )
                .setColor('#e3b938')
                .setTimestamp();
                    logs.send({embeds: [logEmbed]})  
                }   
}