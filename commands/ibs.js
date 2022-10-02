module.exports = {
    name: 'ibs',
    cooldown: 0,
    description: "You found the secret command!",
    usage: "-ibs",
    execute(message, args, cmd, client, Discord){
        message.channel.send('ibs=is barni smart, message=positive');
    }

}