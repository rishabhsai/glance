# glance-sdk

**Structured screen understanding for AI apps.** [glance.run](https://glance.run)

Replace expensive screenshot-to-vision-model pipelines with one function call. Glance reads the macOS accessibility tree and gives your AI structured data about every UI element — role, label, value, and **exact pixel coordinates**.

## Install

```bash
npm install glance-sdk
```

## Usage

```javascript
import { screen, capture, find, checkAccess } from 'glance-sdk'

// LLM-ready text — drop directly into your prompt
const context = await screen()

// Full structured data
const state = await capture()
console.log(state.app)           // "VS Code"
console.log(state.elementCount)  // 342
console.log(state.captureTimeMs) // 28.5

// Find element by name → exact coordinates
const btn = await find('Submit')
console.log(btn.centerX, btn.centerY)  // 520, 340

// Check accessibility permission
const hasAccess = await checkAccess()
```

## What your LLM receives

Instead of a 2MB screenshot, your AI gets structured text (~500 tokens):

```
[App: Ghostty | Window: "~/projects — zsh"]

## Tabs
- [Tab] "~/projects" at (120,12) [SELECTED]
- [Tab] "npm run dev" at (240,12)
- [Button] "+" at (360,12)

## Content
- [StaticText] "~/projects git:(main)" at (20,80)
- [StaticText] "$ glance screen" at (20,100)
```

Coordinates are exact — from the OS, not estimated from pixels.

## Why

| | Screenshot | Glance |
|---|---|---|
| **Speed** | 2–5 seconds | ~0.8 seconds |
| **Tokens** | ~3,000 (image) | ~500 (text) |
| **Cost** | ~$0.03 / call | ~$0.001 / call |
| **Positions** | AI guesses | Exact from OS |

## Requirements

- macOS 14.2+
- Accessibility permission (System Settings → Privacy & Security → Accessibility)

## API

- **`screen()`** → LLM-ready string with all elements and positions
- **`capture()`** → Full structured object (app, window, elements, metrics)
- **`find(name)`** → Element by label with exact pixel coordinates
- **`checkAccess()`** → Boolean, check if accessibility permission is granted

## Links

- [Website](https://glance.run)
- [GitHub](https://github.com/rishabhsai/glance)
- [Documentation](https://glance.run#docs)

## License

MIT
