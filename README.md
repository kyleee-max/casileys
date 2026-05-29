# 🌸 @kaels/casileys

[![Logo](https://raw.githubusercontent.com/kyleee-max/mutsumi-file/main/uploads/1779033636326.jpeg)](https://www.npmjs.com/package/@kaels/casileys)

<p align="center">
   <a href="https://www.npmjs.com/package/@kaels/casileys">
      <img src="https://img.shields.io/npm/v/@kaels/casileys?style=for-the-badge&logo=npm"/>
   </a>
   <a href="https://www.npmjs.com/package/@kaels/casileys">
      <img src="https://img.shields.io/npm/dm/@kaels/casileys?style=for-the-badge&logo=npm"/>
   </a>
   <a href="https://github.com/kyleee-max/casileys">
      <img src="https://img.shields.io/github/stars/kyleee-max/casileys?style=for-the-badge&logo=github"/>
   </a>
   <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge"/>
   </a>
   <a href="https://nodejs.org">
      <img src="https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&labelColor=green&logoColor=white&style=for-the-badge"/>
   </a>
   <a href="#">
      <img src="https://img.shields.io/badge/ESM-only?logo=javascript&labelColor=yellow&logoColor=black&style=for-the-badge"/>
   </a>
</p>

---

## 🙏 A Note & Apology

> [!IMPORTANT]
> Saya ingin menyampaikan permohonan maaf yang tulus kepada **[@itsliaaa](https://github.com/itsliaaa)** selaku penulis fork [`@itsliaaa/baileys`**, yang menjadi dasar awal dari package ini.
>
> Pada awalnya, `@kaels/casileys` dibuat berdasarkan fork tersebut tanpa memberikan atribusi yang layak — hal itu tidak benar dan saya mengakuinya.
>
> **Terima kasih banyak kepada @itsliaaa** atas kerja kerasnya dalam membangun dan memelihara fork yang luar biasa ini. Kontribusinya sangat berarti bagi komunitas WhatsApp bot.
>
> Ke depannya, `@kaels/casileys` akan dikembangkan secara mandiri sebagai proyek independen dengan modifikasi, perbaikan, dan arah yang berbeda — bukan lagi sekadar re-upload. Semua perubahan akan didokumentasikan secara transparan.

---

## ✨ Highlights

Package ini dirancang untuk penggunaan produksi dengan fokus pada kejelasan dan keamanan:

- 🚫 Tanpa obfuscation — mudah dibaca dan diaudit.
- 🔧 Dikembangkan secara aktif dengan modifikasi dan penyesuaian tersendiri.

> [!NOTE]
> Proyek ini tidak dimaksudkan untuk menggantikan upstream Baileys maupun fork `@itsliaaa/baileys`.

---

## 📋 Table of Contents

- [🙏 A Note & Apology](#-a-note--apology)
- [✨ Highlights](#-highlights)
- [📥 Installation](#-installation)
- [🌐 Connect to WhatsApp](#-connect-to-whatsapp-quick-step)
- [🗄️ Implementing Data Store](#️-implementing-data-store)
- [🪪 WhatsApp IDs Explain](#-whatsapp-ids-explain)
- [✉️ Sending Messages](#️-sending-messages)
  - [Text, Mention, Reaction, Pin, Forward, Contact, Location, Event, Poll](#-text)
  - [Rich Response, Code Block, Inline Entities, Table](#-rich-response)
- [📁 Sending Media Messages](#-sending-media-messages)
  - [Image, Video, Sticker, Audio, Document, Album, Sticker Pack](#️-image)
- [👉🏻 Sending Interactive Messages](#-sending-interactive-messages)
  - [Buttons, List, Native Flow, Carousel, Hydrated Template](#-buttons)
- [💳 Sending Payment Messages](#-sending-payment-messages)
- [👁️ Other Message Options](#️-other-message-options)
- [♻️ Modify Messages](#️-modify-messages)
- [🧰 Additional Contents](#-additional-contents)
  - [Group, Community, Profile, Business, Privacy, Newsletter, Events](#-group-management)
- [📣 Credits](#-credits)

---

## 📥 Installation

Via `package.json`:

```json
"dependencies": {
   "@kaels/casileys": "latest"
}
```

Via terminal:

```bash
npm i @kaels/casileys@latest
```

### 🧩 Import

```javascript
// ESM
import { makeWASocket } from '@kaels/casileys'

// CJS
const { makeWASocket } = require('@kaels/casileys')
```

---

## 🌐 Connect to WhatsApp (Quick Step)

```javascript
import { makeWASocket, delay, DisconnectReason, useMultiFileAuthState } from '@kaels/casileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

const myPhoneNumber = '6288888888888'

const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')

   const sock = makeWASocket({
      logger: pino({ level: 'silent' }),
      auth: state
   })

   sock.ev.on('creds.update', saveCreds)

   sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update

      if (connection === 'connecting' && !sock.authState.creds.registered) {
         await delay(1500)
         const code = await sock.requestPairingCode(myPhoneNumber)
         console.log('🔗 Pairing code:', code)
      }

      if (connection === 'close') {
         const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
         if (shouldReconnect) connectToWhatsApp()
      }

      if (connection === 'open') {
         console.log('✅ Connected to WhatsApp')
      }
   })

   sock.ev.on('messages.upsert', async ({ messages }) => {
      for (const message of messages) {
         if (!message.message) continue
         await sock.sendMessage(message.key.remoteJid, { text: '👋🏻 Hello world' })
      }
   })
}

connectToWhatsApp()
```

### 🔐 Auth State

> [!NOTE]
> Bisa gunakan `useSingleFileAuthState` sebagai alternatif `useMultiFileAuthState`. `useSingleFileAuthState` sudah memiliki mekanisme caching internal, sehingga tidak perlu wrap `state.keys` dengan `makeCacheableSignalKeyStore`.

---

## 🗄️ Implementing Data Store

> [!CAUTION]
> Sangat disarankan membangun data store sendiri — menyimpan seluruh history chat di memory bisa menyebabkan RAM usage yang tinggi.

```javascript
import { makeWASocket, makeInMemoryStore, delay, DisconnectReason, useMultiFileAuthState } from '@kaels/casileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

const storePath = './store.json'

const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')

   const sock = makeWASocket({ logger: pino({ level: 'silent' }), auth: state })

   const store = makeInMemoryStore({ logger: pino({ level: 'silent' }), socket: sock })
   store.bind(sock.ev)

   sock.ev.on('creds.update', saveCreds)

   // Baca store dari file
   store.readFromFile(storePath)

   // Simpan store setiap 3 menit
   setInterval(() => store.writeToFile(storePath), 180_000)
}

connectToWhatsApp()
```

---

## 🪪 WhatsApp IDs Explain

| Format | Keterangan |
|---|---|
| `628xxx@s.whatsapp.net` | User biasa |
| `628xxx@lid` | User dengan Local Identifier |
| `123456789-123456@g.us` | Grup |
| `11111111111@bot` | Meta AI |
| `status@broadcast` | Stories |
| `[timestamp]@broadcast` | Broadcast list |

---

## ✉️ Sending Messages

> [!NOTE]
> `jid` bisa diambil dari `message.key.remoteJid`.

### 🔠 Text

```javascript
// Teks biasa
sock.sendMessage(jid, { text: '👋🏻 Hello' }, { quoted: message })

// Dengan link preview
sock.sendMessage(jid, {
   text: 'https://www.npmjs.com/package/@kaels/casileys 👆🏻 Check it out!',
   linkPreview: {
      'matched-text': 'https://www.npmjs.com/package/@kaels/casileys',
      title: '🌸 @kaels/casileys',
      description: 'WhatsApp Web API',
      previewType: 0,
      jpegThumbnail: fs.readFileSync('./path/to/image.jpg')
   }
})
```

### 🔔 Mention

```javascript
// Mention spesifik
sock.sendMessage(jid, {
   text: '👋🏻 Hello @628123456789',
   mentions: ['628123456789@s.whatsapp.net']
}, { quoted: message })

// Mention semua member grup
sock.sendMessage(jid, {
   text: '👋🏻 Hello @all',
   mentionAll: true
}, { quoted: message })
```

### 😁 Reaction

```javascript
sock.sendMessage(jid, {
   react: { key: message.key, text: '✨' }
})
```

### 📌 Pin Message

```javascript
sock.sendMessage(jid, {
   pin: message.key,
   time: 86400, // 86400 (1d) | 604800 (7d) | 2592000 (30d)
   type: 1      // 2 untuk unpin
})
```

### ➡️ Forward Message

```javascript
sock.sendMessage(jid, { forward: message, force: true })
```

### 👤 Contact

```javascript
const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Kaelz\nTEL;type=CELL;waid=628123456789:+62 812 3456 789\nEND:VCARD'

sock.sendMessage(jid, {
   contacts: { displayName: 'Kaelz', contacts: [{ vcard }] }
}, { quoted: message })
```

### 📍 Location

```javascript
sock.sendMessage(jid, {
   location: { degreesLatitude: -6.2, degreesLongitude: 106.8, name: '📍 Jakarta' }
}, { quoted: message })
```

### 🗓️ Event

```javascript
sock.sendMessage(jid, {
   event: {
      name: '🎶 Meet & Mingle',
      description: 'Gathering seru bareng komunitas!',
      call: 'audio',
      startDate: new Date(Date.now() + 3_600_000),
      endDate: new Date(Date.now() + 28_800_000),
      location: { name: 'Jakarta', degreesLatitude: -6.2, degreesLongitude: 106.8 }
   }
}, { quoted: message })
```

### 📊 Poll

```javascript
// Poll biasa
sock.sendMessage(jid, {
   poll: {
      name: '🔥 Pilih yang terbaik!',
      values: ['Option A', 'Option B'],
      selectableCount: 1
   }
}, { quoted: message })
```

### 💭 Button Response

```javascript
// Plain button reply
sock.sendMessage(jid, {
   type: 'plain',
   buttonReply: { id: '#Menu', displayText: '✨ Menu' }
}, { quoted: message })

// Interactive flow reply
sock.sendMessage(jid, {
   flowReply: {
      format: 0,
      text: '💭 Response',
      name: 'menu_options',
      paramsJson: JSON.stringify({ id: '#Menu', description: 'Menu Utama' })
   }
}, { quoted: message })

// List reply
sock.sendMessage(jid, {
   listReply: { title: '📄 See More', description: '✨ Menu', id: '#Menu' }
}, { quoted: message })
```

### ✨ Rich Response

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Contoh Rich Response',
   richResponse: [
      { text: 'Contoh penggunaan:' },
      { language: 'javascript', code: [{ highlightType: 0, codeContent: 'console.log("Hello!")' }] },
      { text: 'Mudah, kan?' }
   ]
})
```

> [!TIP]
> Import `tokenizeCode` untuk syntax highlighting otomatis:
> ```javascript
> import { tokenizeCode } from '@kaels/casileys'
> ```

### 🧾 Message with Code Block

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Code Block',
   headerText: '## Contoh Kode',
   contentText: '---',
   code: 'console.log("Hello, World!")',
   language: 'javascript',
   footerText: 'Simpel kan?'
})
```

### 🌏 Message with Inline Entities (Links)

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Link List',
   headerText: '## Useful Links',
   contentText: '---',
   links: [
      { text: '1. npm', title: 'Package Registry', url: 'https://npmjs.com' },
      { text: '2. GitHub', title: 'Source Code', url: 'https://github.com' }
   ],
   footerText: '---'
})
```

### 📋 Message with Table

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Tabel Perbandingan',
   headerText: '## Node.js vs Bun vs Deno',
   contentText: '---',
   title: 'Runtime Comparison',
   table: [
      ['', 'Node.js', 'Bun', 'Deno'],
      ['Engine', 'V8', 'JavaScriptCore', 'V8'],
      ['Performance', '4/5', '5/5', '4/5']
   ],
   footerText: 'Pilih yang sesuai kebutuhan!'
})
```

---

## 📁 Sending Media Messages

> [!NOTE]
> Media bisa dikirim sebagai `Buffer`, `{ stream: Readable }`, atau `{ url: string }` (path lokal / URL).

### 🖼️ Image

```javascript
sock.sendMessage(jid, {
   image: { url: './path/to/image.jpg' },
   caption: '🔥 Keren!'
}, { quoted: message })
```

### 🎥 Video

```javascript
sock.sendMessage(jid, {
   video: { url: './path/to/video.mp4' },
   gifPlayback: false, // true untuk GIF
   ptv: false,         // true untuk PTV
   caption: '🎬 Video keren!'
}, { quoted: message })
```

### 📃 Sticker

```javascript
sock.sendMessage(jid, {
   sticker: { url: './path/to/sticker.webp' }
}, { quoted: message })
```

### 💽 Audio

```javascript
sock.sendMessage(jid, {
   audio: { url: './path/to/audio.mp3' },
   ptt: false // true untuk Voice Note
}, { quoted: message })
```

### 🗂️ Document

```javascript
sock.sendMessage(jid, {
   document: { url: './path/to/file.pdf' },
   mimetype: 'application/pdf',
   caption: '📄 Dokumen'
}, { quoted: message })
```

### 🖼️ Album (Image & Video)

```javascript
sock.sendMessage(jid, {
   album: [
      { image: { url: './img1.jpg' }, caption: 'Foto 1' },
      { video: { url: './vid1.mp4' }, caption: 'Video 1' },
      { image: { url: './img2.jpg' }, caption: 'Foto 2' }
   ]
}, { quoted: message })
```

### 📦 Sticker Pack

> [!IMPORTANT]
> Jika `sharp` atau `@napi-rs/image` tidak terinstall, `cover` dan `stickers` harus sudah dalam format WebP.

```javascript
sock.sendMessage(jid, {
   cover: { url: './cover.webp' },
   stickers: [
      { data: { url: './sticker1.webp' } },
      { data: { url: './sticker2.webp' } }
   ],
   name: '📦 Sticker Pack Keren',
   publisher: 'Kaelz',
   description: '@kaels/casileys'
}, { quoted: message })
```

---

## 👉🏻 Sending Interactive Messages

### 🔘 Buttons

```javascript
// Button teks biasa
sock.sendMessage(jid, {
   text: '👆🏻 Pilih salah satu!',
   footer: '@kaels/casileys',
   buttons: [{ text: '👋🏻 Halo', id: '#Halo' }]
}, { quoted: message })

// Button dengan media & native flow
sock.sendMessage(jid, {
   image: { url: './path/to/image.jpg' },
   caption: '👆🏻 Button + List!',
   footer: '@kaels/casileys',
   buttons: [{
      text: '📋 Pilih',
      sections: [{
         title: '✨ Section 1',
         rows: [{ title: '🏷️ Opsi A', description: '', id: '#OpsiA' }]
      }]
   }]
}, { quoted: message })
```

### 📋 List

> [!NOTE]
> Hanya berfungsi di private chat (`@s.whatsapp.net`).

```javascript
sock.sendMessage(jid, {
   text: '📋 Pilih menu!',
   footer: '@kaels/casileys',
   buttonText: '📋 Buka Menu',
   title: '👋🏻 Menu Bot',
   sections: [{
      title: '🚀 Kategori 1',
      rows: [{ title: '✨ Fitur A', description: 'Deskripsi singkat', rowId: '#FiturA' }]
   }]
}, { quoted: message })
```

### 🗄️ Interactive (Native Flow)

```javascript
// Native flow dengan berbagai tipe button
sock.sendMessage(jid, {
   image: { url: './path/to/image.jpg' },
   caption: '🗄️ Interactive Menu!',
   footer: '@kaels/casileys',
   optionText: '👉🏻 Pilih Opsi',   // optional, wrap semua jadi satu list
   optionTitle: '📄 Opsi Tersedia', // optional
   nativeFlow: [
      { text: '👋🏻 Greeting', id: '#Greeting', icon: 'review' },
      { text: '📞 Telepon', call: '628123456789' },
      { text: '📋 Copy', copy: '@kaels/casileys' },
      { text: '🌐 Buka Web', url: 'https://www.npmjs.com/package/@kaels/casileys', useWebview: true },
      {
         text: '📋 Pilih dari List',
         sections: [{
            title: '✨ Pilihan',
            rows: [{ title: '🏷️ Opsi 1', description: '', id: '#Opsi1' }]
         }],
         icon: 'default'
      }
   ]
}, { quoted: message })

// Carousel
sock.sendMessage(jid, {
   text: '🎠 Carousel!',
   footer: '@kaels/casileys',
   cards: [{
      image: { url: './img1.jpg' },
      caption: '🖼️ Slide 1',
      footer: '📸 Caption',
      nativeFlow: [{ text: '🌐 Detail', url: 'https://npmjs.com', useWebview: true }]
   }, {
      image: { url: './img2.jpg' },
      caption: '🖼️ Slide 2',
      footer: '📸 Caption',
      nativeFlow: [{ text: '👍 Pilih', id: '#Pilih2' }]
   }]
}, { quoted: message })

// Native Flow dengan audio footer
sock.sendMessage(jid, {
   text: '🎵 Dengarkan dulu!',
   audioFooter: { url: './audio.mp3' },
   nativeFlow: [
      { text: '👍🏻 Lanjut', id: '#Next', icon: 'review' },
      { text: '👎🏻 Skip', id: '#Skip', icon: 'default' }
   ]
}, { quoted: message })
```

### 🫙 Hydrated Template

```javascript
sock.sendMessage(jid, {
   title: '👋🏻 Halo!',
   image: { url: './path/to/image.jpg' },
   caption: '🫙 Template Message',
   footer: '@kaels/casileys',
   templateButtons: [
      { text: '👉🏻 Klik Sini', id: '#Klik' },
      { text: '🌐 Website', url: 'https://www.npmjs.com/package/@kaels/casileys' },
      { text: '📞 Hubungi', call: '628123456789' }
   ]
}, { quoted: message })
```

---

## 💳 Sending Payment Messages

```javascript
// Invite payment
sock.sendMessage(jid, { paymentInviteServiceType: 3 }) // 1, 2, atau 3

// Order
sock.sendMessage(jid, {
   orderText: '🛍️ Pesanan Kamu',
   thumbnail: fs.readFileSync('./thumbnail.jpg')
}, { quoted: message })

// Request payment
sock.sendMessage(jid, {
   text: '💳 Minta Pembayaran',
   requestPaymentFrom: '0@s.whatsapp.net'
})
```

---

## 👁️ Other Message Options

| Flag | Keterangan |
|---|---|
| `ai: true` | Tambah ikon AI (private chat only) |
| `ephemeral: true` | Wrap ke `ephemeralMessage` |
| `viewOnce: true` | View once (V1) |
| `viewOnceV2: true` | View once (V2) |
| `spoiler: true` | Wrap ke `spoilerMessage` |
| `groupStatus: true` | Group status (grup only) |
| `isLottie: true` | Lottie sticker |
| `mentionAll: true` | Mention semua member grup |
| `interactiveAsTemplate: true` | Wrap interactive ke template |
| `raw: true` | Kirim struktur proto manual |

```javascript
// Contoh: view once + spoiler
sock.sendMessage(jid, {
   image: { url: './image.jpg' },
   caption: '👁️ Lihat sekali aja!',
   viewOnceV2: true
}, { quoted: message })

// External Ad Reply
sock.sendMessage(jid, {
   text: '📰 Info Penting!',
   externalAdReply: {
      title: '📝 Tahukah kamu?',
      body: 'Fakta menarik hari ini',
      thumbnail: fs.readFileSync('./thumbnail.jpg'),
      largeThumbnail: false,
      url: 'https://www.npmjs.com/package/@kaels/casileys'
   }
}, { quoted: message })
```

---

## ♻️ Modify Messages

```javascript
// Hapus pesan
sock.sendMessage(jid, { delete: message.key })

// Edit teks
sock.sendMessage(jid, { text: '✏️ Teks yang sudah diedit', edit: message.key })

// Edit caption media
sock.sendMessage(jid, { caption: '✏️ Caption baru', edit: message.key })
```

---

## 🧰 Additional Contents

### 🏷️ Find User ID (JID | PN / LID)

> [!NOTE]
> ID harus berupa angka saja (tanpa +, (), atau -) dan menyertakan kode negara.

```javascript
const ids = await sock.findUserId('6281111111111@s.whatsapp.net')
console.log(ids)
// Output: { phoneNumber: '6281111111111@s.whatsapp.net', lid: '43411111111111@lid' }
```

### 🔑 Request Custom Pairing Code

```javascript
const code = await sock.requestPairingCode('6281111111111', 'KAELZBASE')
console.log('🔗 Pairing code:', code)
```

### 🖼️ Image Processing

> [!NOTE]
> Otomatis menggunakan library yang tersedia: `sharp`, `@napi-rs/image`, atau `jimp`.

```javascript
import { getImageProcessingLibrary } from '@kaels/casileys'

const lib = await getImageProcessingLibrary()

// Jika sharp tersedia
if (lib.sharp?.default) {
   const output = await lib.sharp.default('./image.jpg')
      .resize(512)
      .jpeg({ quality: 80 })
      .toBuffer()
}
```

### 👥 Group Management

```javascript
// Buat grup
const group = await sock.groupCreate('Nama Grup', ['628xxx@s.whatsapp.net'])

// Metadata
const metadata = await sock.groupMetadata(jid)

// Kelola member
sock.groupParticipantsUpdate(jid, ['628xxx@s.whatsapp.net'], 'add')     // tambah
sock.groupParticipantsUpdate(jid, ['628xxx@s.whatsapp.net'], 'remove')  // kick
sock.groupParticipantsUpdate(jid, ['628xxx@s.whatsapp.net'], 'promote') // jadikan admin
sock.groupParticipantsUpdate(jid, ['628xxx@s.whatsapp.net'], 'demote')  // copot admin

// Setting grup
sock.groupSettingUpdate(jid, 'announcement')  // hanya admin bisa chat
sock.groupSettingUpdate(jid, 'not_announcement') // semua bisa chat
sock.groupSettingUpdate(jid, 'locked')        // hanya admin edit info
sock.groupSettingUpdate(jid, 'unlocked')      // semua bisa edit info
sock.groupToggleEphemeral(jid, 86400)         // aktifkan pesan sementara
sock.groupJoinApprovalMode(jid, 'on')         // aktifkan persetujuan member

// Invite
const inviteCode = await sock.groupInviteCode(jid)
sock.groupRevokeInvite(jid)
sock.groupAcceptInvite(inviteCode)
sock.groupLeave(jid)
```

### 👥 Community Management

```javascript
const community = await sock.communityCreate('Nama Komunitas', 'Deskripsi')
const group = await sock.communityCreateGroup('Announcements', ['628xxx@s.whatsapp.net'], communityJid)

sock.communityLinkGroup(groupJid, communityJid)
sock.communityUnlinkGroup(groupJid, communityJid)
sock.communityLeave(jid)
```

### 👤 Profile Management

```javascript
sock.updateProfilePicture(jid, { url: './photo.jpg' })
sock.removeProfilePicture(jid)
sock.updateProfileName('Nama Baru')
sock.updateProfileStatus('Status baru')
sock.sendPresenceUpdate('available', jid)
sock.readMessages([message.key])
sock.updateBlockStatus(jid, 'block')    // blokir
sock.updateBlockStatus(jid, 'unblock')  // buka blokir
```

### 🔐 Privacy Management

```javascript
sock.updateLastSeenPrivacy('all')          // semua bisa lihat
sock.updateLastSeenPrivacy('contacts')     // kontak saja
sock.updateLastSeenPrivacy('nobody')       // tidak ada
sock.updateOnlinePrivacy('all')
sock.updateProfilePicturePrivacy('contacts')
sock.updateReadReceiptsPrivacy('all')
sock.updateReadReceiptsPrivacy('none')
sock.updateCallPrivacy('everyone')
sock.updateDefaultDisappearingMode(86400)
```

### 📣 Newsletter Management

```javascript
sock.newsletterCreate('Nama Channel', 'Deskripsi')
sock.newsletterFollow('jid@newsletter')
sock.newsletterUnfollow('jid@newsletter')
sock.newsletterMute('jid@newsletter')
sock.newsletterUnmute('jid@newsletter')
sock.newsletterUpdateName('jid@newsletter', 'Nama Baru')
sock.newsletterUpdateDescription('jid@newsletter', 'Deskripsi baru')
sock.newsletterReactMessage('jid@newsletter', '100', '💛')
sock.newsletterDelete('jid@newsletter')
```

### 📡 Events

```javascript
sock.ev.on('connection.update', (update) => {})
sock.ev.on('creds.update', (update) => {})
sock.ev.on('messages.upsert', (update) => {})
sock.ev.on('messages.update', (update) => {})
sock.ev.on('messages.delete', (update) => {})
sock.ev.on('messages.reaction', (update) => {})
sock.ev.on('groups.upsert', (update) => {})
sock.ev.on('groups.update', (update) => {})
sock.ev.on('group-participants.update', (update) => {})
sock.ev.on('contacts.upsert', (update) => {})
sock.ev.on('contacts.update', (update) => {})
sock.ev.on('chats.upsert', (update) => {})
sock.ev.on('chats.update', (update) => {})
sock.ev.on('presence.update', (update) => {})
sock.ev.on('blocklist.set', (update) => {})
sock.ev.on('blocklist.update', (update) => {})
sock.ev.on('call', (update) => {})
sock.ev.on('newsletter.reaction', (update) => {})
sock.ev.on('newsletter.view', (update) => {})
sock.ev.on('settings.update', (update) => {})
```

---

## 📣 Credits

Kredit penuh diberikan kepada para maintainer dan kontributor asli Baileys:

- [purpshell](https://github.com/purpshell)
- [jlucaso1](https://github.com/jlucaso1)
- [adiwajshing](https://github.com/adiwajshing)

Terima kasih khusus kepada:
- **[itsliaaa](https://github.com/itsliaaa)** — atas fork [`@itsliaaa/baileys`](https://www.npmjs.com/package/@itsliaaa/baileys) yang menjadi fondasi awal package ini. Maaf atas kurangnya atribusi sebelumnya.
- **[itsreimau](https://github.com/itsreimau)** — atas perbaikan implementasi `updateBlockStatus`.
- **[WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)** — upstream library yang menjadi dasar dari semuanya.

> [!CAUTION]
> ⚠️ Modifikasi, penghapusan, atau kesalahan representasi kredit ini dilarang keras. Setiap redistribusi atau fork harus mempertahankan bagian ini dalam bentuk aslinya.
