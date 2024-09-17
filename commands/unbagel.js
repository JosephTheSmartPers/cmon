module.exports = {
    name: 'unbagel',
    cooldown: 0,
    description: "Unsummon a wild bagel.",
    execute(message, args, cmd, client, Discord) {

        if(message.member.roles.cache.has('836983488422608927')){
            message.channel.send('Oh your bagel is now gone ):');
            message.member.roles.remove('836983488422608927').catch(console.error);

    } else {
       message.channel.send('Your bagel is allready gone!');
       
        }

        
    }
}