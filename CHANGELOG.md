# Changelog

All notable changes to Base64 Converter Pro will be documented in this file.

## [v0.3.0] - 2025-07-10

### Added
- **Base58 encoding** (Bitcoin alphabet) — new format option in dropdown
- **curl & wget code snippets** — new tabs for shell command generation
- **Font-size slider** — adjust output font (11–20px) in header, saved to localStorage, applies to all output areas
- **Copy shareable link** — button in output section that builds deep-link URL with pre-populated data
- **Format detection badge** — auto-detects encoding on paste (Hex, Base32, Base58, Base64URL, Base64, ASCII85)
- **Ctrl+Enter keyboard shortcut** — text panel now converts on Ctrl+Enter key
- **Copy button pulse animation** — visual feedback on successful copy (code, text, link buttons)

### Fixed
- Copy button feedback now includes pulse animation for better UX
- Format detection runs live as user pastes into decode panel

## [v0.2.0] - 2025-07-09

### Added
- **JWT Decoder** — full tab with header/payload/signature panels; human-readable `exp`/`iat`/`nbf` timestamps; expiry status badge; live decode on input
- **Live text encoding/decoding** — 200ms debounce on the Text panel; no button required
- **PEM Wrap/Unwrap** — generate `-----BEGIN/END TYPE-----` blocks from raw Base64; strip headers from PEM input
- **14-language code snippets** — HTML, CSS, JavaScript, TypeScript, Python, C#, PowerShell, Go, Rust, Bash, PHP, Ruby, Kotlin, JSON
- **File size ratios** — encode file list now shows `X MB → Y MB (+Z%)`
- **PWA support** — `manifest.json`, `icon.svg`, `sw.js` (cache-first offline), `beforeinstallprompt` install button
- **GitHub Pages deploy** — `.github/workflows/deploy.yml` for automatic deployment on push to main
- **Deep links** — `?data=...&mode=decode|text|jwt&format=base64` loads and routes pre-populated data
- **ARIA** — `aria-selected` on all tab buttons for screen reader support

### Fixed
- `btoa()` spread crash (`RangeError: Maximum call stack size exceeded`) on large Uint8Arrays — replaced with chunked 8192-byte loop
- Text decode producing garbled output for non-Latin/Unicode strings — now uses `TextDecoder`

## [v0.1.0] - 2025-06-15

- Initial release: file encode/decode, Base64/Base64URL/Base32/Hex/ASCII85, compression, QR code, code snippets, history, diff tool, theme toggle

