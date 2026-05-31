<div align="center">

# ✨ Lumina

**Extract beautiful, production-ready color palettes from any image.**  
Export instantly to Tailwind CSS, CSS Variables, OKLCH, and DTCG Figma Tokens.

[![MIT License](https://img.shields.io/badge/license-MIT-6366f1?style=flat-square)](LICENSE)
[![Vite](https://img.shields.io/badge/vite-8.x-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/react-19-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 🎬 Overview

Lumina is a **100% client-side** color palette generator. Drop any image — a photograph, brand asset, or screenshot — and instantly receive a curated, WCAG-audited color palette with developer-ready export tokens.

No backend. No uploads. No tracking. Every pixel stays in your browser.

---

## ✨ Premium Features

### 🌊 Dynamic Ambient Background Glow
The app background reacts to your image in real time. Lumina extracts the dominant color and casts a massive, animated, blurred radial glow behind the entire UI — making the experience feel alive and totally unique to every image you drop in.

### 🎚️ Real-Time Palette Size Slider
A sleek slider lets you dynamically adjust the number of extracted colors between **3 and 15** without re-uploading. ColorThief v3's `getPaletteSync` re-runs the quantization algorithm instantly on every change.

### 🪄 Staggered Spring Animations
Color swatches load in with staggered **spring physics** powered by Framer Motion. Each card has a hover micro-interaction with an animated "Click to copy hex" tooltip and a ✓ confirmation, all with contrast-aware text (black or white) computed via the WCAG luminance formula.

### 🖥️ Live UI Playground
A fully interactive mock finance dashboard (**FinDash**) that is automatically re-styled using your generated palette — buttons, cards, navbars, and icon backgrounds all update in real time. It proves your palette is genuinely usable in a real-world product context.

### 🛡️ WCAG 2.1 Contrast Audit
A built-in contrast checker evaluates every key UI pair in the playground (button text/background, card surface/text) against the **WCAG 2.1** standard and reports live pass/fail grades:
- **AAA** ≥ 7:1 — Enhanced
- **AA** ≥ 4.5:1 — Normal text
- **AA Large** ≥ 3:1 — Large text only
- **Fail** < 3:1

### 📦 Developer-Ready Multi-Format Export

| Tab | Output |
|---|---|
| **Tailwind** | Drop-in `tailwind.config.js` `colors: {}` block |
| **CSS Vars** | `:root {}` custom properties |
| **OKLCH** | Perceptually-uniform `oklch()` CSS values |
| **JSON / Figma** | Flat key→hex object for Figma Tokens plugin |
| **DTCG Download** | W3C Design Token Community Group `.json` file |

All color names follow a clean, consistent **`lumina-1` → `lumina-N`** convention across every export format.

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| [Vite](https://vite.dev) | Lightning-fast build tooling |
| [React 19](https://react.dev) | UI component model |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling via `@tailwindcss/vite` plugin |
| [ColorThief v3](https://lokeshdhakar.com/projects/color-thief/) | Client-side color quantization from image pixels |
| [Framer Motion](https://www.framer.com/motion/) | Spring animations and staggered transitions |
| [Lucide React](https://lucide.dev) | Icon system |
| TypeScript | Type-safe codebase throughout |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/ark-daemon/lumina.git
cd lumina

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
lumina/
├── src/
│   ├── components/
│   │   ├── Dropzone.tsx        # Drag-and-drop image upload zone
│   │   ├── PaletteViewer.tsx   # Animated swatch grid with copy-to-clipboard
│   │   ├── Playground.tsx      # Live UI mock + WCAG contrast checker
│   │   └── ExportPanel.tsx     # 4-tab code export + DTCG download
│   ├── utils/
│   │   └── colors.ts           # Color math: hex, OKLCH, luminance, WCAG ratio
│   ├── App.tsx                 # Root layout, palette state, ambient glow
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🧮 Color Science

Lumina implements all color math from scratch in `src/utils/colors.ts`:

- **WCAG Luminance** — Relative luminance via IEC 61966-2-1 gamma expansion
- **Contrast Ratio** — `(L1 + 0.05) / (L2 + 0.05)` per WCAG 2.1 spec
- **OKLCH Conversion** — Full OKLab matrix transform by [Björn Ottosson](https://bottosson.github.io/posts/oklab/) for perceptually uniform color space output
- **DTCG Tokens** — W3C Design Token Community Group format with `$value`, `$type`, and `$description`

---

## 📝 License

[MIT](LICENSE) — built with ❤️ by [ark-daemon](https://github.com/ark-daemon)
