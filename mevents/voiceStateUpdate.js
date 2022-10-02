
const { Collection, ChannelType } = require('discord.js')
const GuildModel = require('../models/guildSchema')
const voiceCollection = new Collection()
module.exports = async (Discord, client, oldState, newState) => {
    const guildschema = await GuildModel.findOne({guildId: newState.guild.id})
    if(!guildschema || !guildschema.voicechannel) return
    const channell = await newState.guild.channels.cache.find(channel => channel.id == guildschema.voicechannel)
    
    const member = newState.member
    const user = member.user
    const guild = newState.guild

    
    if(newState.channelId == guildschema.voicechannel){
    let channel
    let maybe = guild.channels.cache.find((channel) => channel.name === user.tag && channel.parent === newState.channel.parent && channel.type === ChannelType.GuildVoice)
    if(maybe){
        await member.voice.setChannel(maybe)
        await voiceCollection.set(user.id, maybe.id);
        return
    }
        try{
            channel = await newState.guild.channels.create({
            name: user.tag,
            type: ChannelType.GuildVoice,
        }); 
    }catch(err){return console.log(err)}
    if(newState.channel.parent){
        try{await channel.setParent(newState.channel.parent);}catch(err){console.log(err)}
        
    }
        await member.voice.setChannel(channel)
        await voiceCollection.set(user.id, channel.id);

    } else if(!newState.channel){
        if(oldState.channelId === voiceCollection.get(newState.id)) return oldState.channel.delete()

    }
   

 
}