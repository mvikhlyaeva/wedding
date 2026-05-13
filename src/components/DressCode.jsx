import { useState } from 'react'
import { motion } from 'framer-motion'
import DressCodeModal from './DressCodeModal'

const palette = [
  { name: 'Rosewater', hex: '#e8d2d0' },
  { name: 'Pear Sorbet', hex: '#f0e5a4' },
  { name: 'Crème Brûlée', hex: '#e5d4be' },
  { name: 'Gleam', hex: '#c8d5b6' },
]

export default function DressCode() {
  const [open, setOpen] = useState(false)
  return (
    <section className="bg-[#f7f5f3] py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#b8975a] block mb-4">
            Дресс-код
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#2c2c2c] mb-10">
            Палитра вечера
          </h2>
          <span className="divider block" />
        </motion.div>

        {/* Color swatches — evenly distributed grid */}
        <motion.div
          className="grid grid-cols-4 gap-4 md:gap-8 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {palette.map((color, i) => (
            <motion.div
              key={color.name}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                style={{
                  backgroundColor: color.hex,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
                }}
              />
              <span className="font-sans text-[10px] md:text-[11px] tracking-[0.1em] text-[#5a5a5a] text-center leading-tight">
                {color.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <motion.p
          className="font-serif text-[clamp(1.1rem,2.5vw,1.4rem)] font-light italic text-[#5a5a5a] leading-relaxed max-w-xl mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          «Будем благодарны, если вы поддержите нежную природную палитру вечера»
        </motion.p>

        {/* Lookbook trigger */}
        <motion.button
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-[#b8975a] hover:text-[#2c2c2c] transition-colors duration-300"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>посмотреть образы</span>
          <span className="block w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
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

      </div>

      <DressCodeModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
