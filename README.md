
<h1 align="center">🌱 Casileys</h1>
<p align="center">
  <img src="./casileys-header.gif" alt="Casileys" width="100%">
</p>


<p align="center">
  A WhatsApp Web API library for Node.js, based on Baileys and extended with additional message types, media handling, interactive messages, newsletter support, and more.
</p>

<p align="center">
  <b>v0.5.0</b> — Core synced with latest upstream base (WAProto refresh + 40+ stability fixes) while keeping every Casileys-unique feature intact.
</p>

<p align="center">
  <a href="https://npmjs.com/package/@kaels/casileys"><img src="https://img.shields.io/npm/v/@kaels/casileys?style=for-the-badge&logo=npm"/></a>
  <a href="https://npmjs.com/package/@kaels/casileys"><img src="https://img.shields.io/npm/dm/@kaels/casileys?style=for-the-badge&logo=npm"/></a>
  <a href="https://github.com/kyleee-max/casileys"><img src="https://img.shields.io/github/stars/kyleee-max/casileys?style=for-the-badge&logo=github"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge"/></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&labelColor=green&logoColor=white&style=for-the-badge"/></a>
  <a href="#"><img src="https://img.shields.io/badge/ESM-only?logo=javascript&labelColor=yellow&logoColor=black&style=for-the-badge"/></a>
</p>

---

## ✨ Highlights

| Feature | Support |
|---|:---:|
| WhatsApp Web / Multi-device | ✅ |
| Pairing Code | ✅ |
| Text & Media Messages | ✅ |
| Albums | ✅ |
| Polls | ✅ |
| Interactive Messages | ✅ |
| Message Builders (Button V1/V2/V3, Carousel, NativeFlow, A2UI) | ✅ |
| Rich Responses | ✅ |
| Inline Entities | ✅ |
| Tables | ✅ |
| Group Status | ✅ |
| Status Broadcast | ✅ |
| Sticker Pack | ✅ |
| Newsletter Messages | ✅ |
| Group Management | ✅ |
| Community Management | ✅ |
| Profile Management | ✅ |
| Business Features | ✅ |
| Privacy Management | ✅ |
| Message Editing & Deletion | ✅ |
| Anti-Delete Handler | ✅ |
| Message Search | ✅ |
| Templates & VCard | ✅ |

Casileys is designed to remain readable and auditable while extending the functionality available from its upstream fork.

---

## 🆕 What's New in 0.5.0

This release syncs the core with the latest upstream base while preserving every Casileys-unique feature.

**Core sync**

- WAProto updated to the 26-08 refresh (138 new protocol types, superset of the previous schema)
- 40+ stability fixes merged from upstream (connection validation, decrypt handling, media upload, appPatch performance, phash retry, newsletter request shape, dll)
- Socket chain now includes the `username` layer (`checkUsername` / `setUsername`)
- New Utils modules: `status.js`, `anti-delete`, `message-search`, `templates`, `vcard`, `stickerpack`, `media-set`, `PersistentStore`, dll

**New: Message Builders suite**

- Full builder suite under `lib/Builders/`: `AIRich` v5, `Button` / `ButtonV2` / `ButtonV3`, `Carousel`, `NativeFlow`, `Poll`, `A2UI`, `Album`, `Contact`, `Location`, `LinkPreview`
- `sock.createAIRich()` hook retained for backward compatibility — now backed by the refactored `AIRich` v5 (fixes early "Baca selengkapnya" bubble collapse via `originalRecipientMetadata`)

**New: Status Broadcast helper**

- `StatusHelper` + `createTextStatus` / `createImageStatus` / `createVideoStatus` / `createAudioStatus` for posting to `status@broadcast` with styled backgrounds, fonts, and mentions

**Preserved Casileys features**

- `resolveMentionedPn()` — LID → PN mapping into `contextInfo.mentionedPn`
- `group-status.js` helper — `sendGroupStatusText` / `Image` / `Video` / `Audio` / `Sticker` + WebP conversion
- `WA_AUTHOR_URL` + `CASILEYS_NAME` branding constants

**Removed (out of scope)**

- `Framework/`, `VoIP/`, `assets/wasm/` — not included in this release

---

## 🛠️ Internal Adjustments

Casileys retains the existing message and protocol implementations from its fork base while adding project-specific improvements.

Some of the included changes cover:

- Newsletter media handling
- `makeInMemoryStore` support
- Extended interactive message support
- Album messages
- Group status messages
- Additional message wrappers
- Extended media handling
- Direct `externalAdReply` access
- Additional newsletter, group, community, profile, business, and privacy utilities
- Casileys Group Status Helper
- Casileys Status Broadcast helper (`StatusHelper`)
- Casileys `resolveMentionedPn` (LID → PN mapping for mentioned users)
- Message Builders suite (AIRich v5, Button V1/V2/V3, Carousel, NativeFlow, Poll, A2UI, Contact, Location, Album, LinkPreview)
- Anti-delete handler, message search, templates, vcard, stickerpack utilities
- Persistent Store (SQLite / MySQL / Postgres / Mongo / Redis adapters)

---

## 📨 Message Compatibility

The message layer supports the following extended structures:

| Message Type | Available |
|---|:---:|
| Album | ✅ |
| Group Status | ✅ |
| Interactive | ✅ |
| Status Mention | ✅ |
| Sticker Pack | ✅ |
| Rich Response | ✅ |
| Code Block | ✅ |
| Inline Entities | ✅ |
| Table | ✅ |
| Payment-related Messages | ✅ |
| External Ad Reply | ✅ |
| View Once Variants | ✅ |
| Ephemeral | ✅ |
| Spoiler | ✅ |
| Lottie Sticker | ✅ |
| Raw Message | ✅ |

---

## 📥 Installation

**package.json**

```json
"dependencies": {
   "@kaels/casileys": "latest"
}
```

**GitHub**

```json
"dependencies": {
   "@kaels/casileys": "github:kyleee-max/casileys"
}
```

**Terminal**

```bash
npm i @kaels/casileys@latest
```

Or directly from GitHub:

```bash
npm i github:kyleee-max/casileys
```

---

## 🧩 Import

**ESM**

```js
import { makeWASocket } from '@kaels/casileys'
```

**CJS**

```js
const { makeWASocket } = require('@kaels/casileys')
```

---

## 🌐 Connect to WhatsApp

```js
import { makeWASocket, delay, DisconnectReason, useMultiFileAuthState } from '@kaels/casileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

// --- Connect with pairing code
const myPhoneNumber = '6288888888888'

const logger = pino({ level: 'silent' })

const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')

   const sock = makeWASocket({
      logger,
      auth: state
   })
   sock.ev.on('creds.update', saveCreds)
   sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'connecting' && !sock.authState.creds.registered) {
         await delay(1500)
         const code = await sock.requestPairingCode(myPhoneNumber)
         console.log('🔗 Pairing code', ':', code)
      }
      else if (connection === 'close') {
         const shouldReconnect = new Boom(connection?.lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log('⚠️ Connection closed because', lastDisconnect.error, ', reconnecting ', shouldReconnect)
         if (shouldReconnect) {
            connectToWhatsApp()
         }
      }
      else if (connection === 'open') {
         console.log('✅ Successfully connected to WhatsApp')
      }
   })
   sock.ev.on('messages.upsert', async ({ messages }) => {
      for (const message of messages) {
         if (!message.message) continue

         console.log('🔔 Got new message', ':', message)
         await sock.sendMessage(message.key.remoteJid, {
            text: '👋🏻 Hello world'
         })
      }
   })
}

connectToWhatsApp()
```

---

## 🔐 Auth State

You can use `useMultiFileAuthState` as the default authentication state implementation.

Experimental alternatives such as `useSingleFileAuthState` and `useSqliteAuthState` may also be used where supported.

---

## 🗄️ Data Store

```js
import { makeWASocket, makeInMemoryStore, delay, DisconnectReason, useMultiFileAuthState } from '@kaels/casileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

const myPhoneNumber = '6288888888888'

// --- Create your store path
const storePath = './store.json'

const logger = pino({ level: 'silent' })
const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')

   const sock = makeWASocket({
      logger,
      auth: state
   })

   const store = makeInMemoryStore({
      logger,
      socket: sock
   })

   store.bind(sock.ev)

   sock.ev.on('creds.update', saveCreds)
   sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'connecting' && !sock.authState.creds.registered) {
         await delay(1500)
         const code = await sock.requestPairingCode(myPhoneNumber)
         console.log('🔗 Pairing code', ':', code)
      }
      else if (connection === 'close') {
         const shouldReconnect = new Boom(connection?.lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log('⚠️ Connection closed because', lastDisconnect.error, ', reconnecting ', shouldReconnect)
         if (shouldReconnect) {
            connectToWhatsApp()
         }
      }
      else if (connection === 'open') {
         console.log('✅ Successfully connected to WhatsApp')
      }
   })
   sock.ev.on('chats.upsert', () => {
      console.log('✉️ Got chats', store.chats.all())
   })

   sock.ev.on('contacts.upsert', () => {
      console.log('👥 Got contacts', Object.values(store.contacts))
   })

   // --- Read store from file
   store.readFromFile(storePath)

   // --- Save store every 3 minutes
   setInterval(() => {
      store.writeToFile(storePath)
   }, 180000)
}

connectToWhatsApp()
```

> **Note:** For large applications, consider using a dedicated persistent data store instead of keeping the entire chat history in memory.

---

## 🪪 WhatsApp IDs

`jid` identifies the WhatsApp account, group, broadcast destination, newsletter, or status target involved in an operation.

| Target | Format |
|---|---|
| User | `[country code][phone]@s.whatsapp.net` |
| LID | `[id]@lid` |
| Group | `[id]@g.us` |
| Meta AI | `[id]@bot` |
| Broadcast | `[timestamp]@broadcast` |
| Status | `status@broadcast` |
| Newsletter | `[id]@newsletter` |

For incoming messages, the destination is commonly available through:

```js
message.key.remoteJid
```

---

## ✉️ Sending Messages

### 🔠 Text

```js
// --- Send a regular text message
sock.sendMessage(jid, {
   text: '👋🏻 Hello'
}, {
   quoted: message
})

// --- Send a text message with a link preview
const urlA = 'https://www.npmjs.com/package/@kaels/casileys'
sock.sendMessage(jid, {
   text: urlA + ' 👆🏻 Check it out!',
   linkPreview: {
      'matched-text': urlA,
      title: '🌱 Casileys',
      description: 'WhatsApp Web API for Node.js',
      previewType: 0, // --- Use 1 for video playback in the link preview
      jpegThumbnail: fs.readFileSync('./path/to/image.jpg')
   }
})

// --- Send a text message with a large link preview and favicon
import { prepareWAMessageMedia } from '@kaels/casileys'
const urlB = 'https://www.npmjs.com/package/@kaels/casileys#readme'

const { imageMessage: image } = await prepareWAMessageMedia({
   image: {
      url: './path/to/image.jpg'
   }
}, {
   upload: sock.waUploadToServer,
   mediaTypeOverride: 'thumbnail-link'
})

// --- Set the thumbnail display size
image.height = 720
image.width = 480
sock.sendMessage(jid, {
   text: urlB + ' 👆🏻 Check it out!',
   linkPreview: {
      'matched-text': urlB,
      title: '🌱 Casileys',
      description: 'WhatsApp Web API for Node.js',
      previewType: 0,
      jpegThumbnail: fs.readFileSync('./path/to/image.jpg'),
      highQualityThumbnail: image,
      linkPreviewMetadata: {
         linkMediaDuration: 0, // --- Duration in seconds (for video/audio content)
         socialMediaPostType: 1, // --- Enum: 0 = NONE, 1 = REEL, 2 = LIVE_VIDEO, 3 = LONG_VIDEO, 4 = SINGLE_IMAGE, 5 = CAROUSEL
      } // --- Additional metadata for large link preview
   },
   favicon: {
      url: './path/to/tiny-image.ico'
   }
})
```

### 🔔 Mention

```js
// --- Regular mention
sock.sendMessage(jid, {
   text: '👋🏻 Hello @628123456789',
   mentions: ['628123456789@s.whatsapp.net']
}, {
   quoted: message
})

// --- Mention all
sock.sendMessage(jid, {
   text: '👋🏻 Hello @all',
   mentionAll: true
}, {
   quoted: message
})
```

### 😁 Reaction

```js
sock.sendMessage(jid, {
   react: {
      key: message.key,
      text: '✨'
   }
})
```

### 📌 Pin Message

```js
sock.sendMessage(jid, {
   pin: message.key,
   time: 86400, // --- Set the value in seconds: 86400 (1d), 604800 (7d), or 2592000 (30d)
   type: 1 // --- Or 2 to remove
})
```

### 🔖 Keep Chat

> **Note:** Keep Chat can only be used in chats or groups with disappearing messages enabled.

```js
sock.sendMessage(jid, {
   keep: message.key,
   type: 1 // --- Or 2 to remove
})
```

### ➡️ Forward Message

```js
sock.sendMessage(jid, {
   forward: message,
   force: true // --- Optional
})
```

### 👤 Contact

```js
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Casileys User\n'
            + 'ORG:Casileys;\n'
            + 'TEL;type=CELL;type=VOICE;waid=628123456789:+62 8123 4567 89\n'
            + 'END:VCARD'

sock.sendMessage(jid, {
   contacts: {
      displayName: 'Casileys User',
      contacts: [
         { vcard }
      ]
   }
}, {
   quoted: message
})
```

### 📍 Location

```js
sock.sendMessage(jid, {
   location: {
      degreesLatitude: 24.121231,
      degreesLongitude: 55.1121221,
      name: '👋🏻 I am here'
   }
}, {
   quoted: message
})
```

### 🗓️ Event

```js
sock.sendMessage(jid, {
   event: {
      name: '🎶 Meet & Mingle Party',
      description: 'Meet & Mingle Party is a fun, casual gathering to connect, chat, and build new relationships within the community.',
      call: 'audio', // --- Or "video", this field is optional
      startDate: new Date(Date.now() + 3600000),
      endDate: new Date(Date.now() + 28800000),
      isCancelled: false, // --- Optional
      isScheduleCall: false, // --- Optional
      extraGuestsAllowed: false, // --- Optional
      location: {
         name: 'Jakarta',
         degreesLatitude: -6.2,
         degreesLongitude: 106.8
      }
   }
}, {
   quoted: message
})
```

### 👥 Group Invite

```js
const inviteCode = groupUrl
   .split('chat.whatsapp.com/')[1]
   ?.split('?')[0]

const groupJid = '1201111111111@g.us'
const groupName = 'Casileys'

sock.sendMessage(jid, {
   groupInvite: {
      inviteCode,
      inviteExpiration: Date.now() + 86400000,
      text: '👋🏻 Hello, we invite you to join our group.',
      jid: groupJid,
      subject: groupName,
   }
}, {
   quoted: message
})
```

### 🛍️ Product

```js
import { randomUUID } from 'crypto'
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   body: '👋🏻 Check my product here!',
   footer: 'Casileys',
   product: {
      currencyCode: 'IDR',
      description: '🛍️ Interesting product!',
      priceAmount1000: 70_000_000,
      productId: randomUUID(),
      productImageCount: 1,
      salePriceAmount1000: 65_000_000,
      signedUrl: 'YOUR_PRODUCT_URL',
      title: '📦 Casileys Product',
      url: 'YOUR_PRODUCT_URL'
   },
   businessOwnerJid: '0@s.whatsapp.net'
})
```

### 📊 Poll

```js
// --- Regular poll message
sock.sendMessage(jid, {
   poll: {
      name: '🔥 Voting time',
      values: ['Yes', 'No'],
      selectableCount: 1,
      toAnnouncementGroup: false,
      endDate: new Date(Date.now() + 28800000), // --- Optional
      hideVoter: false, // --- Optional
      canAddOption: false // --- Optional
   }
}, {
   quoted: message
})

// --- Quiz (only for newsletter)
sock.sendMessage('1211111111111@newsletter', {
   poll: {
      name: '🔥 Quiz',
      values: ['Yes', 'No'],
      correctAnswer: 'Yes',
      pollType: 1
   }
}, {
   quoted: message
})

// --- Poll result
sock.sendMessage(jid, {
   pollResult: {
      name: '📝 Poll Result',
      votes: [{
         name: 'Nice',
         voteCount: 10
      }, {
         name: 'Nah',
         voteCount: 2
      }],
      pollType: 0 // Or 1 for quiz
   }
}, {
   quoted: message
})

// --- Poll update
sock.sendMessage(jid, {
   pollUpdate: {
      metadata: {},
      key: message.key
   }
}, {
   quoted: message
})
```

---

## 📁 Sending Media Messages

### 🖼️ Image

```js
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '🖼️ Image'
}, {
   quoted: message
})
```

### 🎥 Video

```js
sock.sendMessage(jid, {
   video: {
      url: './path/to/video.mp4'
   },
   caption: '🎥 Video'
}, {
   quoted: message
})
```

### 📃 Sticker

```js
sock.sendMessage(jid, {
   sticker: {
      url: './path/to/sticker.webp'
   }
}, {
   quoted: message
})
```

### 💽 Audio

```js
sock.sendMessage(jid, {
   audio: {
      url: './path/to/audio.mp3'
   },
   mimetype: 'audio/mpeg',
   ptt: false
}, {
   quoted: message
})
```

### 🗂️ Document

```js
sock.sendMessage(jid, {
   document: {
      url: './path/to/document.pdf'
   },
   mimetype: 'application/pdf',
   fileName: 'document.pdf',
   caption: '📄 Document'
}, {
   quoted: message
})
```

---

## 🖼️ Album

```js
sock.sendMessage(jid, {
   album: [
      {
         image: {
            url: './path/to/image-1.jpg'
         }
      },
      {
         image: {
            url: './path/to/image-2.jpg'
         }
      },
      {
         video: {
            url: './path/to/video.mp4'
         }
      }
   ]
}, {
   quoted: message
})
```

---

## 📦 Sticker Pack

```js
sock.sendMessage(jid, {
   stickerPack: {
      name: 'Casileys Pack',
      publisher: 'Casileys',
      description: 'Casileys sticker pack'
   }
}, {
   quoted: message
})
```

---

## 👉🏻 Interactive Messages

Casileys supports interactive content in two ways:

1. **Builders (recommended)** — chainable classes that validate input and auto-wire the correct wire format (media headers, `<biz>` nodes, per-button-type envelopes). Full docs: [Message Builders](#-message-builders).
2. **Raw protocol objects** — pass WhatsApp's message shapes straight to `sock.sendMessage()` if you already have them.

> ⚠️ The legacy `buttons:` field is capped at **3 quick-reply buttons** and does not render on every client. For URL/call/copy buttons, selection lists, or media headers, use the [`Button` builder](#-button--interactive-button-cards-recommended).

### Raw: legacy buttons (max 3)

```js
sock.sendMessage(jid, {
   buttons: [
      {
         buttonId: 'id1',
         buttonText: {
            displayText: 'Button 1'
         },
         type: 1
      },
      {
         buttonId: 'id2',
         buttonText: {
            displayText: 'Button 2'
         },
         type: 1
      }
   ],
   text: 'Select an option',
   footer: 'Casileys'
}, {
   quoted: message
})
```

### Raw: list

```js
sock.sendMessage(jid, {
   text: 'Select an option',
   footer: 'Casileys',
   title: 'Casileys Menu',
   buttonText: 'Open',
   sections: [
      {
         title: 'Menu',
         rows: [
            {
               title: 'Option 1',
               description: 'First option',
               rowId: 'option_1'
            },
            {
               title: 'Option 2',
               description: 'Second option',
               rowId: 'option_2'
            }
         ]
      }
   ]
}, {
   quoted: message
})
```

### Raw: native flow card

```js
sock.sendMessage(jid, {
   interactiveMessage: {
      body: {
         text: 'Casileys Interactive'
      },
      footer: {
         text: 'Select an action'
      },
      nativeFlowMessage: {
         buttons: [
            {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                  display_text: 'Open',
                  id: 'open'
               })
            }
         ]
      }
   }
}, {
   quoted: message
})
```

### Raw: hydrated template

```js
sock.sendMessage(jid, {
   hydratedTemplate: {
      hydratedContentText: 'Casileys',
      hydratedFooterText: 'WhatsApp Web API',
      hydratedButtons: [
         {
            quickReplyButton: {
               displayText: 'Open',
               id: 'open'
            }
         }
      ]
   }
}, {
   quoted: message
})
```

### Handling taps — `parseInteractiveReply()`

Whatever the user taps (quick reply, list row, native-flow button) comes back as a normal incoming message. `parseInteractiveReply()` reads it into one consistent shape:

```js
import { parseInteractiveReply } from '@kaels/casileys'

sock.ev.on('messages.upsert', ({ messages }) => {
   for (const m of messages) {
      if (!m.message) continue
      const reply = parseInteractiveReply(m.message)
      if (!reply.kind) continue

      // reply.kind        — 'buttons_response' | 'list_response' | 'native_flow_response' | 'template_button_reply'
      // reply.id          — the id you set when building (addReply id, rowId, ...)
      // reply.displayText — the label/title the user saw and tapped
      // reply.params      — parsed paramsJson for native-flow responses (null otherwise)
      console.log(reply.kind, reply.id, reply.displayText)
   }
})
```

To send a reply *as* an interactive response (e.g. Flows data-exchange or simulating a tap):

```js
await sock.sendMessage(jid, {
   flowReply: {
      name: 'quick_reply',
      text: 'Opened',
      paramsJson: JSON.stringify({ id: 'open' })
   }
})
```

---

## 🧱 Message Builders

Casileys ships a full builder suite under `lib/Builders/` — chainable, typed classes for constructing modern WhatsApp interactive content without hand-rolling raw protocol nodes.

| Builder | What it builds |
|---|---|
| `Button` / `ButtonV2` / `ButtonV3` | Interactive button messages (3 generations — see below) |
| `Carousel` | Swipeable card carousels (up to 10 cards) |
| `Poll` | Polls and quizzes |
| `NativeFlow` | Simplified CTA cards (quick reply, URL, copy, call, select) |
| `AIRich` | Rich AI-assistant-style response cards (headings, tables, code blocks, media, 40+ methods) |
| `Album` | Multi-photo / multi-video albums |
| `Contact` | Contact cards |
| `Location` | Location shares |
| `A2UI` | Bloks / A2UI widget messages (advanced — also reachable via `Button.setBloksWidget()`) |

All builders are exported from the package root and follow the same contract:

```js
import { Button, Carousel, Poll, NativeFlow, Album, Contact, Location, AIRich } from '@kaels/casileys'
```

- Chainable setters (`setBody()`, `addReply()`, …) all `return this`.
- Shared header/text methods from `BaseBuilder`: `setTitle()`, `setSubtitle()`, `setBody()`, `setFooter()`, `setContextInfo()`.
- `build(jid)` → returns the WAMessage object **without sending** (inspect it, relay it yourself, or compose it into another builder).
- `send(jid, options?)` → builds **and** relays via `sock.relayMessage()`; returns the WAMessage.

### 🔘 Button — interactive button cards (recommended)

`Button` builds WhatsApp's modern **native-flow** interactive messages: a header (text or image/video/document), body, footer, and any mix of button types — quick replies, open-URL, tap-to-call, copy-to-clipboard, selection lists, WhatsApp Flows, even full Bloks/A2UI widgets. This is the format current WhatsApp clients natively render.

> There are three generations — pick by compatibility need:
>
> | Builder | Wire format | Limits | Use when |
> |---|---|---|---|
> | `Button` | native-flow (`interactiveMessage`) | media headers, selection lists, Flows, Bloks | default choice |
> | `ButtonV2` | legacy `buttonsMessage` | max 3 quick-reply buttons | old clients must render the legacy format |
> | `ButtonV3` | hydrated template (`templateMessage`) | max 3 (reply / URL / call) | building on or editing an existing template message (`loadFrom()`) |

#### Quick start — quick-reply buttons

```js
import { Button } from '@kaels/casileys'

await new Button(sock)
  .setBody('Pick a color:')
  .setFooter('Casileys')
  .addReply('Red', 'color_red')
  .addReply('Blue', 'color_blue')
  .send(jid)
```

The user's tap comes back as a normal message — read it with `parseInteractiveReply()` (see [Handling taps](#handling-taps--parseinteractivereply)):

```js
import { parseInteractiveReply } from '@kaels/casileys'

const reply = parseInteractiveReply(m.message)
if (reply.kind === 'native_flow_response') {
  console.log(reply.id) // 'color_red' or 'color_blue'
}
```

#### Button types

| Method | What it does | Example |
|---|---|---|
| `addReply(label, id)` | Quick reply — sends `id` back on tap. `id` is required; WA silently drops replies without one. | `.addReply('Yes', 'yes')` |
| `addUrl(label, url, webview?)` | Opens a URL (system browser, or in-app webview if `webview` is `true`). | `.addUrl('Docs', 'https://example.com')` |
| `addCall(label, phone)` | Tap-to-dial. | `.addCall('Call us', '+15551234567')` |
| `addCopy(label, text)` | Copies text to the user's clipboard. | `.addCopy('Copy code', 'INVITE123')` |
| `addSelection(title)` → `makeSection()` → `makeRow()` | Picker list inside the card. See [Selection list](#selection-list-single_select). | see below |
| `addOpenWebview(title, url)` | Titled in-app webview. | `.addOpenWebview('Shop', 'https://shop.example')` |
| `addFlow(flow, label)` | WhatsApp Flows — requires a real registered Flow id. | `.addFlow({ id: 'FLOW_ID' }, 'Continue')` |
| `addLocation()` | Requests the user's live location. | `.addLocation()` |
| `addReminder(label, id)` / `addCancelReminder(label, id)` | Reminder chips. | — |
| `addAddress(label, id)` | Prompts the user's saved-address picker. | — |
| `addButton(name, params)` | Raw native-flow escape hatch (`params` = object or pre-stringified JSON). | — |

Business / payment helpers — require a WhatsApp Business account with the feature enabled; may render inert on regular accounts:
`addCatalog`, `addViewCatalog`, `addMultiProduct`, `addOrderDetails`, `addOrderStatus`, `addTrackOrder`, `addReorder`, `addCancelOrder`, `addPaymentInfo`, `addPaymentStatus`, `addPaymentMethod`, `addPaymentKeyInfo`, `addReviewAndPay`, `addTransactionDetails`, `addBookingConfirmation`, `addCardMessage`, `addCallPermission`, `addVoiceCall`, `addVideoCall`, `addClearChat`, `addNavigateToScreen`.

#### Selection list (single_select)

A picker list rendered inside the card. WhatsApp only renders `single_select` when it is mixed with other buttons — `Button` handles this automatically (a lone selection is transparently sent as a legacy list message instead).

```js
await new Button(sock)
  .setBody('Choose a menu:')
  .setFooter('Casileys')
  .addReply('Cancel', 'menu_cancel') // one extra button makes WA render the picker
  .addSelection('Menu')
    .makeSection('Food')
      .makeRow('', 'Fried rice', 'Classic', 'menu_rice')
      .makeRow('', 'Noodles', 'Spicy', 'menu_noodle')
    .makeSection('Drinks')
      .makeRow('', 'Tea', 'Hot/Iced', 'menu_tea')
  .send(jid)
```

`makeRow(header, title, description, id)` — `title` and `id` are required; the tapped row's `id` comes back as `reply.id`.

#### Media header

```js
await new Button(sock)
  .setImage('https://example.com/banner.jpg')
  .setBody('Look at this deal!')
  .setFooter('Casileys')
  .addUrl('Buy now', 'https://shop.example/item/1')
  .addReply('Maybe later', 'deal_later')
  .send(jid)
```

Every media setter accepts a URL **or** a Buffer: `.setImage(pathOrBuffer, options?)`, `.setVideo(pathOrBuffer, options?)`, `.setDocument(pathOrBuffer, options?)`. For fully custom media objects, `.setMedia(obj)` bypasses the shorthands.

#### Message-level extras

```js
await new Button(sock)
  .setBody('Limited offer!')
  .setLimitedTimeOffer({
    text: 'Ends in 2h',
    url: 'https://shop.example/sale',
    copy_code: 'SALE50',
    expiration_time: Math.floor(Date.now() / 1000) + 7200
  })
  .setBottomSheet({ in_thread_buttons_limit: 2, list_title: 'More options' }) // >2 buttons collapse into a bottom sheet
  .addReply('Grab it', 'sale_buy')
  .addReply('Details', 'sale_info')
  .addUrl('Share', 'https://shop.example/sale')
  .send(jid)
```

Also available: `.setTapTargetConfiguration({ title, description, canonical_url, domain, buttonIndex })` — a callout pointing at one specific button.

#### Bloks / A2UI widget

Real interactive UI screens (text fields, checkboxes, sliders, buttons that fire an `action`) via WhatsApp's Bloks engine. Pass a nested tree — ids are assigned automatically:

```js
await new Button(sock)
  .setBloksWidget({
    component: 'Column',
    children: [
      { component: 'Text', text: 'Feedback form' },
      { component: 'TextField', label: 'Your message' },
      {
        component: 'Button',
        variant: 'primary',
        action: { call: 'submit_feedback' },
        child: { component: 'Text', text: 'Send' }
      }
    ]
  })
  .send(jid)
```

Supported components: `Column`, `Row`, `Text`, `Icon`, `Divider`, `Image`, `Video`, `List`, `TextField`, `DateTimeInput`, `Slider`, `CheckBox`, `ChoicePicker`, `Button`, `Modal`, `Tabs`, `Card`, `AudioPlayer`. For sibling references (e.g. `Modal.trigger` pointing at an existing node), tag a node with `ref: 'name'` and point at it with `{ $ref: 'name' }`.

#### `build()` vs `send()` vs `toCard()`

```js
const btn = new Button(sock).setBody('Hi').addReply('OK', 'ok')

const card = await btn.toCard() // interactiveMessage content only — compose into Carousel
const msg  = await btn.build(jid) // full WAMessage, NOT sent — relay it yourself if needed
await btn.send(jid)               // build + sock.relayMessage() — what you usually want
```

#### Legacy quick card — `CardBuilder`

A thin shorthand for simple quick-reply cards:

```js
import { CardBuilder } from '@kaels/casileys'

await new CardBuilder(sock)
  .title('Menu')
  .text('Pick one')
  .button('Option A', 'opt_a') // max 3 — wraps addReply()
  .button('Option B', 'opt_b')
  .send(jid)
```

#### ButtonV2 — legacy `buttonsMessage`

Max 3 quick-reply buttons, widest support on old clients:

```js
import { ButtonV2 } from '@kaels/casileys'

await new ButtonV2(sock)
  .setBody('Legacy quick replies (max 3)')
  .setFooter('Casileys')
  .addButton('Yes', 'yes') // buttonId defaults to a random uuid
  .addButton('No', 'no')
  .send(jid)
```

Optional image header — uploaded and rendered as a real image header:

```js
await new ButtonV2(sock)
  .setTitle('Deal of the day')
  .setImage('https://example.com/banner.jpg') // URL or Buffer
  .setBody('Tap Yes to claim')
  .addButton('Claim', 'claim_yes')
  .send(jid)
```

Replies arrive as `buttons_response` (readable via `parseInteractiveReply()`). Also: `.addRawButton(obj)`, `.setMedia(obj)` (pre-built header object), `.setThumbnail(path)` (alias of `setImage()`), `.row(row => row.button(...))`.

#### ButtonV3 — hydrated template

Reply / URL / call buttons in the hydrated-template format; can also load and extend an existing template message:

```js
import { ButtonV3 } from '@kaels/casileys'

// Build fresh
await new ButtonV3(sock)
  .setTitle('Confirm')
  .setBody('Proceed with payment?')
  .setFooter('Casileys')
  .addReply('Confirm', 'pay_yes')
  .addUrl('Learn more', 'https://example.com/tos')
  .send(jid)

// Or load an existing templateMessage (e.g. one you quoted/fetched) and extend it
const existing = /* a message object containing .templateMessage */
await new ButtonV3(sock)
  .loadFrom(existing)
  .addReply('Extra option', 'extra')
  .send(jid)
```

### 🎠 Carousel — swipeable cards (max 10)

Cards are `Button` cards built with `toCard()`; each card **must** carry an image or video header:

```js
import { Button, Carousel } from '@kaels/casileys'

const card = (img, title, price, id) =>
  new Button(sock)
    .setImage(img)
    .setTitle(title)
    .setSubtitle(price)
    .setBody('Tap to view')
    .addUrl('View', `https://shop.example/item/${id}`)
    .toCard()

await new Carousel(sock)
  .setBody("Today's picks")
  .setFooter('Casileys')
  .addCard([
    await card('https://example.com/1.jpg', 'Item A', '$10', 'a'),
    await card('https://example.com/2.jpg', 'Item B', '$20', 'b')
  ])
  .send(jid)
```

### 📊 Poll

```js
import { Poll } from '@kaels/casileys'

await new Poll(sock)
  .setName('Lunch today?')
  .addOptions(['Pizza', 'Sushi', 'Burger']) // or chain .addOption('Pizza') one at a time
  .setMultiSelect()                        // allow multiple votes
  .setSelectable(2)                        // max choices per voter
  .setHideVoter()                          // hide who voted
  .send(jid)
```

Quiz mode: `.setQuiz('Pizza')` marks one option as correct. Also: `.setEndDate(date)`, `.setCanAddOption()`, `.setAnnouncementGroup()`.

### 🧩 NativeFlow — simplified CTA builder

A lighter alternative to `Button` with the common quick-reply / URL / copy / call / select set plus offer and surface helpers:

```js
import { NativeFlow } from '@kaels/casileys'

await new NativeFlow(sock)
  .setHeader('Flash sale', 'Up to 70% off')
  .setText('Hurry, stock is running out!')
  .setFooter('Casileys')
  .addQuickReply('Interested', 'sale_yes')
  .addUrl('Shop now', 'https://shop.example/sale')
  .addCopy('Copy voucher', 'SALE70')
  .send(jid)
```

Also: `.addCall(label, phone)`, `.addSingleSelect(title, sections)`, `.addRawButton(obj)`, `.setOffer({ text, url, code, expiration })`, `.setImage()` / `.setVideo()` / `.setDocument()` / `.setAudioFooter()`.

### 🖼️ Album — multi-photo / multi-video album

```js
import { Album } from '@kaels/casileys'

await new Album(sock)
  .addImage('./photo1.jpg', { caption: 'Day 1' })
  .addImage('./photo2.jpg')
  .addVideo('./clip.mp4')
  .send(jid)
```

Also: `.addItems(items)`, `.setDelay(ms)` (gap between messages), `.clearItems()`.

### 👤 Contact card

```js
import { Contact } from '@kaels/casileys'

await new Contact(sock)
  .setDisplayName('Support Team')
  .addContact({ name: 'Alice', phone: '+15551234567', org: 'Acme', email: 'alice@acme.com' })
  .send(jid)
```

Also: `.addRawVcard(displayName, vcard)`, `.clearContacts()`.

### 📍 Location

```js
import { Location } from '@kaels/casileys'

await new Location(sock)
  .setCoordinates(-6.2, 106.8)
  .setName('HQ')
  .setAddress('Jakarta, Indonesia')
  .send(jid)
```

### Quick start — `sock.createAIRich()` (rich AI cards)

Casileys keeps a convenience hook for the `AIRich` builder on the socket instance:

```js
const rich = sock.createAIRich()

rich.addHtml(`
  <h1>Hello from Casileys</h1>
  <p>Rich HTML rendered inside WhatsApp.</p>
`)

await rich.send(jid)
```

Or construct it directly:

```js
import { AIRich } from '@kaels/casileys'

const rich = new AIRich(sock)
rich.addHeading('Title')
rich.addParagraph('Body text')
await rich.send(jid)
```

Full AIRich docs (headings, tables, code blocks, media cards, 40+ methods): see [AIRich](#-airich--rich-html--rich-response-messages).

### Unified hub (optional)

A hub class wraps every builder behind short factory methods:

```js
import { CasileysBuilders } from '@kaels/casileys'

const cb = new CasileysBuilders(sock)

await cb.button().setBody('Hi').addReply('OK', 'ok').send(jid)  // Button
await cb.carousel().addCard(card).send(jid)                     // Carousel
await cb.poll().setName('Vote?').addOptions(['A', 'B']).send(jid) // Poll
await cb.airich().addHeading('Title').send(jid)                 // AIRich
```

Builder version is tracked independently:

```js
import { MESSAGE_BUILDER_VERSION } from '@kaels/casileys'
console.log(MESSAGE_BUILDER_VERSION) // '5.0'
```

---

## 📣 Status Broadcast

Casileys includes a lightweight helper for posting **status@broadcast** (the status tab everyone sees) with proper background colors, fonts, and mentions.

```js
import { StatusHelper, createTextStatus, STATUS_FONTS, STATUS_BACKGROUNDS } from '@kaels/casileys'
```

### One-liner send

```js
// Broadcast to everyone
await StatusHelper.send(sock, createTextStatus({ text: 'Hello world!' }))

// Broadcast to specific contacts only
await StatusHelper.send(sock, createTextStatus({ text: 'Hi!' }), [
  '628xxxx@s.whatsapp.net',
  '628yyyy@s.whatsapp.net'
])
```

### Styled text status

```js
await StatusHelper.send(sock, createTextStatus({
  text: 'Styled status!',
  backgroundColor: STATUS_BACKGROUNDS.gradient.sunset,
  font: STATUS_FONTS.DANCING,
  textColor: '#FFFFFF',
  mentions: ['628xxxx@s.whatsapp.net']
}))
```

### Image / video / audio / gif

```js
await StatusHelper.send(sock, StatusHelper.image(fs.readFileSync('./photo.jpg'), 'Caption here'))
await StatusHelper.send(sock, StatusHelper.videoUrl('https://example.com/video.mp4'))
await StatusHelper.send(sock, StatusHelper.gif(fs.readFileSync('./anim.gif')))
await StatusHelper.send(sock, StatusHelper.voiceNote(fs.readFileSync('./note.ogg')))
```

### Available fonts & backgrounds

```js
import { STATUS_FONTS, STATUS_BACKGROUNDS } from '@kaels/casileys'

STATUS_FONTS        // SANS_SERIF, SERIF, NORICAN, BRYNDAN, BEBASNEUE, OSWALD, DAMION, DANCING, COMFORTAA, EXOTWO
STATUS_BACKGROUNDS  // solid: { green, blue, purple, red, orange, yellow, pink, teal, gray, black, white }
                    // gradient: { sunset, ocean, forest, purple, midnight, aurora }
```

> For **group status** (status inside a specific group), use the dedicated `sendGroupStatus*` helpers documented in the [Group Status](#-group-status) section instead.

---

## 💳 Sending Payment Messages

Payment-related structures are exposed through the corresponding message types.

### ➕ Invite Payment

```js
sock.sendMessage(jid, {
   paymentInviteMessage: {
      serviceType: 3,
      expiryTimestamp: Math.floor(Date.now() / 1000) + 86400
   }
}, {
   quoted: message
})
```

### 🧾 Invoice

Invoice support depends on the currently supported WhatsApp message schema.

### 🛍️ Order

```js
sock.sendMessage(jid, {
   orderMessage: {
      orderId: 'ORDER_ID',
      itemCount: 1,
      status: 1,
      surface: 1,
      message: 'Casileys Order',
      orderTitle: 'Example Product',
      sellerJid: '0@s.whatsapp.net',
      token: 'ORDER_TOKEN'
   }
}, {
   quoted: message
})
```

### 💳 Request Payment

```js
sock.sendMessage(jid, {
   requestPaymentMessage: {
      currencyCodeIso4217: 'IDR',
      amount1000: 1000000,
      noteMessage: {
         extendedTextMessage: {
            text: 'Payment request'
         }
      }
   }
}, {
   quoted: message
})
```

---

## 👁️ Other Message Options

### 🤖 AI Icon

```js
sock.sendMessage(jid, {
   text: 'Casileys',
   ai: true
})
```

### 🕒 Ephemeral

```js
sock.sendMessage(jid, {
   ephemeral: true,
   text: 'Ephemeral message'
})
```

### 📰 External Ad Reply

```js
sock.sendMessage(jid, {
   text: 'Check this out.',
   externalAdReply: {
      title: 'Casileys',
      body: 'WhatsApp Web API',
      thumbnail: fs.readFileSync('./thumbnail.jpg'),
      mediaType: 1,
      renderLargerThumbnail: true,
      sourceUrl: 'YOUR_SOURCE_URL'
   }
})
```

### 📑 Spoiler

```js
sock.sendMessage(jid, {
   spoiler: true,
   text: 'Spoiler message'
})
```

### 👁️ View Once

```js
sock.sendMessage(jid, {
   viewOnce: true,
   image: {
      url: './path/to/image.jpg'
   }
})
```

### 👁️ View Once V2

```js
sock.sendMessage(jid, {
   viewOnceV2: true,
   video: {
      url: './path/to/video.mp4'
   }
})
```

### 👁️ View Once V2 Extension

```js
sock.sendMessage(jid, {
   viewOnceV2Extension: true,
   image: {
      url: './path/to/image.jpg'
   }
})
```

### 🐱 Lottie Sticker

```js
sock.sendMessage(jid, {
   sticker: {
      url: './path/to/animation.webp'
   },
   isLottie: true
})
```

### 🏷️ Secure Meta Service Label

```js
sock.sendMessage(jid, {
   text: 'Casileys',
   secureMetaServiceLabel: true
})
```

### 🧩 Raw

```js
sock.sendMessage(jid, {
   raw: {
      message: {
         conversation: 'Raw message'
      }
   }
})
```

---

## 🧑‍🧑‍🧒 Group Status

Casileys adds a dedicated helper for publishing group status content.

**Direct message option**

```js
sock.sendMessage(jid, {
   groupStatus: true,
   image: {
      url: './path/to/image.jpg'
   },
   caption: 'Group Status'
})
```

**Helper API**

```js
import {
   sendGroupStatusText,
   sendGroupStatusImage,
   sendGroupStatusVideo,
   sendGroupStatusAudio,
   sendGroupStatusSticker
} from '@kaels/casileys'
```

**Text**

```js
await sendGroupStatusText(
   sock,
   '120000000000000000@g.us',
   'Hello from Casileys'
)
```

**Image**

```js
import fs from 'fs'

await sendGroupStatusImage(
   sock,
   '120000000000000000@g.us',
   fs.readFileSync('./image.jpg'),
   {
      caption: 'Casileys Group Status'
   }
)
```

**Video**

```js
import fs from 'fs'

await sendGroupStatusVideo(
   sock,
   '120000000000000000@g.us',
   fs.readFileSync('./video.mp4'),
   {
      caption: 'Casileys Group Status'
   }
)
```

**Audio**

```js
import fs from 'fs'

await sendGroupStatusAudio(
   sock,
   '120000000000000000@g.us',
   fs.readFileSync('./audio.ogg'),
   {
      mimetype: 'audio/ogg; codecs=opus',
      ptt: true
   }
)
```

**Sticker**

```js
import fs from 'fs'

await sendGroupStatusSticker(
   sock,
   '120000000000000000@g.us',
   fs.readFileSync('./sticker.webp'),
   {
      caption: 'Casileys Group Status'
   }
)
```

**WebP support**

The helper can process WebP sticker input:

| Input | Result |
|---|---|
| Static WebP | Image |
| Animated WebP | Video |
| JPEG / PNG | Image |
| MP4 | Video |
| OGG / Opus | Audio |
| Text | Text |

Animated WebP conversion uses FFmpeg.

---

## ♻️ Modify Messages

### 🗑️ Delete

```js
sock.sendMessage(jid, {
   delete: message.key
})
```

### ✏️ Edit

```js
sock.sendMessage(jid, {
   text: 'Edited message'
}, {
   edit: message.key
})
```

---

## 🧰 Additional Contents

### 🧱 AIRich — Rich HTML / Rich Response Messages

Casileys includes support for constructing **Rich Response Messages**, including
interactive HTML content rendered inside supported WhatsApp clients.

`AIRich` is a convenience builder. It is **not the underlying protocol**.

If you need complete control over the payload, you can construct the Rich Message
structure yourself and send it through `sock.relayMessage()`.

---

#### 🧬 Rich Message Structure

The important structure is:

~~~text
botForwardedMessage
└── message
    └── richResponseMessage
        ├── messageType
        ├── submessages[]
        ├── unifiedResponse
        │   └── data
        │       └── Base64 encoded GenAIUnifiedResponse
        │           ├── __typename
        │           ├── response_id
        │           └── sections[]
        │               └── view_model
        │                   ├── __typename
        │                   └── primitive
        │                       ├── __typename
        │                       ├── payload
        │                       └── trusted_sources[]
        └── contextInfo
~~~

The HTML renderer is represented by a primitive such as:

~~~text
GenAIaeacdsnwHtmlPrimitive
~~~

Its `payload` contains the HTML source.

---

#### 📦 GenAIUnifiedResponse

The `unifiedResponse.data` field contains a serialized
`GenAIUnifiedResponse` object which is then encoded as Base64.

Basic structure:

~~~js
const responseId = crypto.randomUUID();

const unifiedResponse = {
  __typename: 'GenAIUnifiedResponse',
  response_id: responseId,
  sections: [
    {
      __typename: 'GenAIUnifiedResponseSection',
      view_model: {
        __typename: 'GenAISingleLayoutViewModel',
        primitive: {
          __typename: 'GenAIaeacdsnwHtmlPrimitive',
          payload: '<h1>Hello World</h1>',
          trusted_sources: []
        }
      }
    }
  ]
};

const data = Buffer.from(
  JSON.stringify(unifiedResponse)
).toString('base64');
~~~

> The exact serialization/escaping used by different implementations may vary.
> The important part is that `unifiedResponse.data` carries the serialized
> unified response as Base64.

---

#### 🛠️ Manual Rich Message Construction

You do **not** need `createAIRich()` to construct a Rich Message.

A message can be assembled manually:

~~~js
const responseId = crypto.randomUUID();

const unifiedResponse = {
  __typename: 'GenAIUnifiedResponse',
  response_id: responseId,
  sections: [
    {
      __typename: 'GenAIUnifiedResponseSection',
      view_model: {
        __typename: 'GenAISingleLayoutViewModel',
        primitive: {
          __typename: 'GenAIaeacdsnwHtmlPrimitive',
          payload: `
            <h1>Hello World</h1>
            <p>This is a Rich HTML message.</p>
          `,
          trusted_sources: []
        }
      }
    }
  ]
};

const data = Buffer.from(
  JSON.stringify(unifiedResponse)
).toString('base64');

const message = {
  messageContextInfo: {
    deviceListMetadata: {},
    deviceListMetadataVersion: 2,
    botMetadata: {
      messageDisclaimerText: '',
      botResponseId: crypto.randomUUID(),

      // Verification metadata may be required by the
      // target renderer/client.
      verificationMetadata: {
        proofs: [
          {
            version: 1,
            useCase: 1,
            signature: '<SIGNATURE>',
            certificateChain: [
              '<CERTIFICATE_1>',
              '<CERTIFICATE_2>'
            ]
          }
        ]
      }
    }
  },

  botForwardedMessage: {
    message: {
      richResponseMessage: {
        messageType: 1,

        submessages: [],

        unifiedResponse: {
          data
        },

        contextInfo: {}
      }
    }
  }
};

await sock.relayMessage(
  jid,
  message,
  {}
);
~~~

The verification values above are placeholders. They are shown to document the
message structure and must not be treated as valid credentials.

---

#### 🧩 Custom Primitives

The `primitive` object is the part that describes the actual content rendered
by the client.

For example, an HTML primitive has this general form:

~~~js
{
  __typename: 'GenAIaeacdsnwHtmlPrimitive',
  payload: '<h1>Hello</h1>',
  trusted_sources: []
}
~~~

This means the Rich Message system is not limited to a single HTML helper.
Different primitive types can represent different kinds of content.

When experimenting with undocumented primitives, inspect the actual serialized
`unifiedResponse` payload rather than assuming that every primitive behaves like
HTML.

---

#### 🧰 AIRich Convenience Builder

`AIRich` provides a higher-level API for constructing the same general structure.

Create a builder from a socket:

~~~js
const rich = sock.createAIRich();
~~~

Add HTML:

~~~js
rich.addHtml(`
  <h1>Hello World</h1>
  <p>Generated by Casileys.</p>
`);
~~~

Then send it:

~~~js
await rich.send(jid);
~~~

`createAIRich()`, `addHtml()`, and `send()` are **convenience methods**.
They are not required by the Rich Message protocol itself.

Use the manual `relayMessage()` approach when you need to modify fields that
are not exposed by the builder.

---

#### 🖥️ Interactive HTML

Rich HTML can contain normal browser-side JavaScript.

For example:

~~~js
const rich = sock.createAIRich();

rich.addHtml(`
  <button onclick="
    document.getElementById('counter').textContent++;
  ">
    Click me
  </button>

  <p id="counter">0</p>
`);

await rich.send(jid);
~~~

The HTML runs inside the client's Rich Message renderer, so the JavaScript
environment is separate from the Node.js environment running Casileys.

For example:

~~~js
window
~~~

exists inside the HTML renderer, but it does not exist in a normal Node.js
evaluation context.

---

#### 🌐 WebSocket / Realtime HTML

The Rich HTML renderer exposes the browser WebSocket API on supported clients.

This makes realtime HTML applications technically possible without sending a
new WhatsApp message for every state update.

Example:

~~~js
const rich = sock.createAIRich();

rich.addHtml(`
  <button id="connect">Connect</button>
  <pre id="output"></pre>

  <script>
    const output = document.getElementById('output');

    document.getElementById('connect').onclick = () => {
      const ws = new WebSocket('wss://example.com');

      ws.onopen = () => {
        output.textContent = 'Connected';
        ws.send('HELLO');
      };

      ws.onmessage = event => {
        output.textContent = event.data;
      };

      ws.onerror = () => {
        output.textContent = 'WebSocket error';
      };
    };
  </script>
`);

await rich.send(jid);
~~~

A realtime multiplayer game can therefore be designed as:

~~~text
WhatsApp Rich HTML
        │
        │ WebSocket
        ▼
Realtime Game Server
        │
        ├── Player 1 state
        ├── Player 2 state
        └── Game state
~~~

Casileys only needs to deliver the initial Rich Message. The realtime game
state can then be handled by the HTML client and the external server.

> Availability of browser APIs and network access depends on the WhatsApp
> client and Rich Message renderer.

---

### 🏷️ Find User ID

```js
const result = await sock.onWhatsApp(
   '628123456789'
)

console.log(result)
```

### 🔑 Request Custom Pairing Code

```js
const code = await sock.requestPairingCode(
   '628123456789'
)

console.log(code)
```

### 🖼️ Image Processing

```js
const imageLibrary =
   await getImageProcessingLibrary()

console.log(imageLibrary)
```

---

## 🧩 Additional Utilities

Casileys bundles several optional utilities that go beyond the core socket API.

### 🗑️ Anti-Delete

Detect and handle deleted messages:

```js
import { createAntiDeleteHandler, isDeleteMessage, getDeletedMessageKey } from '@kaels/casileys'

const handler = createAntiDeleteHandler(store, (deletedMsg) => {
  console.log('Message deleted:', deletedMsg)
})
```

### 🔍 Message Search

Search message history via USync:

```js
import { searchMessages, createMessageSearch } from '@kaels/casileys'

const results = await searchMessages(sock, 'query text')
```

### 📝 Templates

Reusable message templates with variable interpolation:

```js
import { renderTemplate, PRESET_TEMPLATES, createTemplateManager } from '@kaels/casileys'

const text = renderTemplate('Hello {name}, welcome to {group}!', {
  name: 'Alice',
  group: 'My Group'
})
```

### 📇 VCard

Generate and parse vCard payloads:

```js
import { generateVCard, parseVCard, generateVCards } from '@kaels/casileys'

const vcard = generateVCard({ displayName: 'John', phone: '628xxxx' })
```

### 🗄️ Persistent Store

Pluggable chat/message store backed by SQLite, MySQL, Postgres, MongoDB, or Redis:

```js
import { makePersistentStore } from '@kaels/casileys'

const store = await makePersistentStore({
  type: 'sqlite',
  dbPath: './store.db'
})
```

> Requires the corresponding optional peer dependency (`better-sqlite3`, `mysql2`, `pg`, `mongodb`, or `ioredis`) to be installed.

---

## 📣 Newsletter Management

Newsletter JIDs use:

```
123456789012345678@newsletter
```

Example:

```js
const newsletterJid =
   '123456789012345678@newsletter'

await sock.sendMessage(
   newsletterJid,
   {
      text: 'Hello from Casileys'
   }
)
```

Newsletter media and message operations use the same socket/message infrastructure.

---

## 👥 Group Management

**Fetch groups**

```js
const groups =
   await sock.groupFetchAllParticipating()

console.log(groups)
```

**Create group**

```js
const group =
   await sock.groupCreate(
      'Casileys Community',
      [
         '628123456789@s.whatsapp.net'
      ]
   )

console.log(group)
```

**Update participants**

```js
await sock.groupParticipantsUpdate(
   '120000000000000000@g.us',
   [
      '628123456789@s.whatsapp.net'
   ],
   'add'
)
```

The participant action can be changed to:

| Action | Description |
|---|---|
| `add` | Add a participant to the group |
| `remove` | Remove a participant from the group |
| `promote` | Promote a participant to admin |
| `demote` | Demote a participant from admin |

**Update subject**

```js
await sock.groupUpdateSubject(
   '120000000000000000@g.us',
   'Casileys Community'
)
```

**Update description**

```js
await sock.groupUpdateDescription(
   '120000000000000000@g.us',
   'Community powered by Casileys.'
)
```

**Leave**

```js
await sock.groupLeave(
   '120000000000000000@g.us'
)
```

---

## 👥 Community Management

Community-related operations use the group/community methods provided by the socket and WhatsApp protocol.

---

## 👤 Profile Management

**Profile picture**

```js
const profilePicture =
   await sock.profilePictureUrl(
      '628123456789@s.whatsapp.net',
      'image'
   )

console.log(profilePicture)
```

**Update profile picture**

```js
await sock.updateProfilePicture(
   sock.user.id,
   {
      url: './profile.jpg'
   }
)
```

**Update profile status**

```js
await sock.updateProfileStatus(
   'Powered by Casileys'
)
```

---

## 🛒 Business Management

Business messages can be sent through the same message API.

Product structures can contain fields such as:

```js
{
   currencyCode: 'IDR',
   priceAmount1000: 1000000,
   productId: 'product-id',
   productImageCount: 1,
   title: 'Casileys Product',
   description: 'Product description',
   url: 'YOUR_PRODUCT_URL'
}
```

---

## 🔐 Privacy Management

```js
const privacy =
   await sock.fetchPrivacySettings()

console.log(privacy)
```

---

## 📡 Events

Casileys exposes WhatsApp events through `sock.ev`.

**Messages**

```js
sock.ev.on('messages.upsert', async ({ messages }) => {
   for (const message of messages) {
      if (!message.message) continue

      console.log(message)
   }
})
```

**Connection**

```js
sock.ev.on('connection.update', (update) => {
   const {
      connection,
      lastDisconnect
   } = update

   console.log({
      connection,
      lastDisconnect
   })
})
```

**Credentials**

```js
sock.ev.on('creds.update', saveCreds)
```

---

## ⚠️ Disclaimer

Casileys is an independent fork based on existing Baileys-related projects.

It is not affiliated with WhatsApp or Meta Platforms, Inc.

The project retains appropriate attribution to its upstream projects and contributors.

Fork reference: `https://github.com/itsliaaa/baileys`

Please respect the licenses and attribution requirements of the upstream projects when using or redistributing Casileys.

---

## 📣 Credits

**Upstream**

- WhiskeySockets / Baileys
- Original Baileys maintainers and contributors
- Contributors to the WhatsApp protocol ecosystem
- Contributors to the broader Baileys fork ecosystem whose stability fixes and protocol updates are included in this release

**Fork Base**

- ItsLiaaa / Baileys
- Contributors to the fork base

**Casileys**

- Casileys contributors and maintainers
- Contributors to Casileys-specific improvements and utilities

---

## 📄 License

Casileys is released under the MIT License.

See [`LICENSE`](./LICENSE) for the complete license text.
