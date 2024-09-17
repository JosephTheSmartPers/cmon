const translate = require('translate-api');
const discord = require('discord.js')


module.exports = {
    name: "translate",
    description: "Translate text (doesn't work)",
    aliases: [],
    cooldown: 0,
    permissions: [],


    async execute(message,args, cmd, client, Discord, profileData) {
       
 

 
        let transUrl = 'https://nodejs.org/en/';
        translate.getPage(transUrl).then(function(htmlStr){
          console.log(htmlStr.length)
        });
       
        let transText = 'hello world!';
        translate.getText(transText,{to: 'zh-CN'}).then(function(text){
          console.log(text)
        });
       
      
    }
}