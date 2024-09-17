const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")

const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
const OFFSET = '!'.charCodeAt(0);   

module.exports = {
    ...new SlashCommandBuilder()
    .setName("flip")
    .setDescription("Flips the text given⬇️")
    .addStringOption(option => option.setName('text').setDescription('Whats your text to flip?').setRequired(true)),

    run: async (client, interaction, args) => {

        const txt = interaction.options.getString("text")

        interaction.reply(
            txt.split('')
                .map(c => c.charCodeAt(0) - OFFSET)
                .map(c => mapping[c] || ' ')
                .reverse().join('')
        );

	}
}

