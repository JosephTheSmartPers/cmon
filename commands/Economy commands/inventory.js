const Discord = require('discord.js')
const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'inventory',
    aliases: ["inv"],
    cooldown: 0,
    description: 'Shows how what items u have rn!',
    usage: "inventory [@person]",
     async execute(message, args, cmd, client, discord, profileData){
        itemNames = {
            'drugs': "💉drugs",
            'guitar': "🎸guitar",
            'broom': "🧹broom",
            'tomato': "🍅tomato",
            'handgun': "🔫handgun",
            'card': "💳card",
            'pen': "🖊️pen",
            'typewriter': "⌨️typewriter",
        }
        
            const target = message.mentions.users.first();
            let user = message.author
            let targetData = profileData
            if(target){ targetData = await profileModel.findOne({ userID: target.id})
            user = target
            
        }
        if(targetData && targetData.inv && targetData.inv.creditcard){
            console.log("yes")
            let invObj = targetData.inv
            invObj.card = invObj.creditcard
            delete invObj.creditcard

                await profileModel.findOneAndUpdate({
                    userID: user.id,
                }, 
                {$set: {
                        inv: invObj,
                    }});
                    console.log(invObj)
        }
        
            if(!targetData) return message.reply("This dude doesn't have an account in da database yet!🗃️");
            const object2 = targetData.inv
            const array = []
              for (const [key, value] of Object.entries(object2)) {
                  if(value != 0 && value && key) array.push({name: key, value: value})
                
              }
                const bal2Embed = new Discord.EmbedBuilder()
        .setColor('#fff85f')
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
        .setTitle(`${user.username}'s inventory is(drumroll please)`)
        .addFields(
                array.map(obj=>{
                    return{
                        name: itemNames[obj.name],
                        value: `${obj.value.toString()}`,
                        inline: true,
                    }
                })
        )
        .setFooter({text: `Dis dude: ${message.author.tag} scanned ya inventory!`})
        message.channel.send({embeds: [bal2Embed]});
        
    },
};