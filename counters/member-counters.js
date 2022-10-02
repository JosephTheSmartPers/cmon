module.exports = async (client) =>{
    const guild = client.guilds.cache.get('826787118104838184');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('840186345032384522');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        client.user.setActivity(`-help | ${client.guilds.cache.size} servers`, {type:"LISTENING"})
    }, 30000);
}