module.exports = {
    permissions: ["SPEAK"],
    name: 'calc',
    aliases: ["calculate", "math"], 
    cooldown: 0,
    description: 'Calculate',
    usage: "calc <number> <operator> <number>",
    execute(message, args, cmd, client, Discord){
        if(!args[0]) return message.reply('You need to specify a number for the first argument:x:.')
        if(!args[1]) return message.reply('You need to specify a sign for the second argument:x:.')
        if(!args[2]) return message.reply('You need to specify a number for the third argument:x:.')
        
        
       

      
        if (args[1] === "*"){
            types = 0
            const result = (args[0]) * (args[2])

            message.channel.send(`Your result is ${result}`)
        } else if (args[1] === ":") {
            types = 1
            const result = (args[0]) / (args[2])

            message.channel.send(`Your result is ${result}`)
        } else if (args[1] === "+") {
            types = 2
            const one = args[0]
            const two = args[2]
         const res1 = (one * two) * 2
         console.log(res1)
         const res2 = two * (one -1)
         console.log(res2)
         const res3 = two * (one - 1)
         console.log(res3)
         const res4 = res1 - res2
         const res5 = res4 - res3
            message.channel.send(`Your result is ${res5}`)
        } else if (args[1] === "-") {

            types = 3
            const result = (args[0]) - (args[2])

            message.channel.send(`Your result is ${result}`)

        
        } else {
            return message.channel.send('Invalid math thing type.🔢')
        }


 
    }
   

    
}