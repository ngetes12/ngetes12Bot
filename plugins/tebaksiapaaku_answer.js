let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK BENDERA/i.test(m.quoted.text)) return !0
    conn.tebaksiapaaku = conn.tebaksiapaaku ? conn.tebaksiapaaku : {}
    if (!(id in conn.tebaksiapaaku)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == conn.tebaksiapaaku[id][0].id) {
        let json = JSON.parse(JSON.stringify(conn.tebaksiapaaku[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.result.answer.toLowerCase()) {
            global.DATABASE._data.users[m.sender].xp += conn.tebaksiapaaku[id][2]
            m.reply(`*Jawaban Kamu Benar*\nKamu Mendapatkan XP Sebesar +${conn.tebaksiapaaku[id][2]} XP`)
            clearTimeout(conn.tebaksiapaaku[id][3])
            delete conn.tebaksiapaaku[id]
        } else if (m.text.toLowerCase().endsWith(json.result.answer.split` `[1])) m.reply(`*Dikit Lagi!*`)
        else if (m.text.toLowerCase().startsWith(json.result.answer.split` `[0])) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Jawaban Kamu Salah*\nAyo Coba Lagii!!`)
    }
    return !0
}
module.exports = handler