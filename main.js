const Discord = require('discord.js');

const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
        ],

    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
    ]});

require('dotenv').config();

const GuildModel = require('./models/guildSchema')

const mongose = require('mongoose')
 
const prefix = '-';

const mdelete = require('./mevents/messageDelete')
const mupdate = require('./mevents/messageUpdate')
const cdelete = require('./mevents/channelDelete')
const ccreate = require('./mevents/channelCreate')
const cpinsupdate = require('./mevents/channelPinsUpdate')
const cupdate = require('./mevents/channelUpdate')
const ecreate = require('./mevents/emojiCreate')
const edelete = require('./mevents/emojiDelete')
const eupdate = require('./mevents/emojiUpdate')
const gbanadd = require('./mevents/guildBanAdd')
const gbanremove = require('./mevents/guildBanRemove')
const gmemberadd = require('./mevents/guildMemberAdd')
const gmemberremove = require('./mevents/guildMemberRemove')
const gmemberupdate = require('./mevents/guildMemberUpdate')
const gscheduledeventcreate = require('./mevents/guildScheduledEventCreate')
const gscheduledeventdelete = require('./mevents/guildScheduledEventDelete')
const gscheduledeventupdate = require('./mevents/guildScheduledEventUpdate')
const icreate = require('./mevents/interactionCreate')
const gupdate = require('./mevents/guildUpdate')
const vstateupdate = require('./mevents/voiceStateUpdate')

const login = require('./mpassword/login')

const fs = require('fs');
client.on('messageDelete', (message) =>{mdelete(Discord, client, message)})
client.on('messageUpdate', (oldMessage, newMessage)=>{if(newMessage) mupdate(Discord, client, oldMessage, newMessage)})
client.on('channelDelete', (channel) =>{if(channel.guild) cdelete(Discord, client, channel)})
client.on('channelCreate', (channel) =>{if(channel.guild) ccreate(Discord, client, channel)})
client.on('channelPinsUpdate', (channel, time) =>{if(channel.guild) cpinsupdate(Discord, client, channel)})
client.on('channelUpdate', (oldChannel, newChannel) =>{if(newChannel.guild) cupdate(Discord, client, oldChannel, newChannel)})
client.on('emojiCreate', (emoji) =>{if(emoji.guild) ecreate(Discord, client, emoji)})
client.on('emojiDelete', (emoji) =>{if(emoji.guild) edelete(Discord, client, emoji)})
client.on('emojiUpdate', (oldEmoji, newEmoji) =>{if(newEmoji.guild) eupdate(Discord, client, oldEmoji, newEmoji)})
client.on('guildBanAdd', (ban) =>{if(ban.guild) gbanadd(Discord, client, ban)})
client.on('guildBanRemove', (ban) =>{if(ban.guild) gbanremove(Discord, client, ban)})
client.on('guildMemberAdd', (member) =>{if(member.guild) gmemberadd(Discord, client, member)})
client.on('guildMemberRemove', (member) =>{if(member.guild) gmemberremove(Discord, client, member)})
client.on('guildMemberUpdate', (oldMember, newMember) =>{if(newMember.guild) gmemberupdate(Discord, client, oldMember, newMember)})
client.on('guildScheduledEventCreate', (event) =>{if(event.guild) gscheduledeventcreate(Discord, client, event)})
client.on('guildScheduledEventDelete', (event) =>{if(event.guild) gscheduledeventdelete(Discord, client, event)})
client.on('guildScheduledEventUpdate', (oldevent, newevent) =>{if(newevent.guild) gscheduledeventupdate(Discord, client, oldevent, newevent)})
client.on('interactionCreate', (interaction) =>{if(interaction.guild) icreate(Discord, client, interaction)})
client.on('guildUpdate', (oldguild, newguild) =>{if(newguild) gupdate(Discord, client, oldguild, newguild)})
client.on('voiceStateUpdate', (oldState, newState) =>{if(newState.guild) vstateupdate(Discord, client, oldState, newState)})


client.on('messageCreate', (message)=>{ login(Discord, client, message)})

client.commands = new Discord.Collection();
client.events = new Discord.Collection(); 
client.slashCommands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})
mongose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log('Sucesfully connected to the database!');
}).catch((err)=>{
    console.log(err);
});
client.login(process.env.DISCORD_TOKEN);
