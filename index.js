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
const cmdFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of cmdFiles) {
    const cmd = require(`./cmds/${file}`);
    client.commands.set(cmd.name, cmd);
}

//login

const env = require('dotenv').config({ path: "./login.env" });
const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);

client.once('ready', () => {
    console.log("Fired up! - " + client.user.tag);
        client.user.setActivity('your mom', {
            type: 'WATCHING'
        });
    });

//message event
client.on('message', txt => {

    if (!txt.content.startsWith(prefix) || txt.author.bot) return;

    const args = txt.content.slice(prefix.length).trim().spilt(/ +/);
    const cmd = args.shift().toLowerCase(); 
    
    if (cmd === 'ping') {
        client.commands.get('ping').execute(txt, args); 

    } else if (cmd === 'invite') {
        client.commands.get('invite').execute(txt, args);
    }

});

