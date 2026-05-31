import React from 'react';
import type { RGB } from '../utils/colors';
import { rgbToHex, getContrastColor, getContrastRatio, getWcagLevel } from '../utils/colors';
import { motion } from 'framer-motion';
import { CreditCard, Bell, User, ArrowUpRight, BarChart3, Activity, ShieldCheck } from 'lucide-react';

interface PlaygroundProps {
  palette: RGB[];
}

// ─── Contrast Badge ───────────────────────────────────────────────────────────
interface ContrastRowProps {
  label: string;
  fg: RGB;
  bg: RGB;
}

const ContrastRow: React.FC<ContrastRowProps> = ({ label, fg, bg }) => {
  const ratio = getContrastRatio(fg, bg);
  const { level, pass } = getWcagLevel(ratio);

  const levelColor =
    level === 'AAA'      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
    level === 'AA'       ? 'bg-sky-500/15 text-sky-400 border-sky-500/30' :
    level === 'AA Large' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                           'bg-red-500/15 text-red-400 border-red-500/30';

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-800 last:border-0">
      <div className="flex items-center gap-3">
        {/* Color pair preview */}
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-black shadow-sm flex-shrink-0"
          style={{ backgroundColor: rgbToHex(...bg), color: rgbToHex(...fg) }}
        >
          Aa
        </div>
        <span className="text-sm text-zinc-300">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-semibold text-zinc-200">
          {ratio.toFixed(2)}:1
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelColor}`}>
          {pass ? '✓' : '✗'} {level}
        </span>
      </div>
    </div>
  );
};

// ─── Main Playground ──────────────────────────────────────────────────────────
export const Playground: React.FC<PlaygroundProps> = ({ palette }) => {
  if (!palette || palette.length < 3) return null;

  const primary      = rgbToHex(...palette[0]);
  const primaryText  = getContrastColor(...palette[0]);
  const primaryTextRgb: RGB = primaryText === '#ffffff' ? [255, 255, 255] : [0, 0, 0];

  const secondary     = rgbToHex(...palette[1]);
  const secondaryText = getContrastColor(...palette[1]);
  const secondaryTextRgb: RGB = secondaryText === '#ffffff' ? [255, 255, 255] : [0, 0, 0];

  const accent       = rgbToHex(...palette[2]);
  const accentTextRgb: RGB = getContrastColor(...palette[2]) === '#ffffff' ? [255, 255, 255] : [0, 0, 0];

  const surfaceRgb   = palette.length > 3 ? palette[palette.length - 1] : ([255, 255, 255] as RGB);
  const surface      = rgbToHex(...surfaceRgb);
  const surfaceText  = getContrastColor(...surfaceRgb);
  const surfaceTextRgb: RGB = surfaceText === '#ffffff' ? [255, 255, 255] : [0, 0, 0];
  const isSurfaceDark = surfaceText === '#ffffff';

  // Contrast pairs we want to audit
  const contrastPairs: ContrastRowProps[] = [
    { label: 'Primary button — text / background',   fg: primaryTextRgb,   bg: palette[0] },
    { label: 'Secondary button — text / background', fg: secondaryTextRgb, bg: palette[1] },
    { label: 'Accent icon — icon / background',      fg: accentTextRgb,    bg: palette[2] },
    { label: 'Surface — body text / background',     fg: surfaceTextRgb,   bg: surfaceRgb  },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full mt-10 space-y-6"
    >
      {/* Header */}
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        UI Playground
        <span className="text-xs font-normal px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">Live Preview</span>
      </h2>

      {/* ── Dashboard Mock ── */}
      <div
        className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl transition-colors duration-500"
        style={{ backgroundColor: surface, color: surfaceText }}
      >
        {/* Navbar */}
        <div
          className="w-full px-6 py-4 flex items-center justify-between border-b"
          style={{ borderColor: isSurfaceDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        >
          <div className="flex items-center space-x-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primary, color: primaryText }}>
              <BarChart3 className="w-5 h-5" />
            </div>
            <span>FinDash</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 opacity-70" />
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: secondary, color: secondaryText }}>
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div
              className="p-6 rounded-2xl shadow-sm"
              style={{ backgroundColor: isSurfaceDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <h3 className="text-sm font-medium opacity-70 mb-1">Total Balance</h3>
              <p className="text-4xl font-extrabold mb-6">$124,592.00</p>
              <div className="flex space-x-3">
                <button
                  className="px-5 py-2.5 rounded-lg font-medium flex items-center shadow-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: primary, color: primaryText }}
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Transfer
                </button>
                <button
                  className="px-5 py-2.5 rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: secondary, color: secondaryText }}
                >
                  Deposit
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: isSurfaceDark ? 'rgba(255,255,255,0.03)' : 'white' }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: i === 1 ? accent : isSurfaceDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: i === 1 ? getContrastColor(...palette[2]) : surfaceText,
                      }}
                    >
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Payment Received</p>
                      <p className="text-xs opacity-60">Today at 9:42 AM</p>
                    </div>
                  </div>
                  <span className="font-bold">+$450.00</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side card */}
          <div
            className="p-6 rounded-2xl flex flex-col justify-between shadow-lg"
            style={{ backgroundColor: primary, color: primaryText }}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Get access to advanced analytics, custom reports, and unlimited team members.
              </p>
            </div>
            <button
              className="w-full py-3 rounded-lg font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-colors"
              style={{ color: primaryText }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* ── WCAG Contrast Checker ── */}
      <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">WCAG 2.1 Contrast Audit</span>
          <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-500">
            AA requires 4.5:1 · AAA requires 7:1
          </span>
        </div>

        {/* Rows */}
        <div className="px-5 bg-zinc-950 divide-y divide-zinc-800">
          {contrastPairs.map(pair => (
            <ContrastRow key={pair.label} {...pair} />
          ))}
        </div>

        {/* Legend */}
        <div className="px-5 py-3 bg-zinc-950 border-t border-zinc-800 flex flex-wrap gap-3 text-[10px] font-semibold">
          {[
            { cls: 'text-emerald-400', label: 'AAA ≥ 7:1 — Enhanced' },
            { cls: 'text-sky-400',     label: 'AA ≥ 4.5:1 — Normal text' },
            { cls: 'text-amber-400',   label: 'AA Large ≥ 3:1 — Large text only' },
            { cls: 'text-red-400',     label: 'Fail < 3:1' },
          ].map(({ cls, label }) => (
            <span key={label} className={cls}>{label}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
