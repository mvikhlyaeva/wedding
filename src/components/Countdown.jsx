import { useState, useEffect, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 27 июня 2026, 16:00 МСК
const TARGET = new Date('2026-06-27T16:00:00+03:00').getTime()

function getDiff() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    finished: diff === 0,
  }
}

const labelMap = {
  days: { 1: 'день', 2: 'дня', 5: 'дней' },
  hours: { 1: 'час', 2: 'часа', 5: 'часов' },
  minutes: { 1: 'минута', 2: 'минуты', 5: 'минут' },
  seconds: { 1: 'секунда', 2: 'секунды', 5: 'секунд' },
}

// Склонение существительных
function plural(n, forms) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[1]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[2]
  return forms[5]
}

export default function Countdown() {
  const [t, setT] = useState(getDiff())

  useEffect(() => {
    const id = setInterval(() => setT(getDiff()), 1000)
    return () => clearInterval(id)
  }, [])

  if (t.finished) {
    return (
      <section className="bg-[#f5f0e8] py-20 md:py-28 px-6 text-center">
        <p className="font-serif text-[1.6rem] md:text-[2.2rem] text-[#243329]">
          Этот день <span className="italic">настал</span>.
        </p>
      </section>
    )
  }

  const units = [
    { key: 'days', value: t.days },
    { key: 'hours', value: t.hours },
    { key: 'minutes', value: t.minutes },
    { key: 'seconds', value: t.seconds },
  ]

  return (
    <section className="bg-[#f5f0e8] py-20 md:py-28 px-6 overflow-hidden">
      <div className="w-fit max-w-full mx-auto text-center">

        {/* Eyebrow */}
        <motion.div
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#a08368] block mb-3">
            До торжества
          </span>
          <h2 className="font-serif text-[2rem] md:text-[2.6rem] font-light text-[#243329] leading-tight">
            осталось <span className="italic">совсем</span> немного
          </h2>
        </motion.div>

        {/* Numbers row */}
        <motion.div
          className="flex items-start justify-center gap-3 sm:gap-5 md:gap-8 mb-10 md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {units.map((u, i) => (
            <Fragment key={u.key}>
              <div className="flex flex-col items-center min-w-[3.5rem] md:min-w-[5rem]">
                {/* Animated number */}
                <div className="relative font-serif font-light text-[2.6rem] sm:text-[3.4rem] md:text-[4.6rem] text-[#243329] leading-none tabular-nums h-[1em]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={u.value}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      {String(u.value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                {/* Label */}
                <span className="mt-3 font-sans text-[9px] md:text-[11px] tracking-[0.25em] uppercase text-[#a08368]">
                  {plural(u.value, labelMap[u.key])}
                </span>
              </div>

              {/* Separator dot */}
              {i < units.length - 1 && (
                <span className="font-serif text-[#a08368]/55 text-[1.8rem] md:text-[2.6rem] leading-none mt-1 select-none">
                  ·
                </span>
              )}
            </Fragment>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="flex items-center justify-center gap-3 text-[#a08368]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block w-7 h-px bg-current/50" />
          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase">
            27 июня 2026 · 16:00
          </span>
          <span className="block w-7 h-px bg-current/50" />
        </motion.div>
      </div>
    </section>
  )
}
