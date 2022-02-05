const {
	WAConnection: _WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	WAMessageProto,
	ReconnectMode,
	ProxyAgent,
	GroupSettingChange,
	waChatKey,
	relayWAMessage,
	mentionedJid,
	processTime
} = require('@adiwajshing/baileys')

const scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))

const getCmd = (id) => {
	let position = null
	Object.keys(scommand).forEach((i) => {
		if (scommand[i].id === id) {
			position = i
		}
	})
	if (position !== null) {
		return scommand[position].chats
	}
}


module.exports = tytyd = async (tytyd, mek) => {
	try {
		if (!mek.hasNewMessage) return
		mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && !mek.key.remoteJid == 'status@broadcast') return
		const kunci = '.'
		const from = mek.key.remoteJid
		const content = JSON.stringify(mek.message)
		const type = Object.keys(mek.message)[0]
		const body = (type === 'listResponseMessage' &&
		mek.message.listResponseMessage.title) ?
		mek.message.listResponseMessage.title : (type === 'buttonsResponseMessage' &&
		mek.message.buttonsResponseMessage.selectedButtonId) ?
		mek.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' &&
		mek.message.conversation.startsWith(kunci)) ?
		mek.message.conversation : (type == 'imageMessage') &&
		mek.message.imageMessage.caption.startsWith(kunci) ?
		mek.message.imageMessage.caption : (type == 'videoMessage') &&
		mek.message.videoMessage.caption.startsWith(kunci) ?
		mek.message.videoMessage.caption : (type == 'extendedTextMessage') &&
		mek.message.extendedTextMessage.text.startsWith(kunci) ?
		mek.message.extendedTextMessage.text : (type == 'stickerMessage') &&
		(getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== null &&
		getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ?
		getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : ''
		const command = body.replace(kunci, '').trim().split(/ +/).shift().toLowerCase()
		
		switch (command) {
			case 'tes':
				teks = 'ya'
				tytyd.sendMessage(from, teks, MessageType.text, { quoted: mek })
			break
		}
	} catch (eror) {
		er = String(eror)
		console.log(er)
	}
}