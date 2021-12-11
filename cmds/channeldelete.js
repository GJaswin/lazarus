const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('./guildinfo');

module.exports = {
data: new SlashCommandBuilder()
.setName('deletechan')
.setDescription('Deletes a channel')
.addChannelOption(option => option.setName('channel').setDescription('Select a channel to delete')),

async execute(interaction) {
    const chan = interaction.options.getChannel('channel');
    channel.delete(chan)
}
};
