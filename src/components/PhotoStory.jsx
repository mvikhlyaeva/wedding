import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function PhotoStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="relative h-[80vh] md:h-screen min-h-[500px] overflow-hidden">
      {/* Parallax photo */}
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img
          src="/DSCF_086.JPEG"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block w-12 h-px bg-white/40 mb-6 md:mb-8" />
          <p className="font-serif text-[2.2rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.1] text-white font-light">
            Навстречу<br /><span className="italic">друг другу</span>
          </p>
          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 mt-6 md:mt-8 block">
            Григорий &amp; Мария
          </span>
        </motion.div>
      </div>
    </section>
  )
}
