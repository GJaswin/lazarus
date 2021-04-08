module.exports = {
    name: /(im straight|i'm straight)/i,
    description: "AR for im straight",
    execute(txt) {
        txt.react('🧢');
    }
}