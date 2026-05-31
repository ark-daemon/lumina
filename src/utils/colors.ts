export type RGB = [number, number, number];

// Accepts a ColorThief Color object (v3 API) or a raw [r,g,b] tuple
export const toRGB = (color: any): RGB => {
  if (Array.isArray(color)) return color as RGB;
  if (typeof color?.rgb === 'function') {
    const { r, g, b } = color.rgb();
    return [r, g, b];
  }
  if (typeof color?.r === 'number') return [color.r, color.g, color.b];
  return [0, 0, 0];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// --- Luminance & Contrast ---

export const getLuminance = (r: number, g: number, b: number): number => {
  const [lr, lg, lb] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

/** Returns a high-contrast text color (black or white) for the given background. */
export const getContrastColor = (r: number, g: number, b: number): string =>
  getLuminance(r, g, b) > 0.179 ? '#000000' : '#ffffff';

/**
 * Returns the WCAG 2.1 contrast ratio between two RGB colors.
 * Range: 1 (no contrast) → 21 (black on white).
 */
export const getContrastRatio = (
  [r1, g1, b1]: RGB,
  [r2, g2, b2]: RGB
): number => {
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

/** Returns the WCAG 2.1 conformance level for a given contrast ratio. */
export const getWcagLevel = (ratio: number): { level: 'AAA' | 'AA' | 'AA Large' | 'Fail'; pass: boolean } => {
  if (ratio >= 7)   return { level: 'AAA',      pass: true  };
  if (ratio >= 4.5) return { level: 'AA',        pass: true  };
  if (ratio >= 3)   return { level: 'AA Large',  pass: true  };
  return              { level: 'Fail',     pass: false };
};

// --- OKLCH conversion ---

const linearize = (c: number) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

/**
 * Converts an RGB color to OKLCH [L (0–1), C (0–~0.4), H (0–360°)].
 * Follows the official OKLab specification by Björn Ottosson.
 */
export const rgbToOklch = (r: number, g: number, b: number): [number, number, number] => {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  // Linear RGB → LMS (long-pass, medium-pass, short-pass cone responses)
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  // LMS^1/3 → OKLab
  const L =  0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a =  1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bOk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // OKLab → OKLCH
  const C = Math.sqrt(a * a + bOk * bOk);
  let H = Math.atan2(bOk, a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return [L, C, H];
};

/** Format OKLCH values as a CSS oklch() string. */
export const oklchToString = (L: number, C: number, H: number): string => {
  const pct  = (L * 100).toFixed(1) + '%';
  const chroma = C.toFixed(4);
  const hue  = H.toFixed(1);
  return `oklch(${pct} ${chroma} ${hue})`;
};

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const s = max - Math.min(r, g, b);
  const h = s
    ? max === r ? (g - b) / s : max === g ? 2 + (b - r) / s : 4 + (r - g) / s
    : 0;
  return [
    Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
    Math.round(100 * (s ? (max <= 0.5 ? s / (2 * max - s) : s / (2 - (2 * max - s))) : 0)),
    Math.round((100 * (2 * max - s)) / 2),
  ];
};

export const hslToString = ([h, s, l]: [number, number, number]): string =>
  `hsl(${h}, ${s}%, ${l}%)`;
