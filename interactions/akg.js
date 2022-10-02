const guildModel = require('../models/guildSchema')
module.exports = async (Discord, client, interaction) => {
    const name = interaction.values
    let member = interaction.member

    let edit = interaction.guild.roles.cache.find(role => role.id === "765991562080813067")
    let ivan = interaction.guild.roles.cache.find(role => role.id === "765991485563994123")
    let mariann = interaction.guild.roles.cache.find(role => role.id === "765991533044039720")
    let laffi = interaction.guild.roles.cache.find(role => role.id === "765991597267222590")

    let coca = interaction.guild.roles.cache.find(role => role.id === "765991677138698280")
    let cola = interaction.guild.roles.cache.find(role => role.id === "765991636068073570")

    let roles = [edit, ivan, mariann, laffi]
    let sides = [coca, cola]

    function checkrole(role){
        let checker = interaction.member.roles.cache.find(r => r.id == role.id)
        if(checker) return true
        return false
    }
    async function roler(rolename){
        
        if(checkrole(rolename)){
            await interaction.member.roles.remove(rolename)
            await interaction.reply({content: "Role succesfully removed<a:check:854289501148020747>", ephemeral: true})
            if(checkrole(coca)) member.roles.remove(coca)
            if(checkrole(cola)) member.roles.remove(cola)
        } else{
            await interaction.member.roles.add(rolename)
            await interaction.reply({content: "Role succesfully added<a:check:854289501148020747>", ephemeral: true})
        }
        roles.forEach(async role=>{
            if(role.id == rolename.id) return
            if(checkrole(role)) interaction.member.roles.remove(role)
        })
    }
    async function koka(){
        if(checkrole(cola)) member.roles.remove(cola)
        member.roles.add(coca)
    }
    async function kola(){
        if(checkrole(coca)) member.roles.remove(coca)
        member.roles.add(cola)
    }
    if(name == "mariann"){
        roler(mariann)
        koka()
    }
    if(name == "laffi"){
        roler(laffi)
        koka()
    }
    if(name == "edit"){
        roler(edit)
        kola()
    }
    if(name == "ivan"){
        roler(ivan)
        kola()
    }

}