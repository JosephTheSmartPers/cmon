const GuildModel = require('../models/guildSchema')
module.exports = async (Discord, client, oldMessage, newMessage) => {



    const regex_1 = /([ⓔ⒠ℯ∊€ḕḗḙéḛḝẹεẻẽếềểễệἐἑἒἓἔἕEὲέeℰℇ∃ḔḖḘḚḜẸẺẼẾỀỂỄỆῈΈἘἙἚἛἜE]+\W*[ⓘ⒧ℓḻḽl└lℒ₤ḶḸḺḼL]+\W*[ⓞ⒪☹☺☻✪☮✺○☼♨☢☀⍥ṍṏṑṓọỏốồổỗớờởỡợὀὁоὂὃὄὅộoṌṎṐṒỌỎỐỒỔỖỘỚỜỞỠỢὈὉὊὋὌO]+\W*[ⓝ⒩ηℵസ൩നṅṇṉИṋἠἡἢἣἤἥἦἧὴήnᾐᾑᾒᾓᾔᾕᾖᾗῂῃῄῆῇnℕ₦ṄṆṈṊN]+)/gm;
    const regex_2 = /([ⓜ⒨Պṃḿṁm♏ḾṀṂMlМᴟസ൬നണ൩]+\W*[ⓤ⒰υṳṵṷṹṻụᴝủứừửữựuὐὑὒὓὔὕὖὗὺύῠῡῢΰῦῧuṲỤỦỨỪỬỮỰṶṸṺṴU]+\W*[ⓢ⒮ടഗṡṣṥᴤsṧṩş﹩sŠṠṢṤṦṨS]+\W*[ⓚ⒦кḱḳḵk₭ḰkᵏḲḴK]+)/gm;

    const str = newMessage.content
    const subst = `||$1||`;

    var result = str.replace(regex_1, subst);
    result = result.replace(regex_2, subst);

    if (result != newMessage.content) {
        try {
            newMessage.delete()
        }
        catch (err) {
            return
        }
        replEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${result}`)
            newMessage.channel.send({ embeds: [replEmbed] })
    }

}