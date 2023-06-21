const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction, ChannelType } = require("discord.js")
const canvacord = require('canvacord');
const guildModel = require('../../models/guildSchema')

let channelCommands =["leaveschannel", "logs", "suggestions", "welcomechannel", "personalvc", "ticket"]

let channelFormat = {
    "leaveschannel": "byechannel",
    "logs": "logschannel",
    "suggestions": "suggestionschannel",
    "welcomechannel": "welcomechannel",
    "ticket": "ticketcategory",
    "personalvc": "voicechannel"
}

let roleCommands = ["muterole", "staffrole", "memberrole", ]

let roleFormat = {
    "muterole": "muterole",
    "staffrole": "staffrole",
    "memberrole": "welcomerole",
}

module.exports = {
    sub: true,
    ...new SlashCommandBuilder()
    .setName("set")
    .setDescription("Set up everything you need for this bot. Do `/set help`")

    .addSubcommand((subcommand) =>
    subcommand
        .setName('help')
        .setDescription("Get mor help.")
    )

    .addSubcommand((subcommand) =>
		subcommand
			.setName('leaveschannel')
			.setDescription("The channel where all the leaves will be logged")
			.addChannelOption((option) => option.setName('channel').setDescription('Which one?').setRequired(true))
        )

	.addSubcommand(subcommand =>
		subcommand
			.setName('logs')
			.setDescription('This is where everything will be logged')
			.addChannelOption((option) => option.setName('channel').setDescription('Which channel?').setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('muterole')
            .setDescription('The role for the muted')
			.addRoleOption((option) => option.setName('role').setDescription('Which is the mute role?').setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
			.setName('personalvc')
			.setDescription('The channel that if you join, will make a VC for you.')
            .addChannelOption((option) => option.setName('channel').setDescription('Which channel').setRequired(true).addChannelTypes(ChannelType.GuildVoice)),
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('prefix')
            .setDescription('The prefix of the bot')
            .addStringOption((option) => option.setName('prefix').setDescription('What will the prefix be?').setRequired(true).setMinLength(1).setMaxLength(2))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('staffrole')
            .setDescription('The staff role')
            .addRoleOption((option) => option.setName('role').setDescription('The staff role').setRequired(true))
        )
        .addSubcommand(subcommand =>
        subcommand
            .setName('suggestions')
            .setDescription('The channel where the suggestions will be sent.')
            .addChannelOption((option) => option.setName('channel').setDescription('The suggestions channel').setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('ticket')
            .setDescription('The category where all the tickets will be registered')
            .addChannelOption((option) => option.setName('category').setDescription("The category's ID or name.").setRequired(true).addChannelTypes(ChannelType.GuildCategory))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('welcomechannel')
            .setDescription('The channel where the welcome messages will be sent.')
			.addChannelOption((option) => option.setName('channel').setDescription('Which one?').setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('memberrole')
            .setDescription('The default member role')
			.addRoleOption((option) => option.setName('role').setDescription('Which role?').setRequired(true))
        ),
    run: async (client, interaction, args) => {

        let format = args.getSubcommand()
        
        if(format == "help"){
            const helpEmbed = new EmbedBuilder()
                .setTitle("Setup commands help⚙️")
                .addFields(
                    {name: "/set leaveschannel", value: "Set the channel where the leaves will be publicly logged."},
                    {name: "/set logs", value: "Set the channel where everything gon be logged."},
                    {name: "/set presonalvc", value: "Set the channel that if you join, will create a new temporary VC for you."},
                    {name: "/set suggestions", value: "Set the channel where the suggestions will be sent"},
                    {name: "/set ticket", value: "Set the category for the tickets to be created at."},
                    {name: "/set welcomechannel", value: "Set the channel where the welcome messages are sent."},

                    {name: "/set muterole", value: "Set the role for the muted."},
                    {name: "/set staffrole", value: "Set the role that the staff have, for better moderation commands."},
                    {name: "/set memberrole", value: "Set the default member role"},

                    {name: "/set prefix", value: "Set the prefix for this server for the bot."}
                )
                .setColor("DarkRed")
            interaction.reply({embeds: [helpEmbed]})
        }
        
        let baseEmbed = new EmbedBuilder()
            .setTitle("Succesfully updated database <a:check:854289501148020747>")
            .setColor("DarkOrange")
            .setFooter({iconURL: client.user.displayAvatarURL({dynamic: true}), text: "By: BarniBot"})


        if(channelCommands.includes(format)){

            let channelArg = args.getChannel("channel")

            let idk = channelFormat[format]
            await guildModel.findOneAndUpdate({
                guildId: interaction.guildId,
            },{
                $set: {[idk]: (channelArg.name),}
            });

            baseEmbed.setDescription(`Set the ${format} to ${channelArg}`)
            interaction.reply({embeds: [baseEmbed]})

        }

        else if(roleCommands.includes(format)){

            let roleArg = args.getRole("role")

            let idk = roleFormat[format]
            await guildModel.findOneAndUpdate({
                guildId: interaction.guildId,
            },{
                $set: {[idk]: (roleArg.name),}
            });

            baseEmbed.setDescription(`Set the ${format} to ${roleArg}`)
            interaction.reply({embeds: [baseEmbed]})

        }

        if(format == "prefix"){

            let prefix = args.getString("prefix")

            await guildModel.findOneAndUpdate({
                guildId: interaction.guildId,
            },{
                $set: {prefix: (prefix),}
            });

            baseEmbed.setDescription(`Set the prefix to \`${prefix}\``)
            interaction.reply({embeds: [baseEmbed]})

        }   

    }
}