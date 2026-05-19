import { useState } from 'react'
import { motion } from 'framer-motion'
import DressCodeModal from './DressCodeModal'

const palette = [
  { name: 'Rosewater', hex: '#ffdfdd', tall: true },
  { name: 'Pear Sorbet', hex: '#fff4b7', tall: false },
  { name: 'Crème Brûlée', hex: '#dccbb8', tall: false },
  { name: 'Gleam', hex: '#c0d2ae', tall: true },
]

export default function DressCode() {
  const [open, setOpen] = useState(false)
  return (
    <section className="relative bg-[#f9f4e8] py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-14">

        {/* Left column — header + intro */}
        <motion.div
          className="col-span-12 md:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-serif font-light text-[#243329] leading-[0.95] mb-8 md:mb-12"
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontVariationSettings: '"opsz" 144',
              letterSpacing: '-0.02em',
            }}
          >
            Палитра<br />
            <span className="text-[#9c8e78]">вечера</span>
          </h2>

          <motion.p
            className="font-serif text-[clamp(1.1rem,2vw,1.35rem)] font-light text-[#243329]/80 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Будем благодарны, если вы поддержите нежную природную палитру вечера — пастельные тона, льняные фактуры, мягкий свет.
          </motion.p>

          <motion.button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-[#9c8e78] hover:text-[#243329] transition-colors duration-300 mt-10 md:mt-14"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>посмотреть образы</span>
            <span className="block w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Right column — fabric swatches, asymmetric */}
        <motion.div
          className="col-span-12 md:col-span-6 md:pl-8 lg:pl-16 md:pt-6 lg:pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {palette.map((color, i) => (
              <motion.div
                key={color.name}
                className={`flex flex-col gap-3 ${
                  i === 1 ? 'mt-12 md:mt-20' : ''
                } ${i === 2 ? 'md:-mt-8' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className={`w-full ${
                    color.tall ? 'aspect-[3/5]' : 'aspect-[3/4]'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-baseline justify-between gap-2 pt-1">
                  <span className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#243329]">
                    {color.name}
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#9c8e78]/70">
                    №{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <DressCodeModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
