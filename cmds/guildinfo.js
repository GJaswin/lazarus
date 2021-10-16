const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about the current server'),
    async execute(interaction) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var creationdate = `${interaction.guild.createdAt.getDate()} ${months[interaction.guild.createdAt.getMonth()]} ${interaction.guild.createdAt.getFullYear()} at ${interaction.guild.createdAt.getHours()}:${interaction.guild.createdAt.getMinutes()}:${interaction.guild.createdAt.getSeconds()}`;
    var creationdatenew = `${Math.floor(interaction.guild.createdAt.getTime()/1000)}`
            
    const serverinfoembed = new MessageEmbed()
    .setColor('#ff6008')
    .setTitle('Server Info: ' + interaction.guild.name)
    .setThumbnail(interaction.guild.iconURL('png'))
    .setDescription(`Owner ID: \`${interaction.guild.ownerId}\``)
    .addFields(
        {name: 'Created on', value: `<t:${creationdatenew}:F> **(<t:${creationdatenew}:R>)**`},
        { name: 'Server Member Count', value: interaction.guild.memberCount.toString(), inline: true }
             
    );
        await interaction.reply({embeds: [serverinfoembed]});
    }
    };