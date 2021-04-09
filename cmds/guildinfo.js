const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Shows server info",
    guildOnly: true,
    execute(txt, args) {
        
        const serverinfoembed = new Discord.MessageEmbed()
        .setColor('#ff6008')
        .setTitle('Server Info: ' + txt.channel.guild.name)
        .setThumbnail(txt.channel.guild.iconURL('png'))
        .setDescription(`Owner: **${txt.channel.guild.owner.user.tag}** \n Owner ID: \`${txt.channel.guild.ownerID}\``)
        .addFields(
            {name: 'Created on', value: txt.channel.guild.createdAt },
            { name: 'Server Member Count', value: txt.channel.guild.memberCount, inline: true },
                 
        );



        txt.channel.send(serverinfoembed);

    }

    
}