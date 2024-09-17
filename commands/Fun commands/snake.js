const SnakeGame = require('snakecord');
const Discord = require("discord.js");

module.exports = {
    name: "snake",
    description: "Play snake in Discord.",
    aliases: ['snakegame'],
    cooldown: 0,
    permissions: [],
    usage: "snake",


    async execute(message,args, cmd, client, Discord, profileData) {
        const snakeGame = new SnakeGame({
            title: '🐍Snake🐍',
            color: "GREEN",
            timestamp: false,
            gameOverTitle: "💀Game Over💀"
        });
        snakeGame.newGame(message);
    }
}