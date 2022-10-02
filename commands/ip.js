const figlet = require('figlet');
const {Client} = require('exaroton');


module.exports = {
    name: "ip",
    permissions: ["SPEAK"],
    aliases: [],
    cooldown: 0,
        async execute(message,args, cmd, client, Discord, profileData){
        const mclient = new Client(process.env.SOMACUCC);
        let servers = await mclient.getServers();

        for(let server of servers) {
            console.log(server.name + ": " + server.id);
        }
        }
    }