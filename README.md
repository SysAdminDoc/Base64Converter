# Base64 Converter Pro

![Version](https://img.shields.io/badge/version-v0.3.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Platform](https://img.shields.io/badge/platform-HTML%2FJS-lightgrey) ![Offline](https://img.shields.io/badge/offline-PWA-purple)

A professional, fully client-side Base64 tool. No server. No uploads. Works offline after first load.

**[Live demo on GitHub Pages](https://sysadmindoc.github.io/Base64Converter/)**

---

## Features

### Encoding
- **Base64** (Standard), **Base64 URL-Safe**, **Base32**, **Base58 (Bitcoin)**, **Hexadecimal**, **ASCII85**
- Drag-and-drop files or entire folders — batch encode to ZIP
- Paste images directly from clipboard (`Ctrl+V`)
- Fetch a URL and encode it on the spot
- Gzip compression before encoding (skips already-compressed formats)
- Image resize before encode (custom width × height)
- Line-wrap output (76-char MIME / PEM / no-wrap)
- Split output into chunks for size-limited APIs
- Auto-format detection on paste (Hex / Base32 / Base58 / Base64URL / Base64 / ASCII85)

### Decoding
- Paste any Base64 string — with or without `data:mime;base64,` prefix
- Auto-detect MIME type from magic bytes
- Auto-detect encoding format on input
- Preview decoded images, video, and audio inline
- Download decoded file with correct extension
- **PEM wrap/unwrap** — generate `-----BEGIN CERTIFICATE-----` blocks from raw Base64

### Text
- Live encode/decode as you type (200 ms debounce)
- Ctrl+Enter to encode/decode
- Swap input ↔ output
- Supports all encoding formats

### JWT Decoder
- Paste any JWT — header, payload, and signature decoded instantly
- Human-readable timestamps for `exp`, `iat`, `nbf`
- Expiry status (Valid / EXPIRED) highlighted
- Algorithm and subject shown in info bar
- Live decode as you type

### Code Generation
Outputs ready-to-paste snippets in: **HTML**, **CSS**, **JavaScript**, **TypeScript**, **Python**, **C#**, **PowerShell**, **Go**, **Rust**, **Bash**, **PHP**, **Ruby**, **Kotlin**, **JSON**, **curl**, **wget**

### Other
- **QR code** from any encoded string
- **MD5 / SHA-1 / SHA-256** hashes of original file
- **Compare** two Base64 strings (diff / similarity)
- **Deep links** — `?data=...&mode=decode|text|jwt&format=base64`
- **Copy shareable link** — pre-populated decode links
- **Font-size slider** — adjust output font (11–20px, saved to localStorage)
- Session stats (files, bytes, speed, ratio)
- History with localStorage (last 50 conversions)
- Dark / light theme toggle
- **Offline PWA** — install to desktop/home screen
- **Format detection badge** — auto-detect encoding on paste

---

## Usage

Open `index.html` in any modern browser — no build step, no server needed.

```bash
# Clone and open
git clone https://github.com/SysAdminDoc/Base64Converter.git
cd Base64Converter
start index.html     # Windows
open index.html      # macOS
xdg-open index.html  # Linux
```

Or use the hosted version: **https://sysadmindoc.github.io/Base64Converter/**

### Deep Links

```
# Pre-load a value into the Decode tab
?data=SGVsbG8gV29ybGQ=&mode=decode

# Pre-load into Text tab with URL-safe format
?data=dGVzdA&mode=text&format=base64url

# Decode a JWT directly
?data=eyJhbGciOiJIUzI1NiJ9...&mode=jwt
```

---

## Architecture

Single `index.html` with all CSS and JS inlined. No build toolchain required.

- **Web Worker** — encoding runs off the main thread to prevent UI lockup
- **fflate** (CDN) — gzip compression
- **qrcode.js** (CDN) — QR code generation
- **SubtleCrypto** — SHA-1 / SHA-256 hashing
- **Service Worker** (`sw.js`) — cache-first offline support

---

## License

[MIT](LICENSE)

