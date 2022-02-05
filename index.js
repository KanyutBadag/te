const {
	WAConnection: _WAConnection
} = require('@adiwajshing/baileys')
const simple = require('./U1/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const fs = require("fs")

require('./ujang.js')
nocache('./ujang.js', module => console.log(`${module} Telah Di Update`))

const starts = async (tytyd = new WAConnection()) => {
	tytyd.logger.level = 'warn'
	tytyd.version = [2, 2143, 3]
	tytyd.browserDescription = [ 'Yahahaha', 'linux', '3.0' ]
	tytyd.on('qr', () => {
		console.log('SCAN BANG')
	})
	fs.existsSync('./session.json') && tytyd.loadAuthInfo('./session.json')
	tytyd.on('connecting', () => {
		console.log('MENGHUBUNGKAN')
	})
	tytyd.on('open', () => {
		console.log('SELESAI')
	})
	await tytyd.connect({
		timeoutMs: 30*1000
	})
	fs.writeFileSync('./session.json', JSON.stringify(tytyd.base64EncodedAuthInfo(), null, '\t'))
	
	tytyd.on('chat-update', async (message) => {
		require('./ujang.js')(tytyd, message)
	})
}

function nocache(module, cb = () => { }) {
	console.log(`${module} is now being watched for changes`)
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}

function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

starts()