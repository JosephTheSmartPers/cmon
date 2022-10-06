require('dotenv').config();

const profileModel = require('../../models/profileSchema');

const GuildConfig = require('../../models/guildSchema')

const ProfileGuildModels = require('../../models/profileGuildSchema')

const Discord = require('discord.js');

const canva = require('canvacord');

const xphandler = require('../../counters/xphandler')

const ms = require('ms')

const cooldowns = new Map();
const slashh = require('../../handlers/slash_hander')
const mongoose = require('mongoose')
const GuildModel = require('../../models/guildSchema')

const updater = require("../../handlers/updater")

module.exports = async (Discord, client, message,) => {
    let profileData;
    let lc
    let prefix
    {
        if(message.guild){
    lc = await GuildModel.findOne({guildId: message.guild.id})
    if(!lc){ prefix = "-"}
    else{
    prefix = lc.prefix
    }
    }
    profileData = await profileModel.findOne({ userID: message.author.id.toString()});
    if(!profileData.inv) await updater(client, message.author.id)
    if(prefix === null) prefix = '-';
if(!message.guild) prefix = '-'
    
let dorkas = ['lilla']

let his = ['hi', 'hello', 'howdy', 'gday', 'hola', 'what up', 'how are you', 'how are you?', 'hi there', 'greetings', 'morning', 'afternoon', 'evening', 'hey', 'good to see you', 'great to see you', 'nice to see you', 'good afternoon, sir, how are you today?', 'good afternoon sir, how are you today?']

his.forEach(element => {
    if(message.content.toString().toLowerCase() == element.toLowerCase())
       return message.channel.send(his[Math.floor(Math.random() * his.length)])
    }
);


dorkas.forEach(async element => {
    if(message.content.toLowerCase().split(" ").join("").includes(element.toLowerCase()))
    {
        try{
        await message.delete()
        }catch(err){}

        return
    }
    }
);

    dorkas.forEach(element =>{

})
    
    if(message.content.includes('bagel')){
        const bagel = new Discord.EmbedBuilder()
        .setTitle('Bagel has arrived')
        .setImage('https://cdn.loveandlemons.com/wp-content/uploads/2020/05/bagel-recipe.jpg')
        .setThumbnail('https://cdn.loveandlemons.com/wp-content/uploads/2020/05/bagel-recipe.jpg')
        .setAuthor('GamerBagel6969', 'https://cdn.loveandlemons.com/wp-content/uploads/2020/05/bagel-recipe.jpg')
        message.channel.send({embeds: [bagel]})
    }

    message.mentions.users.forEach(async user=>{
        let targetThing =  await profileModel.findOne({ userID: user.id});
        if(!targetThing.inv) updater(client, user.id)
    })





    
    try{
        profileData = await profileModel.findOne({ userID: message.author.id.toString()});
        if(!profileData.inv) await updater(client, message.author.id)
        if(!profileData){
            let profile = await profileModel.create({
                userID: message.author.id.toString(),
                serverID: message.guildId.toString(),
                moniy: 1000,
                banker: 0,
                house: "",
                worked: Date.now() - 6000000,
                daily: Date.now(),
                password: "",
                inv: {},
                times: {},
            });
            profile.save();
        } else if(!profileData.daily){
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, 
            {$set: {
                    creditcard: 0,
                    warnings: 0,
                    house: {},
                    worked: Date.now() - 6000000,
                    daily: Date.now(),
                    password: "",

                }});
            } else if(!profileData.password){
                await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, 
                {$set: {
                        password: "",
    
                    }});
            } else if(!profileData.inv){
                await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                }, 
                {$set: {
                        inv: {
                            drugs: profileData.drugs,
                            guitar: profileData.guitar,
                            broom: profileData.broom,
                            tomato: profileData.tomato,
                            handgun: profileData.handgun,
                            creditcard: profileData.creditcard,
                            pen: 0,
                        },
                        times: {}
    
                    }});
            }
        if(message.guild){
        profileGuildData = await ProfileGuildModels.findOne({ userID: message.author.id.toString(), serverID: message.guildId.toString()});
        if(!profileGuildData){
            let guildProfile = await ProfileGuildModels.create({
                userID: message.author.id.toString(),
                serverID: message.guildId.toString(),
                warnings: 0,
                xp: 0,
                level: 0,
                password: "",
            });
            guildProfile.save();
            if(profileGuildData && !profileGuildData.password){
                await ProfileGuildModels.findOneAndUpdate({
                    userID: message.author.id,
                }, 
                {$set: {
                        password: "",
                    }});
            }
        }
    }
    }catch(err){
        console.log(err)
    }


    if(message){
        if(message.guild)
        xphandler(message, client, Discord, profileData)
    }

    
    const target = message.mentions.users.first();
    const args1 = message.content.slice("-".length).split(/ +/);
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    

    const command = client.commands.get(cmd) || 
                    client.commands.find(a => a.aliases && a.aliases.includes(cmd));

const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
]
if(!message.content.startsWith(prefix)) return
if(!command) return;  

if(command.hasOwnProperty('dev')){
    if(command.dev == true){
        client.commands.get("developement").execute(message, args, cmd, client, Discord, command.name)
        return
    }
}

if(command.hasOwnProperty('permissions'))    
    if(command.permissions.length){
      let invalidPerms = []
      for(const perm of command.permissions){
          if(!message.member.permissions.has(Discord.PermissionsBitField.Flags[perm])){
            invalidPerms.push(perm);
              }
            }
        if (invalidPerms.length){

        const permEmbed = new Discord.EmbedBuilder()
        .setColor('#f23030')
        .setTitle('Invalid perms!')
        .addFields(
             {name: 'You cannot execute this command!', value: `You dont have the perm: \`${invalidPerms}\` to execute this command!`}
        )
        .setFooter({text: '❌'})
        return message.channel.send({embeds: [permEmbed]}) 
    }

    }
    if(!message.content.startsWith(prefix)) return
    if(!command) return;
    if(!command.hasOwnProperty('cooldown')) return
if(!cooldowns.has(command.name)){
cooldowns.set(command.name, new Discord.Collection());
}

                const current_time = Date.now();
                const time_stamps = cooldowns.get(command.name);
                const cooldown_amount = (command.cooldown) * 1000;
            
                if(time_stamps.has(message.author.id)){
                    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
            
                    if(current_time < expiration_time){
                        const time_left = (expiration_time - current_time) / 1000;
            
                        return message.reply(`ya need to wait about \`${time_left.toFixed(1)}\` seconds before ya can use: \`${command.name}\` again. :clock1: `);
                    }
                }
        
time_stamps.set(message.author.id, current_time);
 setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

 
 try{
    if(!message.guild) return;
    let guildData = await GuildConfig.findOne({ guildId: message.guildId });
    if(!guildData){
        let guildthing = await GuildConfig.create({
            guildId: message.guildId.toString(),
            welcomechannel: null,
            muterole: null,
            byechannel: null,
            counterc: null,
            counterb: null,
            counterm: null,
            logschannel: null,
            prefix: "-",
            staffrole: null,
            suggestionschannel: null,
            ticketcategory: null,
            welcomerole: null,
        });
        guildthing.save();
    }
    else if(guildData && guildData.guildBanAdd == null){
        const response = await GuildConfig.findOneAndUpdate({
            guildId: message.guildId.toString(),
        },
 
        {
            $set: {
                welcomechannel: null,
                muterole: null,
                byechannel: null,
                counterc: null,
                counterb: null,
                counterm: null,
                logschannel: null,
                prefix: "-",
                staffrole: null,
                suggestionschannel: null,
                ticketcategory: null,
                welcomerole: null,
                channelCreate: false,
                channelDelete: false,
                channelUpdate: false,
                channelPinsUpdate: false,
                emojiCreate: false,
                emojiDelete: false,
                emojiUpdate: false,
                guildBanAdd: false,
                guildBanRemove: false,
                guildMemberAdd: false,
                guildMemberRemove: false,
                guildMemberUpdate: false,
                guildScheduledEventCreate: false,
                guildScheduledEventDelete: false,
                guildScheduledEventUpdate: false,
                guildScheduledEventUserAdd: false,
                guildScheduledEventUserRemove: false,
                guildUpdate: false,
                inviteCreate: false,
                inviteDelete: false,
                messageDelete: false,
                messageDeleteBulk: false,
                messageReactionRemoveAll: false,
                messageUpdate: false,
                roleCreate: false,
                roleUpdate: false,
                stickerCreate: false,
                stickerDelete: false,
                stickerUpdate: false,
                threadCreate: false,
                threadDelete: false,
                threadMembersUpdate: false,
                threadMemberUpdate: false,
                threadUpdate: false,
            }
        }
        );
    
    }
    else if(guildData && guildData.guildBanAdd == null){
        const response = await GuildConfig.findOneAndUpdate({
            guildId: message.guildId.toString(),
        },
 
        {
            $set: {
                voicechannel: "none",
            }
        }
        );
    
    }
}catch(err){
    console.log(err)
}
 if(message.content.startsWith(prefix))
 try{

    command.execute(message, args, cmd, client, Discord, profileData);
} catch (err){
    const errEmbed = new Discord.EmbedBuilder()
    .setColor('#e10000')
    .setTitle('Error!')
    .addFields(
         {name: 'Barnibot entered an error trying to execute this command', value: 'We are sorry for the inconvinience.'}
    )
    .setFooter({text: '🛑'})
    message.channel.send({embeds: [errEmbed]});
}

}
   



    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();



}



