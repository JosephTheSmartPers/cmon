const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js")
const guildModel = require('../../models/guildSchema')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("info")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .setDescription("Tells info about the bots setup on the server."),

    run: async (client, interaction, args) => {

        const guildm = await guildModel.findOne({guildId: interaction.guildId})
        if(!guildm) return interactoin.reply("Try again, now the command should work!")
        const nyec = guildm.byechannel;
        const logs = guildm.logschannel;
        const mute = guildm.muterole;
        const prefix = guildm.prefix;
        const staffrole = guildm.staffrole; 
        const suges = guildm.suggestionschannel;
        const ticket = guildm.ticketcategory;
        const welcomec = guildm.welcomechannel;
        const wrole = guildm.welcomerole;
        const vchanel = guildm.voicechannel;

        let inline = true
        var a = []
        var b = []
        var c = []
        var d = []
        var e = []
        var f = []
        var g = []
        var h = []
        var i = []
        var vF = []

        if(vchanel){
            vF.push(`\`${vchanel}\``)
        }

        if(nyec){
            a.push(`\`${nyec}\``)
        }
        if(logs){
          
            b.push(`\`${logs}\``)
        }
        if(mute){
          
            c.push(`\`${mute}\``)
        }
        if(prefix){
            
            d.push(`\`${prefix}\``)
                    }
        if(staffrole){
            
            e.push(`\`${staffrole}\``)
        }
        if(suges){
        
            f.push(`\`${suges}\``)
        }
        if(ticket){
        
            g.push(`\`${ticket}\``)
        }
        if(welcomec){
        
            h.push(`\`${welcomec}\``)
        }
        if(wrole){
        
            i.push(`\`${vchanel}\``)
        }
        //

        if(!vchanel){
            vF.push('\`❌None\`')
    }
        if(!nyec){
            
            a.push('\`❌None\`')
        }
        if(!logs){
        
            b.push('\`❌None\`')
        }
        if(!mute){
        
            c.push('\`❌None\`')
        }
        if(!prefix){

            d.push('\`-\`')
                    }
        if(!staffrole){
            
            e.push('\`❌None\`')
        }
        if(!suges){
            
            f.push('\`❌None\`')
        }
        if(!ticket){
            
            g.push('\`❌None\`')
        }
        if(!welcomec){

        h.push('\`❌None\`')
        }
        if(!vchanel){
            
            i.push('\`❌None\`')
        }
        const embed = new EmbedBuilder()
        .setTitle('Info about the servers custom stuff.')
        .addFields(
            {name: '👋Leaves channel', value: a.join(" "), inline},
            {name: '➡️Logs channel', value: b.join(" "), inline},
            {name: '🔇Mute role', value: c.join(" "), inline},
            {name: 'Prefix', value: d.join(" "), inline},
            {name: '⚔️Staff role', value: e.join(" "), inline},
            {name: '👍👎Suggestions channel', value: f.join(" "), inline},
            {name: '🎫Ticket category', value: g.join(" "), inline},
            {name: '👋Welcome channel', value: h.join(" "), inline},
            {name: '🏅Welcome role', value: i.join(" "), inline},
            {name: '🔊Personal voice', value: i.join(" "), inline}
        )
        .setColor('Yellow')
        interaction.reply({embeds: [embed]})

	}
}

