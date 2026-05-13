import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-[#2c2c2c] overflow-hidden py-24 md:py-36 px-6 md:px-12 lg:px-20">
      {/* Background large text */}
      <div
        className="absolute inset-0 flex items-center justify-center font-serif text-[clamp(8rem,22vw,20rem)] leading-none text-white/[0.03] select-none pointer-events-none"
        aria-hidden
      >
        M&amp;G
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="divider mx-auto mb-10 block" style={{ backgroundColor: 'rgba(184,151,90,0.5)' }} />

          <p className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] font-light italic text-[#f5f0e8] leading-snug mb-6">
            С любовью,<br />Григорий и Мария
          </p>

          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#5a5a5a]">
            27 · 06 · 2026
          </span>

          <div className="mt-12">
            <span className="divider mx-auto block" style={{ backgroundColor: 'rgba(184,151,90,0.3)' }} />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
