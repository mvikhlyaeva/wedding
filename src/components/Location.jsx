import { motion } from 'framer-motion'

export default function Location() {
  return (
    <section className="bg-[#2c2c2c] py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#b8975a] block mb-4">
            Место проведения
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8]">
            Тула, Бушово
          </h2>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          className="relative w-full aspect-[16/7] bg-[#3a3a3a] mb-8 overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Placeholder content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#5a5a5a]">
              карта появится позже
            </span>
          </div>
          {/* Grid lines decoration */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#b8975a 1px, transparent 1px), linear-gradient(90deg, #b8975a 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 border border-[#b8975a] text-[#b8975a] font-sans text-[12px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#b8975a] hover:text-[#2c2c2c] transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Открыть в Яндекс Картах
          </a>
          <span className="font-sans text-[13px] text-[#5a5a5a] tracking-wide">
            Тульская область, Бушово
          </span>
        </motion.div>

      </div>
    </section>
  )
}
