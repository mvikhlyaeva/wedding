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
    <section className="bg-[#f5f0e8] py-20 md:py-28 px-6 overflow-hidden">
      <div className="w-fit max-w-full mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-[2.2rem] md:text-[2.8rem] font-light leading-tight text-[#2c2c2c]">
            <span className="italic">Июнь</span> 2026
          </h2>
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
                className="font-sans text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-[#b8975a] text-center"
              >
                {d}
              </span>
            ))}
          </motion.div>

          {/* Thin divider */}
          <motion.div
            className="w-full h-px bg-[#b8975a]/35 mb-4 origin-left"
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
            className="w-full h-px bg-[#b8975a]/35 mt-4 origin-right"
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
          <p className="font-serif italic text-[1.2rem] md:text-[1.4rem] text-[#2c2c2c] font-light mb-2">
            суббота
          </p>
          <div className="flex items-center justify-center gap-2.5 text-[#b8975a]">
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
        {/* Маленькая звезда сверху */}
        <motion.span
          className="absolute top-0 text-[#b8975a] -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Star size={9} />
        </motion.span>

        {/* Кольцо */}
        <motion.span
          className="absolute inset-[10%] rounded-full border border-[#b8975a]"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Число */}
        <motion.span
          className="relative font-serif italic text-[1.5rem] md:text-[1.85rem] text-[#b8975a] font-light leading-none"
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
      className="aspect-square flex items-center justify-center font-sans text-[12px] md:text-[13px] font-light text-[#2c2c2c]/55"
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {day}
    </motion.span>
  )
}
