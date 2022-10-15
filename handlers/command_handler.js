const fs = require('fs');
const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob)
require('dotenv').config();

const deleteer = require("../handlers/deleteHandler")

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

module.exports = async (client, Discord) =>{
  const slashCommands = await globPromise(`${process.cwd().split("\\").join("/")}/SlashCommands/*/*.js`);
  const arrayOfSlashCommands = [];
    
    slashCommands.map((value) => {
     const file = require(value);
     let dir = value.split("/")[value.split("/").length - 2]
     if(!file?.name) return;
     file.directory = dir
     if(file.sub == true){
      client.slashCommands.set(file.name, file, dir);
     }
     else{
      client.slashCommands.set(file.name, file, dir);
     }
     

     arrayOfSlashCommands.push(file);

    });

    const clientId = "836893540427759646"
    const guildId = "765863431504134154"

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.on('ready', async (client) => {

  try {
		console.log(`Started refreshing ${arrayOfSlashCommands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: arrayOfSlashCommands },
		);

      deleteer()

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    console.log(`Pushed all slash commands to guild ${guildId}`);
	} catch (error) {
		console.error(error);
	}

})



  fs.lstat('./commands/', (err, stats) => {

    if(err)
        return console.log(err); //Handle error


});
function isdir(path){
  fs.lstat(`./commands/${path}`, (err, stat) =>{
    if(stat.isDirectory()) return true
    return false
  })
}

   const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
   const fun = fs.readdirSync('./commands/🎉Fun commands/').filter(file => file.endsWith('.js'));
   const eco = fs.readdirSync('./commands/🎟Economy commands/').filter(file => file.endsWith('.js'));
   const mus = fs.readdirSync('./commands/🎵Music commands/').filter(file => file.endsWith('.js'));
   const mod = fs.readdirSync('./commands/👮Moderation commands/').filter(file => file.endsWith('.js'));
   const uti = fs.readdirSync('./commands/💻Utility commands/').filter(file => file.endsWith('.js'));
   const use = fs.readdirSync('./commands/📁Support commands/').filter(file => file.endsWith('.js'));
   const mem = fs.readdirSync('./commands/😂Meme commands/').filter(file => file.endsWith('.js'));
   const set = fs.readdirSync('./commands/🛠️Setup commands/').filter(file => file.endsWith('.js'));
   const dev = fs.readdirSync('./commands/⚠️Under developement/').filter(file => file.endsWith('.js'));
   //NORMAL
   for(const file of command_files){
   const command = require(`../commands/${file}`);
   if(command.name){
    client.commands.set(command.name, command);

   } else {
       continue;
     }
  }
  //FUN COMMANDS
  for(const file of fun){
    
    const command = require(`../commands/🎉Fun commands/${file}`);
    command.directory = "🎉Fun commands"
    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
   //ECO
   for(const file of eco){
    const command = require(`../commands/🎟Economy commands/${file}`);
    command.directory = "🎟Economy commands"

    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
   //MUS
   for(const file of mus){
    const command = require(`../commands/🎵Music commands/${file}`);
    command.directory = "🎵Music commands"

    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
   //MOD
   for(const file of mod){
    const command = require(`../commands/👮Moderation commands/${file}`);
    command.directory = "👮Moderation commands"

    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
   //UTI
   for(const file of uti){
    const command = require(`../commands/💻Utility commands/${file}`);
    command.directory = "💻Utility commands"

    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
   //USE
   for(const file of use){
    const command = require(`../commands/📁Support commands/${file}`);
    command.directory = "📁User support commands"

    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
   //MEM
   for(const file of mem){
    const command = require(`../commands/😂Meme commands/${file}`);
    command.directory = "😂Meme commands"

    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
   //SET
   for(const file of set){
    const command = require(`../commands/🛠️Setup commands/${file}`);
    command.directory = "🛠️Setup commands"

    if(command.name){
     client.commands.set(command.name, command, command.usage);
 
    } else {
        continue;
      }
   }
      //DEV
      for(const file of dev){
        const command = require(`../commands/⚠️Under developement/${file}`);
        command.directory = "⚠️Under developement"
    
        if(command.name){
         client.commands.set(command.name, command, command.usage);
     
        } else {
            continue;
          }
       }


};