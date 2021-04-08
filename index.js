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
client.ars = new Discord.Collection();
const cmdFiles = fs.readdirSync('./cmds').filter(cmdfile => cmdfile.endsWith('.js'));
const arFiles = fs.readdirSync('./ars').filter(arfile => arfile.endsWith('.js'));

for (const cmdfile of cmdFiles) {
    const cmd = require(`./cmds/${cmdfile}`);
    client.commands.set(cmd.name, cmd);
}

for (const arfile of arFiles) {
    const ar = require(`./ars/${arfile}`);
    client.ars.set(ar.name, ar);
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

    if (txt.author.bot) return;

    const args = txt.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase(); 
    if (txt.content.startsWith(prefix)) {
    try {
        client.commands.get(cmd).execute(txt, args);

    } catch(error) {
        console.error(error);
        txt.reply('I couldn\'t run that command!');
    }
} else {
    try {
        client.ars.get(ar).execute(txt);

    } catch(error) {
        console.error(error);
    }  

 }


});

