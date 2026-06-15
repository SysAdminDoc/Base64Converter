# Base64 Converter Pro

![License](https://img.shields.io/badge/license-MIT-green) ![Platform](https://img.shields.io/badge/platform-HTML%2FJS-lightgrey) ![Offline](https://img.shields.io/badge/offline-PWA-purple)

A professional, fully client-side encoding toolkit. No server. No uploads. 100% local — your data never leaves the browser.

## [**Use it now** — sysadmindoc.github.io/Base64Converter](https://sysadmindoc.github.io/Base64Converter/)

---

## Features

### Encoding Formats
**Base64** (Standard) · **Base64 URL-Safe** · **Base32** · **Base58** (Bitcoin) · **Base62** (URL-safe) · **Hexadecimal** · **ASCII85** · **URL Encode**

### File Encode
- Drag-and-drop files or entire folders — batch encode to ZIP
- Paste images from clipboard (`Ctrl+V`) or fetch from URL
- Gzip compression before encoding (native Compression Streams API with fflate fallback)
- Image resize and format conversion (WebP, AVIF, PNG, JPEG) before encode
- Line-wrap output (76-char MIME / PEM / no-wrap)
- Split output into chunks for size-limited APIs
- Auto-format detection on paste

### Decode
- Paste any encoded string — with or without `data:mime;base64,` prefix
- Auto-detect MIME type from magic bytes
- Auto-detect encoding format on input
- Preview decoded images, video, and audio inline
- **Hex dump** view of decoded binary data
- **Shannon entropy** analysis — classify data as plaintext, compressed, or encrypted
- **Deep Decode** — recursively unwrap nested encoding layers (up to 5 levels)
- **Validate & Repair** — detect and fix padding errors, invalid characters, whitespace, double-encoding
- Download decoded file with correct extension

### Text
- Live encode/decode as you type (200 ms debounce)
- **Per-line** mode — encode/decode each line independently
- Ctrl+Enter to convert · Swap input/output
- Supports all 8 encoding formats

### JWT Decoder
- Paste any JWT — header, payload, and signature decoded instantly
- **HMAC signature verification** (HS256 / HS384 / HS512) via SubtleCrypto
- **Security warnings** — detects `alg:none`, weak algorithms, missing `exp`, impossible validity windows
- Human-readable timestamps for `exp`, `iat`, `nbf`
- Expiry status (Valid / EXPIRED) highlighted
- Live decode as you type

### PEM & Certificates
- **PEM wrap/unwrap** — generate `-----BEGIN CERTIFICATE-----` blocks from raw Base64
- **X.509 certificate parser** — extract subject, issuer, serial, validity dates, and SANs from PEM

### Code Generation
Ready-to-paste snippets in 17 languages: **HTML** · **CSS** · **JavaScript** · **TypeScript** · **Python** · **C#** · **PowerShell** · **Go** · **Rust** · **Bash** · **PHP** · **Ruby** · **Kotlin** · **JSON** · **curl** · **wget** · **WASM**

### Tools & UX
- **Command palette** (`Ctrl+K`) — search all commands, formats, and settings
- **Keyboard shortcut help** — press `?` to see all shortcuts
- **QR code** from any encoded string
- **MD5 / SHA-1 / SHA-256 / SHA-384 / SHA-512** file hashes
- **Compare** two Base64 strings (diff / similarity)
- **Deep links** — `?data=...&mode=decode|text|jwt&format=base64`
- **Copy shareable link** — pre-populated decode links
- **Font-size slider** + monospace font picker (JetBrains Mono, IBM Plex, Cascadia, Fira Code)
- **View Transitions** for smooth tab switching
- Session stats · History (last 50 conversions) · Dark/light theme
- **Offline PWA** — install to desktop/home screen
- **Web Share Target** — receive shared text or files from other apps

---

## Usage

Open `index.html` in any modern browser — no build step, no server needed.

```bash
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

## Security

- **100% client-side** — no data is ever sent to a server
- **Content Security Policy** — hash-based `script-src` with `strict-dynamic`
- **Subresource Integrity** — SRI hashes on all CDN scripts
- **No inline event handlers** — DOM API with event delegation throughout
- **Service Worker** — stale-while-revalidate for CDN resources, cache-first for app assets

---

## Architecture

Single `index.html` (~3700 lines) with all CSS and JS inlined. No build toolchain required.

- **Web Worker** — encoding runs off the main thread via inline Blob URL
- **Compression Streams API** — native browser gzip with fflate CDN fallback for ZIP
- **qrcode-generator** (CDN) — pure-JS QR code generation
- **SubtleCrypto** — SHA-1 / SHA-256 / SHA-384 / SHA-512 hashing, HMAC JWT verification
- **Service Worker** (`sw.js`) — offline support with versioned cache
- **View Transitions API** — smooth tab switching (progressive enhancement)

---

## License

[MIT](LICENSE)
