import { motion } from 'framer-motion'

const events = [
  { time: '16:00', label: 'Начало торжества' },
  { time: '16:30', label: 'Церемония' },
  { time: '18:00', label: 'Ужин' },
  { time: '20:00', label: 'Танцы' },
  { time: '21:30', label: 'Вынос торта' },
  { time: '23:00', label: 'Окончание' },
]

const Star = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.5 L13 11 L22.5 12 L13 13 L12 22.5 L11 13 L1.5 12 L11 11 Z" />
  </svg>
)

const Flourish = ({ flip = false }) => (
  <svg
    width="140"
    height="18"
    viewBox="0 0 140 18"
    fill="none"
    style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
  >
    <path
      d="M0 9 Q 25 9, 40 5 Q 55 1, 70 9 Q 85 17, 100 5 Q 115 1, 140 9"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
    />
    <circle cx="70" cy="9" r="1.6" fill="currentColor" />
    <circle cx="20" cy="9" r="0.8" fill="currentColor" />
    <circle cx="120" cy="9" r="0.8" fill="currentColor" />
  </svg>
)

export default function Schedule() {
  return (
    <section className="bg-[#f5f0e8] py-16 md:py-24 px-6 overflow-hidden">
      <div className="w-fit max-w-full mx-auto">

        {/* Header */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-[2.4rem] md:text-[3rem] font-light leading-tight text-[#243329] text-center">
            Программа <span className="italic">дня</span>
          </h2>
        </motion.div>

        {/* Top flourish */}
        <motion.div
          className="text-[#a08368] mb-7 md:mb-9"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flourish />
        </motion.div>

        {/* Events grid — содержимое прижато слева, линия в col 2 */}
        <div
          className="relative grid items-center gap-x-6 md:gap-x-10 gap-y-6 md:gap-y-8"
          style={{ gridTemplateColumns: 'auto auto auto' }}
        >
          {/* Vertical line — explicit placement в col 2, span всех 6 строк */}
          <motion.div
            className="w-px bg-gradient-to-b from-transparent via-[#a08368]/55 to-transparent justify-self-center self-stretch origin-top pointer-events-none"
            style={{ gridColumn: 2, gridRow: '1 / span 6' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {events.map((event, i) => (
            <Row key={event.time} event={event} index={i} />
          ))}
        </div>

        {/* Bottom flourish */}
        <motion.div
          className="text-[#a08368] mt-7 md:mt-9"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flourish flip />
        </motion.div>
      </div>
    </section>
  )
}

function Row({ event, index }) {
  const baseDelay = 0.5 + index * 0.13
  const rowNum = index + 1

  return (
    <>
      {/* Time */}
      <motion.span
        className="font-serif italic text-[17px] md:text-[20px] tracking-[0.04em] text-[#a08368] text-right"
        style={{ gridColumn: 1, gridRow: rowNum }}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.85, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
      >
        {event.time}
      </motion.span>

      {/* Star ornament — на «островке» чтобы перебить линию позади */}
      <motion.span
        className="relative flex items-center justify-center text-[#a08368] bg-[#f5f0e8] px-2 py-1 z-10"
        style={{ gridColumn: 2, gridRow: rowNum }}
        initial={{ opacity: 0, scale: 0.3, rotate: -120 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{
          duration: 1,
          delay: baseDelay + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Star size={15} />
      </motion.span>

      {/* Label */}
      <motion.span
        className="font-serif text-[1.15rem] md:text-[1.35rem] text-[#243329] font-light leading-snug"
        style={{ gridColumn: 3, gridRow: rowNum }}
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{
          duration: 0.85,
          delay: baseDelay + 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {event.label}
      </motion.span>
    </>
  )
}
