import { useState, useRef, useEffect } from 'react'
import { getPaletteSync } from 'colorthief'
import { Dropzone } from './components/Dropzone'
import { PaletteViewer } from './components/PaletteViewer'
import { ExportPanel } from './components/ExportPanel'
import { Playground } from './components/Playground'
import type { RGB } from './utils/colors'
import { toRGB, rgbToHex } from './utils/colors'
import { Palette, Trash2, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [palette, setPalette] = useState<RGB[]>([])
  const [colorCount, setColorCount] = useState<number>(10)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleImageLoad = (file: File) => {
    const url = URL.createObjectURL(file)
    setImageSrc(url)
  }

  const handleClear = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc)
    }
    setImageSrc(null)
    setPalette([])
  }

  const extractColors = () => {
    if (!imgRef.current) return;
    try {
      // getPaletteSync is available in browser and is synchronous
      const colors = getPaletteSync(imgRef.current, { colorCount })
      if (colors && colors.length > 0) {
        setPalette(colors.map(toRGB))
      }
    } catch (err) {
      console.error("Error extracting colors", err)
    }
  }

  // Re-extract when slider changes and image is loaded
  useEffect(() => {
    if (imageSrc && imgRef.current?.complete) {
      extractColors()
    }
  }, [colorCount])

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  const dominantHex = palette.length > 0 ? rgbToHex(...palette[0]) : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30 relative overflow-hidden transition-colors duration-1000">
      
      {/* Dynamic Ambient Background */}
      <AnimatePresence>
        {dominantHex && (
          <motion.div 
            key={dominantHex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute pointer-events-none z-0 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"
            style={{ 
              backgroundColor: dominantHex, 
              width: '80vw', 
              height: '80vh',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div 
              className="p-3 rounded-xl shadow-xl transition-all duration-700"
              style={{ backgroundColor: dominantHex ?? '#18181b' }}
            >
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Lumina
            </h1>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Extract beautiful, production-ready color palettes from any image. Instantly export to Tailwind &amp; CSS.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-zinc-200/50 dark:shadow-black/40 rounded-3xl p-6 sm:p-10 border border-zinc-200/50 dark:border-zinc-700/50">
          {!imageSrc ? (
            <Dropzone onImageLoad={handleImageLoad} />
          ) : (
            <div className="space-y-8">
              
              {/* Image & Slider Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Image Preview */}
                <div className="lg:col-span-2 relative group rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 flex justify-center items-center min-h-64 sm:min-h-96 shadow-inner">
                  <img 
                    ref={imgRef}
                    src={imageSrc} 
                    alt="Uploaded preview" 
                    crossOrigin="anonymous"
                    className="max-h-96 max-w-full object-contain"
                    onLoad={extractColors}
                  />
                  <button 
                    onClick={handleClear}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                    aria-label="Clear image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Controls */}
                <div className="flex flex-col justify-center p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center space-x-2 mb-6">
                    <SlidersHorizontal className="w-5 h-5 text-zinc-500" />
                    <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">Adjust Palette</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="colorCount" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Colors
                      </label>
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-md">
                        {colorCount}
                      </span>
                    </div>
                    <input 
                      id="colorCount"
                      type="range" 
                      min="3" 
                      max="15" 
                      value={colorCount} 
                      onChange={(e) => setColorCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                      style={dominantHex ? { accentColor: dominantHex } : {}}
                    />
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 pt-2 leading-relaxed">
                      Slide to extract more or fewer colors from the image. Re-generates instantly.
                    </p>
                  </div>
                </div>

              </div>

              {palette.length > 0 && (
                <>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
                  <PaletteViewer palette={palette} />
                  <Playground palette={palette} />
                  <ExportPanel palette={palette} />
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
          Built with React, Tailwind CSS v4, ColorThief v3, and Framer Motion.
        </div>
      </div>
    </div>
  )
}

export default App
