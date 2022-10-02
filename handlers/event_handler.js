const fs = require('fs');
const guildModel = require('../models/guildSchema')

module.exports = async (client, Discord) =>{
    
const load_dir = (dirs) =>{
    const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
   // const counters = fs.readdirSync(`./counters`).filter(file => file.endsWith('.js'));

    
    for(const file of event_files){
        const event = require(`../events/${dirs}/${file}`);
        const event_name = file.split('.')[0];
        client.on(event_name, event.bind(null, Discord, client));

        

    }
   /* for(const file of counters){
        const counter = require(`../counters/${file}`);
        const counter_name = file.split('.')[0];
        client.on(counter_name, counter.bind(null, Discord, client)); */

        

   // }
}
    ['client', 'guild'].forEach(e => load_dir(e));

}