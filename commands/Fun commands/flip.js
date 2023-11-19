
const Discord = require('discord.js');
const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
// Start with the character '!'
const OFFSET = '!'.charCodeAt(0);
module.exports = {
    name: 'flip',
    aliases: [],
    cooldown: 0,
    permissions: ["SPEAK"],
    description: 'Flips the text you sent.',
    usage: "flip <text>",
    async execute(message, args, cmd, client, Discord){
        


    if (args.length < 1) return message.channel.send("You must provide text to flip!:x:");

    message.channel.send(
        args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
    );

        
                
            }
        }