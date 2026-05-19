import { motion } from 'framer-motion'

export default function Location() {
  return (
    <section className="bg-[#243329] py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f9f4e8]">
            Экопосёлок Бушово
          </h2>
          <p className="font-sans text-[12px] md:text-[13px] tracking-[0.15em] text-[#9c8e78] mt-3">
            микрорайон Бушово, 1
          </p>
        </motion.div>

        {/* Yandex map */}
        <motion.div
          className="relative w-full aspect-[16/9] md:aspect-[16/7] bg-[#2e3d34] mb-8 overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe
            title="Карта — Экопосёлок Бушово"
            src="https://yandex.ru/map-widget/v1/?mode=search&oid=44966233462&ol=biz&z=15"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="fullscreen"
            loading="lazy"
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
            href="https://yandex.ru/maps/org/ekoposelok_bushovo/44966233462?si=5fza92nuhd81derg8k2vvgnvf4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#9c8e78] text-[#9c8e78] font-sans text-[12px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#9c8e78] hover:text-[#243329] transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Открыть в Яндекс Картах
          </a>
          <span className="font-sans text-[13px] text-[#5a635a] tracking-wide">
            Тульская область, Бушово
          </span>
        </motion.div>

      </div>
    </section>
  )
}
