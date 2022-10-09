const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server information.'),
    async execute(interaction)
    {
        await interaction.reply(`**${interaction.guild.name}**\n${interaction.guild.memberCount} members.`);
    },
};