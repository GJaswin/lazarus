const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Lazarus is Online'));

app.listen(port, () => console.log(`Lazarus listening at http://localhost:${port}`));

//main imports
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const cmdFiles = fs.readdirSync('./cmds').filter(cmdfile => cmdfile.endsWith('.js'));

for (const cmdfile of cmdFiles) {
    const cmd = require(`./cmds/${cmdfile}`);
    client.commands.set(cmd.name, cmd);
}

//login

const env = require('dotenv').config({ path: "./login.env" });
const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);

client.once('ready', () => {
    console.log("Fired up! - " + client.user.tag);
        client.user.setStatus('dnd')
        .then(console.log);
    });

//message event
client.on('message', txt => {

    if (txt.author.bot) return;

    const args = txt.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();


    if (txt.content.startsWith(prefix)) {    
    try {
        client.commands.get(cmd).execute(txt, args);

    } catch(error) {
        console.error(error);
    }
}

//ars
var gay = /(im gay|i'm gay)/i;
var straight = /(im straight|i'm straight)/i;


if (!txt.content.startsWith(prefix)) {
    if (txt.mentions.has('704217047063855164')) {
txt.reply('please don\'t ping jaws, he\'s got work but he\'s a distracted piece of shit and will waste his time here');
    }

    else if (txt.content.match(gay)) {
        txt.reply('Congrats fag');
    } 

    else if (txt.content.match(straight)) {
        txt.react('🧢');
    }
}

});

