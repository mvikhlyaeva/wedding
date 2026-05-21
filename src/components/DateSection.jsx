import { motion } from 'framer-motion'

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

// Июнь 2026: 1 июня — понедельник, 30 дней
function generateJune2026() {
  const days = []
  for (let i = 1; i <= 30; i++) days.push(i)
  while (days.length < 35) days.push(null) // выравниваем до 5 рядов × 7
  return days
}

const days = generateJune2026()
const SELECTED_DAY = 27

// Маленькая 4-конечная звезда-компас (та же, что в Schedule)
const Star = ({ size = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.5 L13 11 L22.5 12 L13 13 L12 22.5 L11 13 L1.5 12 L11 11 Z" />
  </svg>
)

export default function DateSection() {
  return (
    <section className="bg-[#f9f4e8] pt-4 md:pt-6 pb-8 md:pb-12 px-6 overflow-hidden">
      <div className="w-fit max-w-full mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-serif italic font-light leading-[0.9] text-[#243329]"
            style={{
              fontSize: 'clamp(3rem, 9vw, 5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Июнь
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 md:mt-5 text-[#9c8e78]">
            <span className="block w-6 md:w-8 h-px bg-current/50" />
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase">
              2026
            </span>
            <span className="block w-6 md:w-8 h-px bg-current/50" />
          </div>
        </motion.div>

        {/* Calendar */}
        <div className="w-[300px] md:w-[380px]">

          {/* Day labels */}
          <motion.div
            className="grid grid-cols-7 mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {dayLabels.map((d) => (
              <span
                key={d}
                className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#9c8e78] text-center"
              >
                {d}
              </span>
            ))}
          </motion.div>

          {/* Thin divider */}
          <motion.div
            className="w-full h-px bg-[#9c8e78]/35 mb-4 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {days.map((day, i) => (
              <DayCell key={i} day={day} index={i} />
            ))}
          </div>

          {/* Thin divider */}
          <motion.div
            className="w-full h-px bg-[#9c8e78]/35 mt-4 origin-right"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Footer caption */}
        <motion.div
          className="text-center mt-8 md:mt-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-serif italic text-[#243329] font-light mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}
          >
            суббота
          </p>
          <div className="flex items-center justify-center gap-2.5 text-[#9c8e78]">
            <span className="block w-5 h-px bg-current/60" />
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase">
              начало в 16:00
            </span>
            <span className="block w-5 h-px bg-current/60" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DayCell({ day, index }) {
  const isSelected = day === SELECTED_DAY
  const delay = 0.6 + index * 0.018

  if (day === null) {
    return <div className="aspect-square" />
  }

  if (isSelected) {
    return (
      <motion.div
        className="relative aspect-square flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
      >
        {/* Камень сверху — огранённый изумруд */}
        <motion.span
          className="absolute top-0 text-[#9c8e78] -translate-y-[55%] z-10"
          initial={{ opacity: 0, scale: 0.3, y: -4 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            {/* верхняя огранка-табличка */}
            <path d="M3.5 4 L7 1 L10.5 4 Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            {/* боковые грани */}
            <path d="M1 5.5 L3.5 4 L10.5 4 L13 5.5 L7 14.5 Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
            {/* внутренние линии огранки */}
            <path d="M3.5 4 L7 14.5 M10.5 4 L7 14.5 M1 5.5 L13 5.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
          </svg>
        </motion.span>

        {/* Кольцо — двойной контур */}
        <motion.span
          className="absolute inset-[8%] rounded-full border-[1.5px] border-[#9c8e78]"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="absolute inset-[14%] rounded-full border border-[#9c8e78]/40"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Число */}
        <motion.span
          className="relative font-serif italic text-[2rem] md:text-[2.4rem] text-[#9c8e78] font-light leading-none"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {day}
        </motion.span>
      </motion.div>
    )
  }

  return (
    <motion.span
      className="aspect-square flex items-center justify-center font-serif text-[15px] md:text-[17px] font-light text-[#243329]/60 tabular-nums"
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {day}
    </motion.span>
  )
}
