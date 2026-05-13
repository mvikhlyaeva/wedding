import { motion } from 'framer-motion'

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const monogramLetter = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative w-full h-svh min-h-[640px] overflow-hidden">
      {/* Photo */}
      <img
        src="/IMG_8068.jpg"
        alt="Григорий и Мария"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Top gradient — для читаемости надписи на светлом небе */}
      <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-black/45 to-transparent" />
      {/* Bottom gradient — для читаемости имён и даты */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
      {/* Center vignette — мягкое затемнение под монограммой */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,0,0,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Top tagline */}
      <motion.div
        className="absolute top-10 md:top-14 left-0 right-0 text-center px-6 z-10"
        variants={fade}
        initial="hidden"
        animate="visible"
        custom={0.3}
      >
        <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/85">
          Вы приглашены на свадьбу
        </span>
      </motion.div>

      {/* Monogram — centered stacked block */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center font-serif text-white select-none"
        style={{
          fontSize: 'clamp(5rem, 18vw, 10rem)',
          lineHeight: 0.86,
          fontWeight: 400,
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.55)) drop-shadow(0 0 30px rgba(0,0,0,0.35))',
        }}
      >
        <motion.span
          className="block"
          variants={monogramLetter}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          Г
        </motion.span>
        <motion.span
          className="block italic"
          style={{
            color: '#d4c4a8',
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
          }}
          variants={monogramLetter}
          initial="hidden"
          animate="visible"
          custom={0.95}
        >
          &amp;
        </motion.span>
        <motion.span
          className="block"
          variants={monogramLetter}
          initial="hidden"
          animate="visible"
          custom={1.3}
        >
          М
        </motion.span>
      </div>

      {/* Bottom block: names + date + city */}
      <div className="absolute bottom-10 md:bottom-14 left-0 right-0 px-6 text-center z-10">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={1.8}
        >
          <p className="font-serif text-white text-[1.3rem] md:text-[1.8rem] font-light leading-snug mb-5 md:mb-7">
            Григорий <span className="italic text-[#d4c4a8]">&amp;</span> Мария
          </p>

          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="block w-6 h-px bg-white/40" />
            <span className="font-sans text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-white/90">
              27 июня 2026 · 16:00
            </span>
            <span className="block w-6 h-px bg-white/40" />
          </div>

          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60">
            г. Тула
          </span>
        </motion.div>
      </div>

      {/* Scroll hint — desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-8 right-12 lg:right-20 flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40 [writing-mode:vertical-rl]">
          scroll
        </span>
        <div className="w-px h-12 bg-white/25" />
      </motion.div>
    </section>
  )
}
