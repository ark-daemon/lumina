import React from 'react';
import type { RGB } from '../utils/colors';
import { rgbToHex, getContrastColor } from '../utils/colors';
import { Check, Clipboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface PaletteViewerProps {
  palette: RGB[];
}

export const PaletteViewer: React.FC<PaletteViewerProps> = ({ palette }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!palette || palette.length === 0) return null;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring', stiffness: 320, damping: 26 },
    },
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Extracted Palette</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      >
        {palette.map((rgb, index) => {
          const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
          const textColor = getContrastColor(rgb[0], rgb[1], rgb[2]);
          const isLight = textColor === '#000000';
          const isCopied = copiedIndex === index;
          const isHovered = hoveredIndex === index;

          // Tint values for the info strip
          const stripBg = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.14)';
          const overlayBg = isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)';

          return (
            <motion.button
              key={`${hex}-${index}`}
              variants={item}
              onClick={() => copyToClipboard(hex, index)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              aria-label={`Copy ${hex} to clipboard`}
              className="group relative flex flex-col justify-end rounded-xl overflow-hidden shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: hex }}
              whileHover={{ scale: 1.05, y: -4, boxShadow: `0 12px 32px -4px ${hex}88` }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Swatch body — fills space above the info strip */}
              <div className="h-20 w-full flex items-center justify-center relative">

                {/* Hover overlay with "Click to copy" label */}
                <AnimatePresence>
                  {(isHovered || isCopied) && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                      style={{ backgroundColor: overlayBg, backdropFilter: 'blur(2px)' }}
                    >
                      {isCopied ? (
                        <>
                          <Check style={{ color: textColor }} className="w-5 h-5" strokeWidth={2.5} />
                          <span
                            className="text-[10px] font-bold tracking-widest uppercase"
                            style={{ color: textColor }}
                          >
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Clipboard style={{ color: textColor }} className="w-5 h-5" strokeWidth={2} />
                          <span
                            className="text-[10px] font-semibold tracking-wide uppercase"
                            style={{ color: textColor, opacity: 0.85 }}
                          >
                            Click to copy
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom info strip — sits on the swatch color */}
              <div
                className="w-full px-3 py-2 flex flex-col gap-0.5"
                style={{ backgroundColor: stripBg }}
              >
                <span
                  className="font-mono text-[11px] font-bold uppercase tracking-wide leading-tight"
                  style={{ color: textColor }}
                >
                  {hex}
                </span>
                <span
                  className="font-mono text-[9px] leading-tight"
                  style={{ color: textColor, opacity: 0.6 }}
                >
                  {rgb[0]}, {rgb[1]}, {rgb[2]}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
