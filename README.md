<div align="center">
  <img src="https://img.icons8.com/color/96/000000/color-palette.png" alt="Lumina Logo" width="80" />
  <h1>Lumina</h1>
  <p><strong>Extract beautiful, production-ready color palettes from any image. Instantly export to Tailwind, CSS, and Figma.</strong></p>

  <a href="https://lumina-colors.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo-lumina--colors.vercel.app-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</div>

<br />

Lumina is an advanced, client-side color quantization tool built for modern web developers and designers. By dragging and dropping any image, Lumina instantly extracts a mathematically accurate dominant color palette and previews it across a real-world dashboard mockup.

Built explicitly to showcase rigorous engineering, perceptual color spaces, and modern accessibility standards for the **OpenAI Codex** program.

---

## ✨ Premium Features

- **WCAG 2.1 Contrast Checker**: Real-time algorithmic contrast auditing. Automatically tests the extracted colors against each other (text vs. background) and scores them with strict `AAA`, `AA`, `AA Large`, or `Fail` badges based on WCAG luminance formulas.
- **DTCG Token JSON Export**: 1-click export of your palette as a W3C Design Token Community Group (DTCG) compliant JSON file, ready to be imported directly into Figma Tokens or Style Dictionary.
- **Perceptual OKLCH Support**: Generates the exact perceptual OKLCH color space matrices for your palette, ensuring perfectly uniform lightness and chroma interpolation for CSS.
- **Dynamic Ambient Background Glow**: The UI features an immersive, blurred radial glow that seamlessly transitions to match the dominant color of your uploaded image using Framer Motion.
- **Debounced Extraction Engine**: Heavy color math is debounced off the main thread, resulting in a buttery-smooth range slider when adjusting the desired number of colors.

## 🛠️ Tech Stack

- **React 18** (Vite)
- **Tailwind CSS v4** (Utility-first styling & native CSS nesting)
- **Framer Motion** (Fluid layout animations and dynamic presence)
- **ColorThief v3** (Canvas-based color quantization)
- **Lucide React** (Crisp vector iconography)

## 🚀 Export Formats

Lumina supports 1-click copying to your clipboard in the following standardized formats:
1. **Tailwind CSS** (Standard `extend: { colors: { ... } }` config)
2. **CSS Variables** (`:root` definitions)
3. **OKLCH** (Next-gen CSS color functions)
4. **JSON / Figma** (Standardized key-value object)

## 💻 Local Development

To run Lumina locally:

```bash
git clone https://github.com/ark-daemon/lumina.git
cd lumina
npm install
npm run dev
```

<br />
<div align="center">
  <sub>Built with ❤️ by ark-daemon</sub>
</div>
