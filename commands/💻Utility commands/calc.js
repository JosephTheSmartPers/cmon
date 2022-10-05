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
        
        let num1 = parseInt(args[0])
        let num2 = parseInt(args[2])
       

      
        if (args[1] === "*"){
            types = 0
            const result = (args[0]) * (args[2])

            message.channel.send(`Your result is ${result}`)
        } else if (args[1] === "/") {
            types = 1
            const result = (args[0]) / (args[2])

            message.channel.send(`Your result is ${result}`)
        } else if (args[1] === "+") {
            let res5 = num1
            res5 = res5 + parseInt(num2)
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