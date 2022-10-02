const { Client, Message, EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require("discord.js")
const SnakeGame = require('snakecord');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("snake")
    .setDescription("Play snake🐍"),

    run: async (client, interaction, args) => {

        const snakeGame = new SnakeGame({
            title: '🐍Snake🐍',
            color: "GREEN",
            timestamp: false,
            gameOverTitle: "💀Game Over💀"
        });
        snakeGame.newGame(interaction);

	}
}

