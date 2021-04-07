module.exports = {
    name: "ping",
    description: "Ping!",
    execute(txt, args) {
        txt.channel.send('Pong!');
    }
};
