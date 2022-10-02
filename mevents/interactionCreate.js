const guildModel = require('../models/guildSchema')
const ticket = require('../interactions/ticket')
const reaction = require('../interactions/akg')

const ms = require('ms')
const cooldowns = new Map();

module.exports = async (Discord, client, interaction) => {
    try{
   console.log("interaction")

    if(interaction.isButton()){
        if(interaction.customId === "ticket"){
            ticket(Discord, client, interaction)
        }
    
    }
    if(interaction.customId === "akgcore"){
        reaction(Discord, client, interaction)
    }
}catch(err){interaction.reply({content: "I don't have permissions to create a channel (damn you owner).", ephemeral: true});channel.delete(); return}

if(interaction.isCommand()){
    const cmd = client.slashCommands.get(interaction.commandName);
    if(!cooldowns.has(cmd.name)){
        cooldowns.set(cmd.name, new Discord.Collection());
        }
        
                        const current_time = Date.now();
                        const time_stamps = cooldowns.get(cmd.name);
                        const cooldown_amount = (cmd.cooldown) * 1000;
                    
                        if(time_stamps.has(interaction.user.id)){
                            const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;
                    
                            if(current_time < expiration_time){
                                const time_left = (expiration_time - current_time) / 1000;
                    
                                return interaction.reply(`ya need to wait about \`${time_left.toFixed(1)}\` seconds before ya can use: \`/${cmd.name}\` again. :clock1: `);
                            }
                        }
                
        time_stamps.set(interaction.user.id, current_time);
         setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

    if(!cmd) return interaction.followUp({ content: `Sorry man but this command: \`${cmd}\` doesn't exist ):`});

    const args = interaction.options;

    cmd.run(client, interaction, args)

}
}   