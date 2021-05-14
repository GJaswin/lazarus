const Discord = require('discord.js');

module.exports = {
name: "delchan",
description: "deletes a channel",
guildOnly: true,
permissions: ['MANAGE_CHANNELS', 'ADMINISTRATOR'],
execute(txt, args) {
    var guildchnl = args[1];
    guildchnl.channel.delete;
}

}