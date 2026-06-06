# 🔒 LAN Chat — Secure Local Network Chat App

> A real-time, end-to-end encrypted chat application that lets users on the **same network** communicate securely. Built with **Node.js**, **Socket.IO**, and **CryptoJS**, it supports text messages, image sharing, voice notes, and more — all encrypted client-side before leaving the browser.

---

## 📖 Introduction

**LAN Chat** is a lightweight, privacy-first chat application designed for secure communication over a Local Area Network (LAN). Unlike traditional chat apps that rely on cloud servers, LAN Chat keeps all communication within your local network, ensuring maximum privacy.

When users join a chat room, the app automatically detects their public network subnet and locks the room to that subnet. Messages are encrypted on the sender's device using **AES encryption** (powered by CryptoJS) before being transmitted through the server, and decrypted only on the receiver's device. The server never sees the original content — acting purely as a relay.

The application features a sleek, dark-themed UI inspired by modern messaging platforms, responsive design for both desktop and mobile, and zero database dependency — making it truly ephemeral and private.

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🔐 **End-to-End Encryption** | All messages (text, image, audio) are encrypted with **AES (CryptoJS)** using the room name as the secret key. The server only relays encrypted data. |
| 💬 **Real-Time Messaging** | Instant text messaging powered by **Socket.IO** WebSockets with sub-second delivery. |
| 🖼️ **Image Sharing** | Send images up to **5 MB** directly in the chat. Images are Base64-encoded, encrypted, and rendered inline. Click to view full-size. |
| 🎙️ **Voice Notes** | Hold the mic button to record and send audio messages using the **MediaRecorder API**. Audio is captured in WebM format, encrypted, and sent in real-time. |
| ⌨️ **Typing Indicator** | See when other users are typing in real-time with a smooth fade-in/out animation. |
| 🗑️ **Delete for Everyone** | Sent messages can be deleted for all participants in the room. Deletion is broadcast and animated with a fade-out effect. |
| 🌐 **Network Auto-Detection** | Automatically detects the user's public IP subnet and uses it to scope chat rooms, adding an extra layer of network-level isolation. |
| 🔔 **Sound Notifications** | Incoming messages trigger an audio notification so you never miss a message. |
| 🏠 **Room-Based Chat** | Users join named rooms. The room name doubles as the encryption key — only users who know the room name can decrypt messages. |
| ⚡ **Ephemeral & Zero Storage** | No database, no message history. Messages exist only in-memory during the session. Once you leave, they're gone — by design. |
| 📱 **Responsive Design** | Fully responsive dark-themed UI that works seamlessly on both desktop and mobile browsers. |
| 🎨 **Modern UI/UX** | Sleek dark mode interface with smooth animations (pop-in messages, pulse recording indicator), Material Icons, and the Inter font family. |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the server |
| **Express.js v5** | Web framework to serve static files and handle HTTP |
| **Socket.IO v4** | Real-time bidirectional WebSocket communication |
| **HTTP (Node core)** | HTTP server creation for Socket.IO integration |

### Frontend
| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3 (Vanilla)** | Styling with CSS variables, flexbox layout, and keyframe animations |
| **JavaScript (ES6+)** | Client-side logic, DOM manipulation, and event handling |
| **Socket.IO Client** | Real-time communication with the server |
| **CryptoJS (AES)** | Client-side AES encryption/decryption of all message content |
| **MediaRecorder API** | Browser-native voice recording for audio messages |
| **Google Fonts (Inter)** | Modern typography |
| **Material Icons** | UI icons for send, mic, image, etc. |

### External APIs
| API | Purpose |
|---|---|
| **ipify API** | Detects the user's public IP for network-level room scoping |
| **Mixkit (CDN)** | Notification sound effect for incoming messages |

---

## 🚀 Steps to Run Locally

### Prerequisites
- **Node.js** (v14 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes bundled with Node.js)
- Devices must be on the **same local network** (Wi-Fi/LAN)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lan-chat.git
   cd lan-chat/Lan_chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Open in browser**
   
   On the host machine:
   ```
   http://localhost:3000
   ```
   
   On other devices in the same network, use the host's local IP:
   ```
   http://<host-ip>:3000
   ```
   > 💡 **Tip:** Find your local IP by running `ipconfig` (Windows) or `ifconfig` (Mac/Linux) in the terminal.

5. **Start chatting!**
   - Enter a **username**
   - Enter a **room name** (this is also your encryption key — share it only with trusted people)
   - Click **Join Securely**
   - Open the same URL on another device, join the same room, and start messaging!

### Environment Variables (Optional)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |

```bash
# Example: Run on a custom port
PORT=8080 node server.js
```

---

## 📁 Project Structure

```
Lan_chat/
├── public/
│   └── index.html        # Frontend — UI, styles, and client-side JS (all-in-one)
├── server.js              # Backend — Express + Socket.IO server
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Dependency lock file
└── README.md              # Project documentation
```

---

## 🔐 How Encryption Works

```
Sender                          Server                         Receiver
  │                               │                               │
  │  1. Encrypt with AES(key)     │                               │
  │  ─────────────────────────►   │                               │
  │                               │  2. Relay encrypted blob      │
  │                               │  ─────────────────────────►   │
  │                               │                               │  3. Decrypt with AES(key)
  │                               │                               │
```

- The **room name** is used as the AES encryption key
- The **server never sees** plaintext content — it only forwards encrypted data
- Even if someone intercepts the WebSocket traffic, they cannot read the messages without the room name

---

## ⚠️ Disclaimer

This project is built for **educational and local use** purposes. While it uses AES encryption, production-grade security would require additional measures like TLS/SSL, key exchange protocols, and proper authentication.

---