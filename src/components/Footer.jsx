import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-[#243329] overflow-hidden py-24 md:py-36 px-6 md:px-12 lg:px-20">
      {/* Background large ampersand */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden
      >
        <img
          src="/icons/ampersand.png"
          alt=""
          className="w-[min(80vw,720px)] h-auto"
          style={{ opacity: 0.08, filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="divider mx-auto mb-10 block" style={{ backgroundColor: 'rgba(156,142,120,0.5)' }} />

          <p className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] font-light italic text-[#f9f4e8] leading-snug mb-6">
            С любовью,<br />Григорий и Мария
          </p>

          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#5a635a]">
            27 · 06 · 2026
          </span>

          <div className="mt-12">
            <span className="divider mx-auto block" style={{ backgroundColor: 'rgba(156,142,120,0.3)' }} />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
