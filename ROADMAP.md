# Base64 Converter Pro — Roadmap

Single-file HTML/JS Base64 encoder/decoder with compression (fflate), QR generation, batch processing, code generation, and dark/light themes. Runs entirely client-side.

## Planned Features

### Core encoding
- **Base64URL** variant toggle (RFC 4648 §5, `-` / `_`, no padding) — first-class, not an afterthought
- **MIME multi-line** output mode (RFC 2045, 76-char wrap)
- **Base32** and **Base58** (bitcoin alphabet) tabs for completeness
- **Hex** and **Base16** dual-view underneath every encode
- **Ascii85 / Base85** (PDF and Adobe variants)
- Live streaming encode for files >100 MB (chunked FileReader → `ReadableStream`)

### File workflows
- Drag-drop multiple files → ZIP of individual `.txt` outputs (fflate already present)
- Drop a Base64 `.txt` and auto-detect MIME from content sniff, offer download with correct extension
- PDF/PNG/SVG preview in-line when decoded payload is recognized
- Data-URI builder with MIME picker + clipboard copy
- PEM block assembler — wrap with `-----BEGIN/END CERTIFICATE-----` headers

### Code generation
- Snippet output for: JavaScript, TypeScript, Python, PowerShell, C#, Go, Rust, Bash, PHP, Ruby, Kotlin
- Dropdown picks language, outputs self-contained paste-ready code
- Copy-as-`curl` data URI
- WASM decode-on-load bootstrap template

### Extra tools
- JWT decoder — split by `.`, Base64URL decode header + payload, show signature length
- QR encode of any Base64 string with size/EC level controls (already uses qrcode lib — extend)
- Hash the original + the encoded (SHA-1, SHA-256, MD5) for sanity checks
- Gzip + Base64 combined mode ("compressed data URI")
- URL → fetch → encode pipeline (with CORS-aware warning)

### UI / UX
- Split-pane live diff as you type
- Font-size + mono-font picker (IBM Plex, JetBrains, Cascadia)
- Command palette (`Ctrl+K`) over tools and samples
- Persistent "recent conversions" in `localStorage` with redact option
- Offline PWA install (`manifest.json`, service worker cache)

### Integrations
- GitHub Pages deployment workflow
- `?data=...&mode=decode` deep links for shareable conversions (with warning on sensitivity)
- VS Code extension wrapper reusing the same engine

## Competitive Research
- **base64decode.org / base64encode.org** — de-facto online baseline; "live mode" runs in-browser. Our edge: offline-first, batch, code generation.
- **base64.guru** — strong decode UX with MIME detection, file preview, hex dump, size metadata. Worth matching.
- **jam.dev / 64baser.com** — clean UIs, URL-safe variant, free. Both lack batch + code generation.
- **CodeBeautify** — has URL-load input and many format converters; cluttered. Differentiate via dense single-file polish.

## Nice-to-Haves
- RSA / EC key import from Base64 → show modulus / curve / bit length
- CSR decoder (pkijs) — turn a PEM CSR into a human-readable block
- DNS TXT record builder (Base64 SPF / DKIM snippets)
- Right-to-left text preview
- Keyboard-only power user mode with chorded shortcuts
- Browser-extension wrapper (MV3) that adds a "Decode Base64" context-menu action on any selected text

## Open-Source Research (Round 2)

### Related OSS Projects
- **progers/base64** — https://github.com/progers/base64 — Small, fast, offline-capable encoder/decoder tested across Chrome/Firefox/Safari/Edge/IE11/Android.
- **hollandben/base64-image-encoder** — https://github.com/hollandben/base64-image-encoder — Drag & drop image encoder reference.
- **dmackerman/base64-encoder** — https://github.com/dmackerman/base64-encoder — HTML5 drag/drop base64 encoder.
- **emn178/online-tools** — https://github.com/emn178/online-tools — Full set of encoders supporting RFC 4648 standard + URL-safe, RFC 2045 MIME, RFC 2152 UTF-7, RFC 3501 IMAP.
- **GetZenQuery Base64 Image Encoder** — https://www.getzenquery.com/tools/base64-image-encoder/ (MIT, GitHub-linked) — Client-side PNG/JPEG/GIF/WebP/SVG/BMP with decode-back-to-image mode.
- **GitHub topic: base64-decoder** — https://github.com/topics/base64-decoder — HyperDecode-style multi-format auto-detect plugin systems.

### Features to Borrow
- **Multi-RFC support** (emn178/online-tools) — not only RFC 4648 standard, but URL-safe (RFC 4648 §5), MIME (RFC 2045, 76-col line wrapping), UTF-7 (RFC 2152), and IMAP (RFC 3501) — each selectable from a dropdown.
- **Auto-detect mixed encodings** (HyperDecode pattern from base64-decoder topic) — paste arbitrary text, auto-detect Base64 / Hex / Binary / Morse / URL-encoding and offer a decode chain.
- **Drag-and-drop image with decode-back** (GetZenQuery) — encoder has a symmetric mode: paste a base64 data URL → preview reconstructed image → download as original format.
- **Clipboard paste for binary** (hollandben, dmackerman) — `Clipboard API readText` + `readImage` for one-key paste of either text or a screenshot.
- **Line-wrap toggle** (emn178) — 64-col / 76-col / no-wrap selectable; matches what email MIME, PEM, and OpenSSH expect respectively.
- **PEM wrapping helpers** — wrap/unwrap with `-----BEGIN CERTIFICATE-----` / `-----BEGIN PUBLIC KEY-----` headers; frequent admin use case.
- **File-size + encoded-size indicator** (GetZenQuery) — live readout of "1.2 MB PNG → 1.6 MB base64 (+33%)" so users know before copy.
- **QR-code output for encoded strings** — common pairing in dev tool bundles; borrow from the broader `base64-decoder` topic.

### Patterns & Architectures Worth Studying
- **100% client-side, zero network** (progers/base64, GetZenQuery) — the whole page runs after initial load with no further fetches; easy offline PWA conversion.
- **Web Worker for large files** — encoding a 100MB file on the main thread freezes the UI; move to a worker with streaming chunks via `ReadableStream.getReader()`.
- **TextDecoder/TextEncoder with stream option** — `TextEncoder.encodeInto` + incremental `btoa` on 3-byte-aligned chunks is ~3x faster than naive `btoa(String.fromCharCode(...bytes))` on large inputs.
- **Single-file deliverable with inlined WASM** — the project can stay single-HTML by base64-embedding the (tiny) zlib/webp helpers, which matches user CLAUDE.md's "single-file when possible" rule.
- **Offline PWA with service worker** — add `manifest.json` + SW that precaches the single HTML so the tool works from the Start menu with no internet.
