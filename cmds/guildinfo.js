const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Shows server info",
    guildOnly: true,
    execute(txt, args) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var creationdate = `${txt.channel.guild.createdAt.getDate()} ${months[txt.channel.guild.createdAt.getMonth()]} ${txt.channel.guild.createdAt.getFullYear()} at ${txt.channel.guild.createdAt.getHours()}:${txt.channel.guild.createdAt.getMinutes()}:${txt.channel.guild.createdAt.getSeconds()}`;
                
        const serverinfoembed = new Discord.MessageEmbed()
        .setColor('#ff6008')
        .setTitle('Server Info: ' + txt.channel.guild.name)
        .setThumbnail(txt.channel.guild.iconURL('png'))
        .setDescription(`Owner: **${txt.channel.guild.owner.user.tag}** \n Owner ID: ${txt.channel.guild.ownerID}`)
        .addFields(
            {name: 'Created on', value: creationdate },
            { name: 'Server Member Count', value: txt.channel.guild.memberCount, inline: true },
                 
        );



        txt.channel.send(serverinfoembed);

    }

    
}